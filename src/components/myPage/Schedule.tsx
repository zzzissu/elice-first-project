import React, { useState } from 'react';
import PageModal from '../modal/PageModal';

const Schedule = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [savedPersonerTitles, setSavedPersonerTitles] = useState<{title: string; content: string }[]>([]);
    const [savedWorkTitles, setSavedWorkTitles] = useState<{title: string; content: string }[]>([]);
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
    const [selectedContent, setSelectedContent] = useState<string | null>(null);
    const [modalType, setModalType] = useState<'personal' | 'work' | null>(null);

    // 개인 일정과 업무 일정의 페이지네이션 상태 분리
    const [currentPersonalPage, setCurrentPersonalPage] = useState(1);
    const [currentWorkPage, setCurrentWorkPage] = useState(1);
    const itemsPerPage = 6; // 한 페이지에 보여줄 아이템 수

    // 체크박스에서 선택된 항목 관리
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // 피드백 저장 함수
    const handleSave = (title: string, content: string) => {
        const newItem ={title, content};
        if (modalType === 'personal') {
            setSavedPersonerTitles((prev) => [...prev, newItem]);
        } else if (modalType === 'work') {
            setSavedWorkTitles((prev) => [...prev,newItem]);
        }
        setModalOpen(false);
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

    const handleDeleteClickPersoner = (index: number) => {
        setSavedPersonerTitles((prev) => prev.filter((_, i) => i !== index));
    };
    const handleDeleteClickWork = (index: number) => {
        setSavedWorkTitles((prev) => prev.filter((_, i) => i !== index));
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
                        <div className="text-base ml-10">개인 일정을 작성해 주세요</div>
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
                            currentPersonalItems.map(({ title, content }, index) => (
                                <li
                                    key={index}
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
                                        onClick={() => handleDeleteClickPersoner(indexOfFirstPersonalItem + index)}
                                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-4"
                                    >
                                        ❌
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="flex items-center justify-center text-base pt-40">
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
                </div>
            </div>

            {/* 오른쪽 구역 - 업무 일정 */}
            <div className="rightSite w-[50%]">
                <div className="border-2 h-[28rem] w-[85%] mt-10 ml-8 rounded-lg shadow-lg">
                    <div className="flex flex-row justify-between pt-10">
                        <div className="text-base ml-10">업무 일정을 작성해 주세요</div>
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
                            currentWorkItems.map(({title, content }, index) => (
                                <li
                                    key={index}
                                    className="cursor-default text-lg w-[90%] m-5 border-b flex items-center group"
                                >
                                    <div
                                        onClick={() => handleTitleClick(title, content, 'work')}
                                        className="flex-grow text-center cursor-pointer"
                                    >
                                        {title}
                                    </div>
                                    <button
                                        onClick={() => handleDeleteClickWork(indexOfFirstWorkItem + index)}
                                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-4"
                                    >
                                        ❌
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="flex items-center justify-center text-base pt-40">
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
