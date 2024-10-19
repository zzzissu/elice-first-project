import React, { useState, useEffect } from 'react';
import PageModal from '../modal/PageModal';

const WorkSchedule = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [savedWorkTitles, setSavedWorkTitles] = useState<
        { title: string; content: string; user_name: string; created_at: string; id: number; isFromPersonal?: boolean }[]
    >([]);
    const [userName, setUserName] = useState(''); // 본인의 이름을 저장하기 위한 상태 추가

    const [currentWorkPage, setCurrentWorkPage] = useState(1);
    const itemsPerPage = 6; // 한 페이지에 보여줄 아이템 수
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
    const [selectedContent, setSelectedContent] = useState<string | null>(null);

    const token = localStorage.getItem('token');

    // 사용자 정보 조회 함수
    const userData = () => {
        fetch('http://34.22.95.156:3004/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response.status);
                    throw new Error('정보를 가져오지 못했습니다.');
                }
            })
            .then((data) => {
                setUserName(data.name); // 이름을 상태로 저장
            })
            .catch((error) => {
                console.error('정보조회 중 오류 발생:', error);
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
            .then((data) => {
                // 본인의 일정만 필터링
                const filteredData = data.filter((item: any) => item.user_name === userName);
                const formattedDataWorker = filteredData.map((item: any) => ({
                    title: item.title,
                    content: item.content,
                    user_name: item.user_name,
                    created_at: item.created_at,
                    id: item.id,
                    isFromPersonal: item.isFromPersonal || false,
                }));
                setSavedWorkTitles(formattedDataWorker);
            })
            .catch((error) => {
                console.error('업무일정조회 중 오류 발생:', error);
            });
    };

    useEffect(() => {
        userData(); // 컴포넌트 마운트 시 사용자 정보 조회
    }, []);

    useEffect(() => {
        if (userName) {
            fetchWorkData(); // 사용자 이름이 설정된 후 일정 조회
        }
    }, [userName]); // userName이 변경될 때마다 fetchWorkData 호출


    // 업무일정 작성
    // 업무일정 작성
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
                isFromPersonal: false, // 새로 작성된 일정은 개인일정에서 넘어온 것이 아님을 명시
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
                fetchWorkData(); // 저장 후 업무일정 다시 조회하여 갱신
            })
            .catch((error) => {
                console.error('업무일정 작성 중 오류 발생:', error);
            });
    };


    // 업무일정 삭제
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

    const handleTitleClick = (title: string, content: string) => {
        setSelectedTitle(title);
        setSelectedContent(content);
        setModalOpen(true);
    };

    const handleWriteClickWork = () => {
        setSelectedTitle(null);
        setSelectedContent(null);
        setModalOpen(true);
    };

    // 개인일정이 업무일정에 포함되었을 때 맨 위로 올리고 스타일 변경
    const sortedWorkItems = [...savedWorkTitles].map((item, index) => {
        // 예시로 첫 번째 항목에만 임시로 isFromPersonal: true 설정
        if (index === 0) {
            return { ...item, isFromPersonal: true };
        }
        return item;
    }).sort((a, b) => {
        // isFromPersonal 값이 true이면 맨 위로 올림
        if (a.isFromPersonal && !b.isFromPersonal) return -1;
        if (!a.isFromPersonal && b.isFromPersonal) return 1;
        return 0; // 둘 다 같을 경우 순서 유지
    });


    console.log('sortedWorkItems:', sortedWorkItems); // 디버깅용

    // 업무 일정 페이지네이션 계산
    const indexOfLastWorkItem = currentWorkPage * itemsPerPage;
    const indexOfFirstWorkItem = indexOfLastWorkItem - itemsPerPage;
    const currentWorkItems = sortedWorkItems.slice(indexOfFirstWorkItem, indexOfLastWorkItem); // sorted 리스트로 수정
    const totalWorkPages = Math.ceil(sortedWorkItems.length / itemsPerPage);

    return (
        <div className="border-2 h-[28rem] w-[85%] mt-10 ml-8 rounded-lg shadow-lg">
            <div className="flex flex-row justify-between pt-10">
                <div className="ml-10 text-xl">업무 일정을 작성해 주세요</div>
               
                <button
                    onClick={handleWriteClickWork}
                    className="w-10 h-8 mr-6 -mt-2 rounded-md"
                    style={{
                        backgroundImage: `url('/assets/plus.png')`, // 템플릿 리터럴로 수정
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </div>
    
            <ul>
                {currentWorkItems.length > 0 ? (
                    currentWorkItems.map(({ id, title, content, isFromPersonal }) => {
                        console.log('Work item:', { id, title, isFromPersonal }); // 디버깅용
                        return (
                            <li
                                key={id}
                                className={`cursor-default text-lg w-[90%] m-5 border-b flex items-center group 
                                }`}
                            >
                                <div
                                    onClick={() => handleTitleClick(title, content)}
                                    className="flex-grow text-center cursor-pointer"
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
                        );
                    })
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
                onSave={handleSaveWorker}
                title={selectedTitle ?? ''}
                content={selectedContent ?? ''}
            />
        </div>
    );
    
};

export default WorkSchedule;