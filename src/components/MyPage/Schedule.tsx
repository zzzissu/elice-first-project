import React, { useState } from 'react';

const Modal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave?: (title: string, content: string) => void;
    title?: string;
    content?: string;
}> = ({ isOpen, onClose, onSave, title = '', content = '' }) => {
    const [newTitle, setNewTitle] = useState(title);
    const [newContent, setNewContent] = useState(content);

    React.useEffect(() => {
        setNewTitle(title);
        setNewContent(content);
    }, [title, content, isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (onSave) {
            onSave(newTitle, newContent);
            setNewTitle('');
            setNewContent('');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[40%] h-[70%]">
                <h2 className="text-2xl text-center font-semibold">일정을 작성해주세요</h2>
                <input
                    type="text"
                    placeholder="제목을 입력해주세요"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="border rounded w-full p-2 mt-3"
                />
                <textarea
                    placeholder="내용을 입력해주세요"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="border rounded w-full p-2 mt-3"
                    rows={15}
                />

                <div className="mt-4 flex justify-center">
                    <button
                        className={`h-8 w-16 text-xl text-center font-bold bg-blue-500 text-white rounded hover:bg-blue-600 mr-2
            ${!newTitle.trim() || !newContent.trim() ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        onClick={handleSave}
                        disabled={!newTitle.trim() || !newContent.trim()}
                    >
                        저장
                    </button>
                    <button
                        className="h-8 w-16 text-xl text-center font-bold bg-gray-700 text-white rounded hover:bg-gray-950"
                        onClick={onClose}
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

const Schedule = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [savedPersonerTitles, setSavedPersonerTitles] = useState<{ title: string; content: string }[]>([]);
    const [savedWorkTitles, setSavedWorkTitles] = useState<{ title: string; content: string }[]>([]);
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
    const [selectedContent, setSelectedContent] = useState<string | null>(null);
    const [modalType, setModalType] = useState<'personal' | 'work' | null>(null);

    // 피드백 저장 함수
    const handleSave = (title: string, content: string) => {
        if (modalType === 'personal') {
            setSavedPersonerTitles((prevTitles) => [...prevTitles, { title, content }]);
        } else if (modalType === 'work') {
            setSavedWorkTitles((prevTitles) => [...prevTitles, { title, content }]);
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
        setSavedPersonerTitles((prev) =>
            prev.filter((_, i) => i !== index))
    }
    const handleDeleteClickWork = (index: number) => {
        setSavedWorkTitles((prev) =>
            prev.filter((_, i) => i !== index))
    }

    return (
        <div className="sectionDevide h-[30rem] flex flex-row items-center justify-center">
            {/*왼쪽 구역 */}
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
                            savedPersonerTitles.map(({ title, content }, index) => (
                                <li
                                    key={index}
                                    className="cursor-default text-2xl w-[90%] m-5 border-b flex items-center group" // group 클래스를 li에 추가
                                >
                                    <div
                                        onClick={() => handleTitleClick(title, content, 'personal')}
                                        className="flex-grow text-center cursor-pointer"
                                    >
                                        {title}
                                    </div>
                                    <button
                                        onClick={() => handleDeleteClickPersoner(index)}
                                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-4"
                                    >
                                        ❌
                                    </button>
                                </li>
                            ))
                        ) : (

                            <li className="flex items-center justify-center text-base pt-40">현재 작성된 개인일정이 없습니다.</li>

                        )}
                    </ul>
                </div>
            </div>

            {/*오른쪽 구역 */}
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
                            savedWorkTitles.map(({ title, content }, index) => (
                                <li
                                    key={index}
                                    className="cursor-default text-2xl w-[90%] m-5 border-b flex items-center group"
                                >
                                    <div
                                        onClick={() => handleTitleClick(title, content, 'work')}
                                        className="flex-grow text-center cursor-pointer"
                                    >
                                        {title}
                                    </div>
                                    <button
                                        onClick={() => handleDeleteClickWork(index)}
                                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-4"
                                    >
                                        ❌
                                    </button>
                                </li>
                            ))
                        ) : (

                            <li className="flex items-center justify-center text-base pt-40">현재 작성된 업무일정이 없습니다.</li>

                        )}
                    </ul>
                </div>
            </div>

            <Modal
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
