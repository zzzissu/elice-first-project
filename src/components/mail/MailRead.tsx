import React, { useState, useEffect } from 'react';
import MailDetailModal from '../modal/MailDetailModal'

interface Mail {
    id: number;
    title: string;
    content: string;
    user_email: string;
    created_at: string;
    is_checked: boolean;
}

const MailRead: React.FC = () => {
    const [savedReadMail, setSavedReadMail] = useState<Mail[]>([]);
    const [selectedMail, setSelectedMail] = useState<Mail | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentReadMailPage, setCurrentReadMailPage] = useState(1);
    const itemsPerPage = 6; // 한 페이지에 보여줄 아이템 수

    const handleDeleteReadMail = (id: number) => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:4000/api/email/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('메일 삭제 오류');
                }
                setSavedReadMail((prev) => prev.filter((item) => item.id !== id));
            })
            .catch((error) => {
                console.error('메일 삭제 중 오류 발생:', error);
            });
    };

    const handlegetReadEmail = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:4000/api/email/received', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.ok ? response.json() : Promise.reject(response))
            .then((data: Mail[]) => {
                const uniqueData = data.reduce<Mail[]>((acc, item) => {
                    if (!acc.some(mail => mail.id === item.id)) {
                        acc.push(item);
                    }
                    return acc;
                }, []);
                setSavedReadMail(uniqueData);
            })
            .catch((error) => {
                console.error('메일 조회 중 오류 발생:', error);
            });
    };

    useEffect(() => {
        handlegetReadEmail();
    }, []);

    const openModal = (mail: Mail) => {
        setSelectedMail(mail);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedMail(null);
        setIsModalOpen(false);
    };

    const indexOfLastPersonalItem = currentReadMailPage * itemsPerPage;
    const indexOfFirstPersonalItem = indexOfLastPersonalItem - itemsPerPage;
    const currentPersonalItems = savedReadMail.slice(indexOfFirstPersonalItem, indexOfLastPersonalItem);
    const totalPersonalPages = Math.ceil(savedReadMail.length / itemsPerPage);

    return (
        <div className="w-full">
            <table className="min-w-full border-collapse border-b-2 border-gray-300 mt-5">
                <thead>
                    <tr className="bg-blue-50">
                        <th className="border-b-2 border-gray-300 p-2 w-1/6">보낸사람</th>
                        <th className="border-b-2 border-gray-300 p-2 w-3/6">내용</th>
                        <th className="border-b-2 border-gray-300 p-2 w-1/6">날짜</th>
                        <th className="border-b-2 border-gray-300 p-2 w-1/6">삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 전체 메일 목록 대신 페이지에 해당하는 항목만 표시 */}
                    {currentPersonalItems.map((mail) => (
                        <tr className="h-14" key={mail.id}>
                            <td className="border-b-2 border-gray-300 p-2 text-center">{mail.user_email}</td>
                            <td
                                className={`border-b-2 border-gray-300 p-2 text-center cursor-pointer ${
                                    mail.is_checked ? 'text-blue-300' : 'text-mainColor'
                                }`}
                                onClick={() => openModal(mail)}
                            >
                                {mail.title}
                            </td>
                            <td className="border-b-2 border-gray-300 p-2 text-center">
                                {new Date(mail.created_at).toLocaleDateString('en-CA')}
                            </td>
                            <td className="border-b-2 border-gray-300 p-2 text-center align-middle">
                                <button
                                    className="bg-red-500 text-white p-2 rounded-lg"
                                    onClick={() => handleDeleteReadMail(mail.id)}
                                >
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* 페이지네이션 버튼 */}
            {totalPersonalPages > 1 && (
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPersonalPages }, (_, i) => (
                        <button
                            key={i}
                            className={`mx-1 px-4 py-2 rounded ${
                                currentReadMailPage === i + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-300 text-black'
                            }`}
                            onClick={() => setCurrentReadMailPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

            <MailDetailModal isOpen={isModalOpen} onClose={closeModal} mail={selectedMail} />
        </div>
    );
};

export default MailRead;
