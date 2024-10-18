import React, { useEffect, useState } from 'react';
import FormModal from '../modal/FormModal';

const MailWrite = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mailTitle, setMailTitle] = useState('');
    const [mailContent, setMailContent] = useState('');
    const [email, setEmail] = useState('');
    const [targetEmail, setTargetEmail] = useState(''); // 받은 사람 이메일 상태 추가
    const [savedMails, setSavedMails] = useState<{ id: number; title: string; content: string; target_email: string }[]>([]); // 상태 추가

    const WriteMail = () => {
        const token = localStorage.getItem("token");

        return fetch("http://localhost:4000/api/email/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title: mailTitle, content: mailContent, target_email: targetEmail }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("메일 발송 오류");
            }
            return response.json();
        })
        .then((newMail) => {
            // 중복되지 않게 새로운 메일을 추가하는 로직
            setSavedMails((prevMails) => {
                if (!prevMails.some(mail => mail.id === newMail.id)) {
                    return [...prevMails, newMail];
                }
                return prevMails;
            });
            
            // 상태 초기화
            setMailTitle('');
            setMailContent('');
            setTargetEmail('');
        })
        .catch((error) => {
            console.error('메일 발송 중 오류 발생:', error);
        });
    };

    useEffect(() => {
        userData();
    }, []); // 의존성 배열 추가로 한 번만 호출되도록 설정

    const userData = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:4000/api/users', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log(response.status);
                throw new Error("정보를 가져오지 못했습니다.");
            }
        })
        .then((data) => {
            setEmail(data.email);
        })
        .catch((error) => {
            console.error('정보 조회 중 오류 발생:', error);
        });
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const isFormValid = mailTitle.trim() !== '' && mailContent.trim() !== '' && targetEmail.trim() !== '';

    return (
        <div className="h-auto w-full flex flex-col justify-center text-center align-middle">
            <div className="flex w-full space-x-4 justify-center text-center align-middle mt-12">
                <div className="flex w-1/2 justify-center text-center align-middle">
                    <label className="block pt-3 text-xl font-sans font-bold text-gray-700 pl-6 pr-6">보내는 사람 </label>
                    <div className='flex justify-center text-gray-700 text-xl w-[55%] font-sans font-bold h-10 bg-gray-300 rounded-lg shadow-lg items-center'>
                        {email}
                    </div>
                </div>
                <div className="flex w-1/2">
                    <label className="block pt-3 text-xl font-sans font-bold text-gray-700 pl-6 pr-6">받는 사람 </label>
                    <input
                        placeholder='0000@0000.000'
                        value={targetEmail}
                        onChange={(e) => setTargetEmail(e.target.value)} // 상태 업데이트
                        className='flex justify-center pl-3 items-center text-xl w-[55%] border-2'
                    />
                </div>
            </div>

            <div className='flex flex-row justify-start'>
                <div className="w-full">
                    <label className="flex text-xl font-sans align-middle font-bold text-gray-700 pl-20 mt-8">
                        <div className='pt-1'>메일 제목 :</div>
                        <input
                            onChange={(e) => setMailTitle(e.target.value)}
                            value={mailTitle}
                            className="pl-5 ml-5 text-lg border p-1 rounded-ml w-[80%] font-sans"
                        />
                    </label>
                </div>
            </div>

            <div className='flex flex-col justify-start'>
                <div className="w-full">
                    <label className="flex text-xl font-sans align-middle font-bold text-gray-700 pl-20 mt-8">
                        <div className='mt-1.5'>메일 내용 :</div>
                        <textarea
                            onChange={(e) => setMailContent(e.target.value)}
                            value={mailContent}
                            className="ml-5 pl-5 text-lg border p-3 rounded-ml w-[80%] font-sans"
                            rows={7}
                        />
                    </label>
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <button
                    className="text-lg font-sans w-24 bg-mainColor text-white rounded-ml p-1"
                    onClick={handleModalOpen}
                    disabled={!isFormValid}
                >
                    보내기
                </button>
            </div>

            <FormModal isOpen={isModalOpen} onClose={handleModalClose}>
                <div className="text-sm">
                    메일을 보내시겠습니까?
                    <div className="flex justify-end mt-4">
                        <button
                            className="bg-blue-500 text-white p-2 rounded-lg mr-2"
                            onClick={() => {
                                WriteMail().then(() => {
                                    handleModalClose();
                                });
                            }}
                        >
                            확인
                        </button>
                        <button
                            className="bg-gray-400 text-white p-2 rounded-lg"
                            onClick={handleModalClose}
                        >
                            취소
                        </button>
                    </div>
                </div>
            </FormModal>

        </div>
    );
};

export default MailWrite;
