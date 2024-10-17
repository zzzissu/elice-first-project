import React, { useEffect, useState } from 'react';
import PageModal from '../modal/PageModal';

interface Schedule {
    id: string;
    title: string;
    content: string;
    makePublic: boolean;
    createAt: string;
    finishedAt?: string;
}

const Schedule = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [savedPersonerTitles, setSavedPersonerTitles] = useState<{ id: string; title: string; content: string }[]>([]);
    const [savedWorkTitles, setSavedWorkTitles] = useState<{ id: string; title: string; content: string }[]>([]);
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
    const [selectedContent, setSelectedContent] = useState<string | null>(null);
    const [modalType, setModalType] = useState<'personal' | 'work' | null>(null);
    // 개인 일정과 업무 일정의 페이지네이션 상태 분리
    const [currentPersonalPage, setCurrentPersonalPage] = useState(1);
    const [currentWorkPage, setCurrentWorkPage] = useState(1);
    const itemsPerPage = 6; // 한 페이지에 보여줄 아이템 수

    // 체크박스에서 선택된 항목 관리
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        MySchedule();
    }, []);

    const MySchedule = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch("http://localhost:4000/api/schedule/user", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error("일정 조회에 실패하였습니다.");
            }

            const data: Schedule[] = await res.json();
            const personalSchedule = data
                .filter((item: Schedule) => !item.makePublic)
                .map(({ id, title, content }) => ({ id, title, content }));
            const workSchedule = data
                .filter((item: Schedule) => item.makePublic)
                .map(({ id, title, content }) => ({ id, title, content }));

            setSavedPersonerTitles(personalSchedule);
            setSavedWorkTitles(workSchedule);
        } catch (e) {
            console.error('에러 발생:', e);
        }
    };

    // 피드백 저장 함수
    const handleSave = async (title: string, content: string) => {
        const makePublic = modalType === 'work';
        const token = localStorage.getItem('token');

        try {
            const res = await fetch("http://localhost:4000/api/schedule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    content,
                    makePublic,
                    createdAt: new Date().toISOString(),
                    finishedAt: "",
                }),
            });

            if (!res.ok) {
                throw new Error("보내기가 실패하였습니다.");
            }

            const data = await res.json();
            console.log("서버 응답:", data);

            // 서버 응답이 성공적일 때 상태 업데이트 및 모달 닫기
            if (makePublic) {
                setSavedWorkTitles((prev) => [...prev, { id: data.id, title, content }]);
            } else {
                setSavedPersonerTitles((prev) => [...prev, { id: data.id, title, content }]);
            }

            setModalOpen(false);
        } catch (e) {
            console.error("에러 발생:", e);
        }
    };

    // 일정 삭제 함수
    const handleDeletePersoner = async (scheduleId: string, index: number, type: 'personal' | 'work') => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("토큰이 없습니다.");
                return;
            }

            const res = await fetch('http://localhost:4000/api/schedule/user/:scheduleId', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                console.error("삭제 실패하였습니다.", res.status);
                return;
            }

            console.log("삭제 성공");

            // 로컬 상태 업데이트
            if (type === 'personal') {
                setSavedPersonerTitles((prev) => prev.filter((_, i) => i !== index));
            } else if (type === 'work') {
                setSavedWorkTitles((prev) => prev.filter((_, i) => i !== index));
            }
        } catch (e) {
            console.error('오류가 발생하였습니다.', e);
        }
    };

    // 공지사항 항목 클릭 시 내용 보기
    const handleTitleClick = (title: string, content: string, type: 'personal' | 'work') => {
        setSelectedTitle(title);
        setSelectedContent(content);
        setModalType(type);
        setModalOpen(true);
    };

    // 글쓰기 버튼 클릭 시 모달 열기
    const handleWriteClickPersonal = () => {
        setSelectedTitle(null);
        setSelectedContent(null);
        setModalType('personal');
        setModalOpen(true);
    };

    const handleWriteClickWork = () => {
        setSelectedTitle(null);
        setSelectedContent(null);
        setModalType('work');
        setModalOpen(true);
    };

    // 체크박스 변경 함수
    const handleCheckboxChange = (index: number) => {
        setSelectedIndex(index === selectedIndex ? null : index);
    };

    // 개인 일정 페이지네이션 계산
    const indexOfLastPersonalItem = currentPersonalPage * itemsPerPage;
    const indexOfFirstPersonalItem = indexOfLastPersonalItem - itemsPerPage;
    const currentPersonalItems = savedPersonerTitles.slice(indexOfFirstPersonalItem, indexOfLastPersonalItem);
    const totalPersonalPages = Math.ceil(savedPersonerTitles.length / itemsPerPage);

    // 업무 일정 페이지네이션 계산
    const indexOfLastWorkItem = currentWorkPage * itemsPerPage;
    const indexOfFirstWorkItem = indexOfLastWorkItem - itemsPerPage;
    const currentWorkItems = savedWorkTitles.slice(indexOfFirstWorkItem, indexOfLastWorkItem);
    const totalWorkPages = Math.ceil(savedWorkTitles.length / itemsPerPage);

    return (
        <div className="sectionDevide h-[30rem] flex flex-row items-center justify-center">
            {/* 왼쪽 구역 - 개인 일정 */}
            <div className="leftSite w-[50%]">
                <div className="border-2 h-[28rem] w-[85%] mt-10 ml-16 rounded-lg shadow-lg">
                    <div className="flex flex-row justify-between pt-10">
                        <p className="ml-10 text-xl">개인 일정을 작성해 주세요</p>
                        <p className=' mt-1'>(체크된곳은 공유됩니다.)</p>
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
                            currentPersonalItems.map(({ id, title, content }, index) => (
                                <li
                                    key={id || index}
                                    className="cursor-default text-lg w-[90%] m-5 border-b flex items-center group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={indexOfFirstPersonalItem + index === selectedIndex}
                                        onChange={() => handleCheckboxChange(indexOfFirstPersonalItem + index)}
                                        className="mr-4"
                                    />
                                    <div
                                        onClick={() => handleTitleClick(title, content, 'personal')}
                                        className="flex-grow text-center cursor-pointer"
                                    >
                                        {title}
                                    </div>
                                    <button
                                        onClick={() => handleDeletePersoner(id, indexOfFirstPersonalItem + index, 'personal')}
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
                                    className={`mx-1 px-4 py-2 rounded ${currentPersonalPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                        }`}
                                    onClick={() => setCurrentPersonalPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 오른쪽 구역 - 업무 일정 */}
            <div className="rightSite w-[50%]">
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
                            currentWorkItems.map(({ id, title, content }, index) => (
                                <li
                                    key={id || index}
                                    className="cursor-default text-lg w-[90%] m-5 border-b flex items-center group"
                                >
                                    <div
                                        onClick={() => handleTitleClick(title, content, 'work')}
                                        className="flex-grow text-center cursor-pointer"
                                    >
                                        {title}
                                    </div>
                                    <button
                                        onClick={() => handleDeletePersoner(id, indexOfFirstWorkItem + index, 'work')}
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
                                    className={`mx-1 px-4 py-2 rounded ${currentWorkPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                        }`}
                                    onClick={() => setCurrentWorkPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <PageModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                title={selectedTitle ?? ''}
                content={selectedContent ?? ''}
            />
        </div>
    );
};

export default Schedule;
