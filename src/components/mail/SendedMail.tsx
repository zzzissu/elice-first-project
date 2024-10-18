import React,{useState, useEffect} from 'react'

const SendedMail = () => {
    const [savedSendedMail, setSavedSendedMail] = useState<{ title: string; content: string; user_email: string; created_at: string; id: number }[]>([]);
    const handleDeleteSendedMail = (id: number) => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:4000/api/email/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('메일 삭제 오류');
                }
                // 삭제 후 상태에서 해당 메일 제거
                setSavedSendedMail((prev) => prev.filter((item) => item.id !== id));
            })
            .catch((error) => {
                console.error('메일 삭제 중 오류 발생:', error);
            });
    };
    const handlegetSendedEmail = () => {
        const token = localStorage.getItem('token');
        const apiUrl = 'http://localhost:4000/api/email/sent';

        fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`메일 조회 오류: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                const SendedMailData = data.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    content: item.content,
                    user_email : item. user_email ,
                    created_at: item.created_at, 
                    is_checked : item.is_checked ,
                }));
                setSavedSendedMail(SendedMailData);
            })
            .catch((error) => {
                console.error('메일 조회 중 오류 발생:', error);
            });
    };

    useEffect(() => {
        handlegetSendedEmail();
    }, []);

    return (
        <div className="w-full">
            <table className="min-w-full border-collapse border-b-2 border-gray-300 mt-5">
                <thead>
                    <tr className="bg-blue-50">
                        <th className="border-b-2 border-gray-300 p-2 w-1/6">받는사람</th>
                        <th className="border-b-2 border-gray-300 p-2 w-3/6">내용</th>
                        <th className="border-b-2 border-gray-300 p-2 w-1/6">날짜</th>
                        <th className="border-b-2 border-gray-300 p-2 w-1/6">삭제</th>
                    </tr>
                </thead>
                <tbody>
                {savedSendedMail.map((mail) => (
                        <tr className="h-14" key={mail.id}>
                            <td className="border-b-2 border-gray-300 p-2 text-center">{mail.user_email}</td>
                            <td className="border-b-2 border-gray-300 p-2 text-center">{mail.title}</td>
                            <td className="border-b-2 border-gray-300 p-2 text-center">{mail.created_at}</td>
                            <td className="border-b-2 border-gray-300 p-2 text-center align-middle">
                                <button
                                    className="bg-red-500 text-white p-2 rounded-lg"
                                    onClick={() => handleDeleteSendedMail(mail.id)}
                                >
                                    삭제
                                    </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default SendedMail
