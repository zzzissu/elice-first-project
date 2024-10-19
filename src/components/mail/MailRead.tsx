import React, { useState, useEffect } from 'react';
import MailDetailModal from '../modal/MailDetailModal';

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
    const itemsPerPage = 6;

    const handleDeleteReadMail = (id: number) => {
        const token = localStorage.getItem('token');
        fetch(`http://34.22.95.156:3004/api/email/${id}`, {
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
        fetch('http://34.22.95.156:3004/api/email/received', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => (response.ok ? response.json() : Promise.reject(response)))
            .then((data: Mail[]) => {
                // 중복 메일 제거 후 날짜 순으로 오름차순 정렬 (가장 오래된 메일이 위로 오도록)
                const uniqueData = data.reduce<Mail[]>((acc, item) => {
                    if (!acc.some((mail) => mail.id === item.id)) {
                        acc.push(item);
                    }
                    return acc;
                }, []);
    
                // created_at 기준으로 오름차순 정렬
                uniqueData.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    
                setSavedReadMail(uniqueData);
            })
            .catch((error) => {
                console.error('메일 조회 중 오류 발생:', error);
            });
    };
    

    useEffect(() => {
        handlegetReadEmail();
    }, []);

    // 이메일 체크 확인
    const handleCheckMail = (id: number) => {
        const token = localStorage.getItem('token');
        fetch(`http://34.22.95.156:3004/api/email/check/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('메일 확인 상태 변경 오류');
                }
                // 변경된 메일의 상태를 업데이트
                setSavedReadMail((prev) =>
                    prev.map((mail) => (mail.id === id ? { ...mail, is_checked: true } : mail))
                );
            })
            .catch((error) => {
                console.error('메일 읽음 상태 변경 중 오류 발생:', error);
            });
    };

    const openModal = (mail: Mail) => {
        // 모달을 열면서 해당 메일을 읽은 상태로 변경
        handleCheckMail(mail.id);
        setSelectedMail(mail);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedMail(null);
        setIsModalOpen(false);
    };

    const handleConfirm = () => {
        // 확인 버튼을 눌렀을 때의 동작을 정의합니다.
        console.log('메일이 확인되었습니다.');
        closeModal();

        // 모든 메일이 읽혔는지 확인
        const allMailsRead = savedReadMail.every((mail) => mail.is_checked);
        if (allMailsRead) {
            // 모든 메일이 읽혔고 확인 버튼이 눌렸다면 페이지 새로고침
            window.location.reload();
        }
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
                                currentReadMailPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
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
