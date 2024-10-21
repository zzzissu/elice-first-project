import React, { useState, useEffect } from 'react';
import PageModal from '../modal/PageModal';

interface WorkItem {
    title: string;
    content: string;
    user_name: string;
    created_at: string;
    id: number;
    isFromPersonal?: boolean;
}

const WorkSchedule = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [savedWorkTitles, setSavedWorkTitles] = useState<WorkItem[]>([]);
    const [currentWorkPage, setCurrentWorkPage] = useState(1);
    const [userName, setUserName] = useState<string>(''); // 사용자 이름 상태 추가
    const itemsPerPage = 6; // 한 페이지에 보여줄 아이템 수
    const token = localStorage.getItem('token');
    const [modalData, setModalData] = useState<{ title: string; content: string }>({
        title: '',
        content: '',
    });

    // 사용자 정보 조회 함수
    const fetchUserData = () => {
        fetch('http://34.22.95.156:3004/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('사용자 정보 조회 오류');
                }
                return response.json();
            })
            .then((data) => {
                setUserName(data.name);
            })
            .catch((error) => {
                console.error('사용자 정보 조회 중 오류 발생:', error);
            });
    };

    // 업무일정 조회 함수
    const fetchWorkData = () => {
        const apiUrl = 'http://34.22.95.156:3004/api/schedule/team';

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`업무일정조회 오류: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data: WorkItem[]) => {
                // 본인의 일정만 필터링
                const filteredData = data.filter((item) => item.user_name === userName);
                // 개인일정에서 공유된 항목을 상단에 위치시키도록 정렬
                const sortedData = [...filteredData].sort((a, b) => {
                    if (a.isFromPersonal && !b.isFromPersonal) return -1;
                    if (!a.isFromPersonal && b.isFromPersonal) return 1;
                    return 0;
                });
                setSavedWorkTitles(sortedData);
            })
            .catch((error) => {
                console.error('업무일정조회 중 오류 발생:', error);
            });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (userName) {
            fetchWorkData();
        }
    }, [userName]);

    // 업무일정 저장 함수
    const handleSaveWorker = (title: string, content: string) => {
        fetch('http://34.22.95.156:3004/api/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title,
                content,
                makePublic: true,
                createdAt: new Date().toISOString(),
                finishedAt: new Date().toISOString(),
                isFromPersonal: false,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('업무일정 저장 오류');
                }
                return response.json();
            })
            .then(() => {
                setModalOpen(false);
                fetchWorkData();
            })
            .catch((error) => {
                console.error('업무일정 작성 중 오류 발생:', error);
            });
    };

    // 업무일정 삭제 함수
    const handleDeleteWork = (id: number) => {
        fetch(`http://34.22.95.156:3004/api/schedule/team/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('업무일정 삭제 오류');
                }
                // 삭제 후 상태에서 해당 업무일정 제거
                setSavedWorkTitles((prev) => prev.filter((item) => item.id !== id));
            })
            .catch((error) => {
                console.error('업무일정 삭제 중 오류 발생:', error);
            });
    };

    // 업무 일정 페이지네이션 계산
    const indexOfLastWorkItem = currentWorkPage * itemsPerPage;
    const indexOfFirstWorkItem = indexOfLastWorkItem - itemsPerPage;
    const currentWorkItems = savedWorkTitles.slice(indexOfFirstWorkItem, indexOfLastWorkItem);
    const totalWorkPages = Math.ceil(savedWorkTitles.length / itemsPerPage);

    return (
        <div className="border-2 h-[28rem] w-[85%] mt-10 ml-8 rounded-lg shadow-lg">
            <div className="flex flex-row justify-between pt-10">
                <div className="ml-10 text-xl">업무 일정을 작성해 주세요</div>
                <button
                    onClick={() => setModalOpen(true)}
                    className="w-10 h-8 mr-6 -mt-2 rounded-md"
                    style={{
                        backgroundImage: `url('/assets/plus.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </div>

            <ul>
                {currentWorkItems.length > 0 ? (
                    currentWorkItems.map(({ id, title, content, isFromPersonal }) => (
                        <li
                            key={id}
                            className={`cursor-default text-lg w-[90%] m-5 border-b flex items-center group ${
                                isFromPersonal ? 'bg-yellow-200 font-bold' : ''
                            }`}
                        >
                               <div
                                    className="flex-grow text-center cursor-pointer"
                                    onClick={() => {
                                        const selectedItem = savedWorkTitles.find((item) => item.id === id);
                                        if (selectedItem) {
                                            setModalOpen(true);
                                         
                                            setModalData({
                                                title: selectedItem.title,
                                                content: selectedItem.content,
                                            });
                                        }
                                    }}
                                >
                                    {title}
                                </div>
                            <button
                                onClick={() => handleDeleteWork(id)}
                                className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-4"
                            >
                                ❌
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="flex items-center justify-center text-base pt-36">
                        현재 작성된 업무일정이 없습니다.
                    </li>
                )}
            </ul>

            {totalWorkPages > 1 && (
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalWorkPages }, (_, i) => (
                        <button
                            key={i}
                            className={`mx-1 px-4 py-2 rounded ${
                                currentWorkPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                            }`}
                            onClick={() => setCurrentWorkPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

<PageModal
    isOpen={isModalOpen}
    onClose={() => setModalOpen(false)}
    title={modalData.title}  // 모달에 선택한 title 전달
    content={modalData.content}  // 모달에 선택한 content 전달
/>
        </div>
    );
};

export default WorkSchedule;
