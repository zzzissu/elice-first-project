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
      <div className="bg-white rounded-lg p-6 w-[60%] h-[55%]">
        <h2 className="text-3xl text-center font-semibold">공지사항</h2>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border rounded w-full p-5 mt-7 text-xl"
        />
        <textarea
          placeholder="내용을 입력해주세요"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="border rounded w-full p-5 mt-7 text-xl"
          rows={15}
        />
        <div className="mt-4 flex justify-center">
          <button
            className="h-14 w-28 text-2xl text-center font-bold bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
            onClick={handleSave}
          >
            저장
          </button>
          <button
            className="h-14 w-28 text-2xl text-center font-bold bg-gray-700 text-white rounded hover:bg-gray-950"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
    );
};

const Project = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [savedTitles, setSavedTitles] = useState<{ title: string, content: string }[]>([]);
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
    const [selectedContent, setSelectedContent] = useState<string | null>(null);
    const [isReadOnly, setIsReadOnly] = useState(false);

    // 피드백 저장 함수
    const handleSave = (title: string, content: string) => {
        setSavedTitles(prevTitles => [...prevTitles, { title, content }]);
        setModalOpen(false);
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

    return (
        <div className='flex'>
            {/* 왼쪽세션 */}
            <div className='flex flex-col w-[25%] pl-14 pt-10'>
                <div className='font-sans text-2xl font-semibold'>알림</div>
                <div className='flex flex-col border h-80 w-[100%] bg-indigo-50/100 mt-2 rounded-lg shadow-lg'>
                    <h2 className='flex justify-center pt-32 text-xl'>알람 여기에 표시</h2>
                </div>
                <div className='notion'>
                    <div className='flex justify-between'>
                        <div className='font-sans text-2xl font-semibold pt-10'>공지사항</div>
                        <button
                            className='text-blue-700 font-bold pt-14'
                            onClick={handleWriteClick}
                        >
                            +글쓰기
                        </button>
                    </div>
                    <div className='flex flex-col border bg-indigo-50/100 h-80 w-[100%] mt-2 rounded-lg shadow-lg'>
                        <ul>
                            {savedTitles.length > 0 ? (
                                savedTitles.map(({ title, content }, index) => (
                                    <li
                                        key={index}
                                        className="cursor-pointer text-xl w-[90%] m-5 border-b"
                                        onClick={() => handleTitleClick(title, content)}
                                    >
                                        {title}
                                    </li>
                                ))
                            ) : (
                                <li className="flex justify-center pt-32 text-xl">공지사항 여기에 표시</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* 오른쪽세션 */}
            <div className='flex flex-col ml-12 w-[75%]'>
                <div className='font-sans text-2xl font-semibold pt-10 pl-12'>팀별페이지</div>
                <div className='flex flex-col border h-80 w-[75%] bg-indigo-50/100 mt-2 rounded-lg shadow-lg ml-12'>
                    <h2 className='flex justify-center pt-32 text-xl'>팀별 페이지 피드백 알람 여기에 표시</h2>
                </div>
                <div className='font-sans text-2xl font-semibold pt-10 pl-12'>개인페이지</div>
                <div className='flex flex-col border h-80 w-[75%] bg-indigo-50/100 mt-2 rounded-lg shadow-lg ml-12'>
                    <h2 className='flex justify-center pt-32 text-xl'>개인 페이지 피드백 알람 여기에 표시</h2>
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
