import React, { useState, useEffect } from 'react';
import PageModal from '../modal/PageModal';

interface PersonerItem {
    title: string;
    content: string;
    user_name: string;
    created_at: string;
    id: number;
    confirmed?: boolean;
    makePublic?: boolean;
}

const PersonerSchedule = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [savedPersonerTitles, setSavedPersonerTitles] = useState<PersonerItem[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const token = localStorage.getItem('token');
    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        fetchUserData();
        fetchPersonerData();
        const storedData = localStorage.getItem('savedPersonerTitles');
        if (storedData) {
            setSavedPersonerTitles(JSON.parse(storedData));
        }
    }, []);

    const fetchUserData = () => {
        fetch('http://34.22.95.156:3004/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) throw new Error('사용자 정보 조회 실패');
                return response.json();
            })
            .then((data) => setUserName(data.name))
            .catch((error) => console.error('사용자 정보 조회 중 오류 발생:', error));
    };

    const fetchPersonerData = () => {
        fetch('http://34.22.95.156:3004/api/schedule/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) throw new Error(`개인 일정 조회 오류: ${response.statusText}`);
                return response.json();
            })
            .then((data: PersonerItem[]) => setSavedPersonerTitles(data))
            .catch((error) => console.error('개인 일정 조회 중 오류 발생:', error));
    };

    const handleSavePersoner = (title: string, content: string) => {
        fetch('http://34.22.95.156:3004/api/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content, makePublic: false, createdAt: new Date().toISOString(), finishedAt: new Date().toISOString() }),
        })
            .then((response) => {
                if (!response.ok) throw new Error(`개인 일정 추가 오류: ${response.statusText}`);
                return response.json();
            })
            .then(() => {
                setModalOpen(false);
                fetchPersonerData();
            })
            .catch((error) => console.error('개인 일정 추가 중 오류 발생:', error));
    };

    const handleDeletePersoner = (id: number) => {
        fetch(`http://34.22.95.156:3004/api/schedule/user/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (!response.ok) throw new Error('개인 일정 삭제 오류');
                setSavedPersonerTitles((prev) => {
                    const updatedTitles = prev.filter((item) => item.id !== id);
                    const totalPages = Math.ceil(updatedTitles.length / itemsPerPage);
                    if (currentPage > totalPages) setCurrentPage(totalPages);
                    localStorage.setItem('savedPersonerTitles', JSON.stringify(updatedTitles));
                    return updatedTitles;
                });
                if (selectedIndex === id) setSelectedIndex(null);
            })
            .catch((error) => console.error('개인 일정 삭제 중 오류 발생:', error));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = savedPersonerTitles.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(savedPersonerTitles.length / itemsPerPage);

    return (
        <div>
            <div className="border-2 h-[28rem] w-[85%] mt-10 ml-16 rounded-lg shadow-lg">
                <div className="flex flex-row justify-between pt-10">
                    <p className="ml-10 text-xl">개인 일정을 작성해 주세요</p>
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
                {savedPersonerTitles.length === 0 ? (
                    <ul>
                        <li className="flex items-center justify-center text-base pt-36">
                            현재 작성된 개인 일정이 없습니다.
                        </li>
                    </ul>
                ) : (
                    <ul>
                        {currentItems.map(({ id, title, makePublic, user_name }) => (
                            <li
                                key={id}
                                className={`cursor-default text-lg w-[90%] m-5 border-b flex items-center group ${
                                    makePublic ? 'bg-yellow-200 font-bold' : ''
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedIndex === id}
                                    onChange={() => setSelectedIndex(id)}
                                    className="mr-4"
                                    disabled={makePublic || savedPersonerTitles.some((item) => item.makePublic && item.user_name === userName)}
                                />
                                <div
                                    className="flex-grow text-center cursor-pointer"
                                    onClick={() => setModalOpen(true)}
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
                        ))}
                    </ul>
                )}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`mx-1 px-4 py-2 rounded ${
                                    currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                }`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
                <PageModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={(title, content) => handleSavePersoner(title, content)}
                    title=""
                    content=""
                />
            </div>
        </div>
    );
};

export default PersonerSchedule;