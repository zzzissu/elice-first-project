import React, { useState, useEffect } from 'react';

// 모달 컴포넌트
const Modal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave?: (title: string, content: string) => void;
    title?: string;
    content?: string;
    isReadOnly?: boolean;
}> = ({ isOpen, onClose, onSave, title = '', content = '', isReadOnly }) => {
    const [newTitle, setNewTitle] = useState(title);
    const [newContent, setNewContent] = useState(content);

    useEffect(() => {
        if (isOpen) {
            setNewTitle(title);
            setNewContent(content);
        }
    }, [title, content, isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (onSave) {
            onSave(newTitle, newContent);
            onClose(); // 모달 닫기
        }
    };

    const isSaveDisabled = !newTitle.trim() || !newContent.trim();

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white rounded-lg p-8 w-1/3 h-[60%]'>
                <h2 className='text-2xl text-center font-semibold'>공지사항</h2>
                <input
                    type='text'
                    placeholder='제목을 입력해주세요'
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className='border rounded w-full p-2 mt-3'
                    disabled={isReadOnly}
                />
                <textarea
                    placeholder='내용을 입력해주세요'
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className='border rounded w-full p-2 mt-3'
                    rows={15}
                    disabled={isReadOnly}
                />
                <div className='mt-4 flex justify-center'>
                    <button
                        className={`h-8 w-16 text-xl text-center font-bold rounded hover:bg-blue-600 mr-2 ${isSaveDisabled ? 'bg-gray-300 text-gray-700' : 'bg-blue-500 text-white'}`}
                        onClick={handleSave}
                        disabled={isSaveDisabled}
                    >
                        저장
                    </button>
                    <button
                        className='h-8 w-16 text-xl text-center font-bold bg-gray-700 text-white rounded hover:bg-gray-950'
                        onClick={onClose}
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

// 프로젝트 컴포넌트
const Project: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [savedTitles, setSavedTitles] = useState<{ title: string; content: string; user_name: string; created_at: string; id: number }[]>([]);
    const [teamSchedules, setTeamSchedules] = useState<{ scheduleId: string; title: string; content: string }[]>([]);
    const [userSchedules, setUserSchedules] = useState<{ scheduleId: string; title: string; content: string }[]>([]);
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
    const [selectedContent, setSelectedContent] = useState<string | null>(null);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [emailData, setEmailData] = useState<{ newEmailCount: number; message: string } | null>(null);
    
    // 페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTeamPage, setCurrentTeamPage] = useState(1);
    const [currentUserPage, setCurrentUserPage] = useState(1);
    const itemsPerPage = 4;

    // 이메일 조회
    const fetchEmailData = () => {
        const token = localStorage.getItem("token");
        fetch("http://34.22.95.156:3004/api/email/check", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("이메일 조회 오류");
                }
                return response.json();
            })
            .then((data) => {
                console.log('이메일 데이터:', data);
                setEmailData(data);
            })
            .catch((error) => {
                console.error('이메일 조회 중 오류 발생:', error);
            });
    };

    // 팀별 스케줄 조회
    const fetchTeamSchedules = () => {
        const token = localStorage.getItem("token");
        fetch("http://34.22.95.156:3004/api/schedule/team", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("팀별 스케줄 조회 오류");
                }
                return response.json();
            })
            .then((data) => {
                setTeamSchedules(data);
            })
            .catch((error) => {
                console.error('팀별 스케줄 조회 중 오류 발생:', error);
            });
    };

    // 개인 스케줄 조회
    const fetchUserSchedules = () => {
        const token = localStorage.getItem("token");
        fetch("http://34.22.95.156:3004/api/schedule/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("개인 스케줄 조회 오류");
                }
                return response.json();
            })
            .then((data) => {
                setUserSchedules(data);
            })
            .catch((error) => {
                console.error('개인 스케줄 조회 중 오류 발생:', error);
            });
    };

    // 공지사항 조회
    const fetchAnnouncements = () => {
        const token = localStorage.getItem("token");
        fetch("http://34.22.95.156:3004/api/announcement", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("공지사항 조회 오류");
                }
                return response.json();
            })
            .then((data) => {
                const formattedData = data.map((item: any) => ({
                    title: item.title,
                    content: item.content,
                    user_name: item.user_name,
                    created_at: item.created_at,
                    id: item.id,
                }));
                setSavedTitles(formattedData);
            })
            .catch((error) => {
                console.error('공지사항 조회 중 오류 발생:', error);
            });
    };

    useEffect(() => {
        fetchEmailData();
        fetchTeamSchedules();
        fetchUserSchedules();
        fetchAnnouncements();
    }, []);

    // 공지사항 작성
    const handleSave = (title: string, content: string) => {
        const token = localStorage.getItem("token");

        fetch("http://34.22.95.156:3004/api/announcement/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("공지사항 저장 오류");
                }
                return response.json();
            })
            .then(() => {
                fetchAnnouncements();
                setModalOpen(false);
            })
            .catch((error) => {
                console.error('공지사항 저장 중 오류 발생:', error);
            });
    };

    // 공지사항 삭제
    const handleDelete = (id: number) => {
        const token = localStorage.getItem("token");

        fetch(`http://34.22.95.156:3004/api/announcement/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("공지사항 삭제 오류");
                }
                setSavedTitles((prev) => prev.filter(item => item.id !== id));
            })
            .catch((error) => {
                console.error('공지사항 삭제 중 오류 발생:', error);
            });
    };

    // 공지사항 항목 클릭 시 내용 보기
    const handleTitleClick = (title: string, content: string) => {
        setSelectedTitle(title);
        setSelectedContent(content);
        setIsReadOnly(true);
        setModalOpen(true);
    };

    // 글쓰기 버튼 클릭 시 모달 열기
    const handleWriteClick = () => {
        setSelectedTitle(null);
        setSelectedContent(null);
        setIsReadOnly(false);
        setModalOpen(true);
    };

    // 페이지네이션 설정
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = savedTitles.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(savedTitles.length / itemsPerPage);

    // 팀 페이지 페이지네이션
    const indexOfLastTeamItem = currentTeamPage * itemsPerPage;
    const indexOfFirstTeamItem = indexOfLastTeamItem - itemsPerPage;
    const currentTeamItems = teamSchedules.slice(indexOfFirstTeamItem, indexOfLastTeamItem);
    const totalTeamPages = Math.ceil(teamSchedules.length / itemsPerPage);

    // 개인 페이지 페이지네이션
    const indexOfLastUserItem = currentUserPage * itemsPerPage;
    const indexOfFirstUserItem = indexOfLastUserItem - itemsPerPage;
    const currentUserItems = userSchedules.slice(indexOfFirstUserItem, indexOfLastUserItem);
    const totalUserPages = Math.ceil(userSchedules.length / itemsPerPage);

    return (
        <div className='flex flex-wrap'>
            {/* 왼쪽 세션 */}
            <div className='flex flex-col w-full xl:w-1/2 p-5'>
                <div className='font-sans text-xl font-semibold'>알림</div>
                <div className='flex flex-col border h-56 w-full bg-indigo-50/100 mt-2 rounded-lg'>
                    <h2 className='flex justify-center pt-4'>확인 안한 메일: {emailData ? emailData.newEmailCount : 0}개</h2>
                    <p className='flex justify-center'>{emailData?.message}</p>
                </div>
                <div className='flex flex-col w-full mt-5'>
                    <div className='font-sans text-xl font-semibold flex items-center justify-between'>
                        <span>공지사항</span>
                        <button
                            className='text-blue-700 font-bold text-sm'
                            onClick={handleWriteClick}
                        >
                            +글쓰기
                        </button>
                    </div>
                    <div className='flex flex-col border bg-indigo-50/100 h-56 w-full mt-1 rounded-lg'>
                        <ul>
                            {currentItems.length > 0 ? (
                                currentItems.map(({ title, content, id }) => (
                                    <li key={id} className='flex justify-between items-center cursor-pointer text-xl w-[90%] m-5 border-b'>
                                        <span onClick={() => handleTitleClick(title, content)}>
                                            {title}
                                        </span>
                                        <button
                                            className='text-red-500 ml-4'
                                            onClick={() => handleDelete(id)}
                                        >
                                            삭제
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className='flex justify-center pt-24'>공지사항 여기에 표시</li>
                            )}
                        </ul>
                    </div>
                    {/* 페이지네이션 */}
                    {totalPages > 1 && (
                        <div className='flex justify-center mt-4'>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    className={`mx-1 px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 오른쪽 세션 */}
            <div className='flex flex-col w-full xl:w-1/2 p-5'>
                <div className='font-sans text-xl font-semibold'>팀별 페이지</div>
                <div className='flex flex-col border h-56 w-full bg-indigo-50/100 mt-2 rounded-lg'>
                    <ul>
                        {currentTeamItems.length > 0 ? (
                            currentTeamItems.map(({ scheduleId, title }, index) => (
                                <li key={index} className='flex justify-between items-center cursor-pointer text-xl w-[90%] m-5 border-b'>
                                    <span>{title}</span>
                                </li>
                            ))
                        ) : (
                            <li className='flex justify-center pt-24'>팀별 페이지 피드백 알람 여기에 표시</li>
                        )}
                    </ul>
                </div>
                {/* 팀별 페이지네이션 */}
                {totalTeamPages > 1 && (
                    <div className='flex justify-center mt-4'>
                        {Array.from({ length: totalTeamPages }, (_, i) => (
                            <button
                                key={i}
                                className={`mx-1 px-4 py-2 rounded ${currentTeamPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                onClick={() => setCurrentTeamPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}

                <div className='font-sans text-xl font-semibold mt-5'>개인 페이지</div>
                <div className='flex flex-col border h-56 w-full bg-indigo-50/100 mt-2 rounded-lg'>
                    <ul>
                        {currentUserItems.length > 0 ? (
                            currentUserItems.map(({ scheduleId, title }, index) => (
                                <li key={index} className='flex justify-between items-center cursor-pointer text-xl w-[90%] m-5 border-b'>
                                    <span>{title}</span>
                                </li>
                            ))
                        ) : (
                            <li className='flex justify-center pt-24'>개인 페이지 피드백 알람 여기에 표시</li>
                        )}
                    </ul>
                </div>
                {/* 개인 페이지네이션 */}
                {totalUserPages > 1 && (
                    <div className='flex justify-center mt-4'>
                        {Array.from({ length: totalUserPages }, (_, i) => (
                            <button
                                key={i}
                                className={`mx-1 px-4 py-2 rounded ${currentUserPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                onClick={() => setCurrentUserPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* 모달창 */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                title={selectedTitle ?? ''}
                content={selectedContent ?? ''}
                isReadOnly={isReadOnly}
            />
        </div>
    );
};

export default Project;