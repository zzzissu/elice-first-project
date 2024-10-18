import React, { useState, useEffect } from 'react';
import PageModal from '../modal/PageModal';

const WorkSchedule = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [savedWorkTitles, setSavedWorkTitles] = useState<{ title: string; content: string; user_name: string; created_at: string; id: number }[]>([]);
    const [currentWorkPage, setCurrentWorkPage] = useState(1);
    const itemsPerPage = 6; // 한 페이지에 보여줄 아이템 수
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
    const [selectedContent, setSelectedContent] = useState<string | null>(null);

    const token = localStorage.getItem('token');

    // 업무일정 조회 함수
    const fetchWorkData = () => {
        const apiUrl = 'http://localhost:4000/api/schedule/team';

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
                const formattedDataWorker = data.map((item: any) => ({
                    title: item.title,
                    content: item.content,
                    user_name: item.user_name,
                    created_at: item.created_at,
                    id: item.id,
                }));
                setSavedWorkTitles(formattedDataWorker);
            })
            .catch((error) => {
                console.error('업무일정조회 중 오류 발생:', error);
            });
    };

    useEffect(() => {
        fetchWorkData(); // 컴포넌트 마운트 시 데이터 조회
    }, []);

    // 업무일정 작성
    const handleSaveWorker = (title: string, content: string) => {
        fetch("http://localhost:4000/api/schedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title,
                content,
                makePublic: true, // 필드명 수정
                createdAt: new Date().toISOString(),
                finishedAt: new Date().toISOString(),
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("업무일정 저장 오류");
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
        fetch(`http://localhost:4000/api/schedule/team/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("업무일정 삭제 오류");
                }
                // 삭제 후 상태에서 해당 업무일정 제거
                setSavedWorkTitles((prev) => prev.filter(item => item.id !== id));
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
                    onClick={handleWriteClickWork}
                    className="w-10 h-8 mr-6 -mt-2 rounded-md"
                    style={{
                        backgroundImage: `url('/assets/plus.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </div>
            <ul>
                {savedWorkTitles.length > 0 ? (
                    currentWorkItems.map(({ id, title, content }) => (
                        <li
                            key={id}
                            className="cursor-default text-lg w-[90%] m-5 border-b flex items-center group"
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
                onSave={handleSaveWorker}
                title={selectedTitle ?? ''}
                content={selectedContent ?? ''}
            />
        </div>
    );
};

export default WorkSchedule;
