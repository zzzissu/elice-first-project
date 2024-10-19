import React, { useState, useEffect } from 'react';
import PageModal from '../modal/PageModal';

const PersonerSchedule = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [savedPersonerTitles, setSavedPersonerTitles] = useState<
        { title: string; content: string; user_name: string; created_at: string; id: number }[]
    >([]);
    const [currentPersonalPage, setCurrentPersonalPage] = useState(1);
    const itemsPerPage = 5; // 한 페이지에 보여줄 아이템 수
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // 단일 선택된 항목의 ID를 관리하는 상태
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null); // 선택된 제목 상태
    const [selectedContent, setSelectedContent] = useState<string | null>(null); // 선택된 내용 상태
    const token = localStorage.getItem('token');

    // 개인일정 조회 함수
    const fetchPersonerData = () => {
        const apiUrl = 'http://34.22.95.156:3004/api/schedule/user';

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`개인일정조회 오류: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                const formattedDataPersoner = data.map((item: any) => ({
                    title: item.title,
                    content: item.content,
                    user_name: item.user_name,
                    created_at: item.created_at,
                    id: item.id,
                }));
                setSavedPersonerTitles(formattedDataPersoner);
            })
            .catch((error) => {
                console.error('개인일정조회 중 오류 발생:', error);
            });
    };

    // 개인일정 삭제
    const handleDeletePersoner = (id: number) => {
        fetch(`http://34.22.95.156:3004/api/schedule/user/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('개인일정 삭제 오류');
                }
                // 삭제 후 상태에서 해당 개인일정 제거
                setSavedPersonerTitles((prev) => prev.filter((item) => item.id !== id));
                // 선택된 항목이 삭제된 경우, 선택 상태 초기화
                if (selectedIndex === id) {
                    setSelectedIndex(null);
                }
            })
            .catch((error) => {
                console.error('개인일정 삭제 중 오류 발생:', error);
            });
    };

    // 개인일정 작성
    const handleSavePersoner = (title: string, content: string) => {
        fetch('http://34.22.95.156:3004/api/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title,
                content,
                makePublic: false,
                createdAt: new Date(),
                finishedAt: new Date(),
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(`개인일정 저장 오류: ${text}`);
                    });
                }
                return response.json();
            })
            .then(() => {
                setModalOpen(false);
                fetchPersonerData(); // 일정 저장 후 데이터를 다시 조회하여 갱신
            })
            .catch((error) => {
                console.error('개인일정 작성 중 오류 발생:', error);
            });
    };

    const handleTitleClick = (title: string, content: string) => {
        setSelectedTitle(title);
        setSelectedContent(content);
        setModalOpen(true);
    };

    const handleWriteClickPersonal = () => {
        setSelectedTitle(null);
        setSelectedContent(null);
        setModalOpen(true);
    };

    // 체크박스 변경 함수 (단 하나의 항목만 선택 가능)
    const handleCheckboxChange = (id: number) => {
        setSelectedIndex((prevIndex) => (prevIndex === id ? null : id)); // 같은 항목을 클릭하면 선택 해제, 아니면 선택
    };

    // 선택된 항목을 서버에 전송하는 함수
    const sendCheckedItemToServer = () => {
        if (selectedIndex !== null) {
            fetch(`http://34.22.95.156:3004/api/schedule/topublic/${selectedIndex}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('공유 상태 변경 오류');
                    }
                    console.log(`일정 ID ${selectedIndex}가 공유되었습니다.`);
                })
                .catch((error) => {
                    console.error('공유 상태 변경 중 오류 발생:', error);
                });
        }
    };

    // 개인 일정 페이지네이션 계산
    const indexOfLastPersonalItem = currentPersonalPage * itemsPerPage;
    const indexOfFirstPersonalItem = indexOfLastPersonalItem - itemsPerPage;
    const currentPersonalItems = savedPersonerTitles.slice(indexOfFirstPersonalItem, indexOfLastPersonalItem);
    const totalPersonalPages = Math.ceil(savedPersonerTitles.length / itemsPerPage);

    useEffect(() => {
        fetchPersonerData(); // 컴포넌트 마운트 시 데이터 조회
    }, []);

    return (
        <div>
            <div className="border-2 h-[28rem] w-[85%] mt-10 ml-16 rounded-lg shadow-lg">
                <div className="flex flex-row justify-between pt-10">
                    <p className="ml-10 text-xl">개인 일정을 작성해 주세요</p>
                    <p className="mt-1">(체크된 곳은 공유됩니다.)</p>
                    <button
                        onClick={handleWriteClickPersonal}
                        className="w-10 h-8 mr-6 -mt-2 rounded-md"
                        style={{
                            backgroundImage: `url('/assets/plus.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                </div>
                <ul>
                    {savedPersonerTitles.length > 0 ? (
                        currentPersonalItems.map(({ id, title, content }) => (
                            <li
                                key={id}
                                className="cursor-default text-lg w-[90%] m-5 border-b flex items-center group"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedIndex === id}
                                    onChange={() => handleCheckboxChange(id)}
                                    className="mr-4"
                                />
                                <div
                                    onClick={() => handleTitleClick(title, content)}
                                    className="flex-grow text-center cursor-pointer"
                                >
                                    {title}
                                </div>
                                <button
                                    onClick={() => handleDeletePersoner(id)}
                                    className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-4"
                                >
                                    ❌
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="flex items-center justify-center text-base pt-36">
                            현재 작성된 개인일정이 없습니다.
                        </li>
                    )}
                </ul>
                {totalPersonalPages > 1 && (
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: totalPersonalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`mx-1 px-4 py-2 rounded ${
                                    currentPersonalPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                }`}
                                onClick={() => setCurrentPersonalPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
                <button
                    onClick={() => {
                        sendCheckedItemToServer();
                        alert('일정이 공유되었습니다.');
                    }}
                    className="bg-blue-500 text-white rounded-lg p-2 ml-5 mt-2"
                >
                    선택된 일정 공유하기
                </button>
            </div>
            <PageModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={(title, content) => handleSavePersoner(title, content)} // 필요한 인자 전달
                title={selectedTitle ?? ''}
                content={selectedContent ?? ''}
            />
        </div>
    );
};

export default PersonerSchedule;
