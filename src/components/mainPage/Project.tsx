import React, { useState } from 'react';

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

    // 모달이 열릴 때 상태를 업데이트
    React.useEffect(() => {
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
                    disabled={isReadOnly} // 읽기 전용 모드에서 비활성화
                />
                <textarea
                    placeholder='내용을 입력해주세요'
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className='border rounded w-full p-2 mt-3'
                    rows={15}
                    disabled={isReadOnly} // 읽기 전용 모드에서 비활성화
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
    const [savedTitles, setSavedTitles] = useState<{ title: string; content: string }[]>([]);
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
    const [selectedContent, setSelectedContent] = useState<string | null>(null);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const handleSave = (title: string, content: string) => {
        if (selectedTitle) {
            // 수정하는 경우
            setSavedTitles(prevTitles =>
                prevTitles.map(item => (item.title === selectedTitle ? { title, content } : item))
            );
        } else {
            // 새로운 경우
            setSavedTitles(prevTitles => [...prevTitles, { title, content }]);
        }
        setModalOpen(false);
        setSelectedTitle(null);
        setSelectedContent(null);
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

    // 삭제 함수
    const handleDelete = (index: number) => {
        setSavedTitles(prevTitles => prevTitles.filter((_, i) => i !== index));
    };

    // 페이지네이션
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = savedTitles.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(savedTitles.length / itemsPerPage);
    

    return (
        <div className='flex flex-wrap'>
            {/* 왼쪽세션 */}
            <div className='flex flex-col w-full xl:w-1/2 p-5'>
                <div className='font-sans text-xl font-semibold'>알림</div>
                <div className='flex flex-col border h-56 w-full bg-indigo-50/100 mt-2 rounded-lg'>
                    <h2 className='flex justify-center pt-24'>알림 여기에 표시</h2>
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
                                currentItems.map(({ title, content }, index) => (
                                    <li key={index} className='flex justify-between items-center cursor-pointer text-xl w-[90%] m-5 border-b'>
                                        <span onClick={() => handleTitleClick(title, content)}>
                                            {title}
                                        </span>
                                        <button
                                            className='text-red-500 ml-4'
                                            onClick={() => handleDelete(index + indexOfFirstItem)}
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

            {/* 오른쪽세션 */}
            <div className='flex flex-col w-full xl:w-1/2 p-5'>
                <div className='font-sans text-xl font-semibold'>팀별페이지</div>
                <div className='flex flex-col border h-56 w-full bg-indigo-50/100 mt-2 rounded-lg'>
                    <h2 className='flex justify-center pt-24'>팀별 페이지 피드백 알람 여기에 표시</h2>
                </div>
                <div className='font-sans text-xl font-semibold mt-5'>개인페이지</div>
                <div className='flex flex-col border h-56 w-full bg-indigo-50/100 mt-2 rounded-lg'>
                    <h2 className='flex justify-center pt-24'>개인 페이지 피드백 알람 여기에 표시</h2>
                </div>
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