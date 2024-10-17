import React, { useState, useEffect } from 'react';
import FormModal from '../modal/FormModal';

const MailWrite = () => {
    const [email, setEmail] = useState("");
    const [target_email, setTarget_email] = useState("");
    const [title, setTitle] = useState("")
    const [content,setContent] = useState("");

    useEffect(() => {
        userData();
    }, [])
    const userData = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                console.log("사용자의 정보를 받아오지 못했습니다.")
            }
            const res = await fetch("http://localhost:4000/api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setEmail(data.email);
            } else {
                console.log(res.status)
                console.error("사용자의 정보를 가져오는데 실패하였습니다.")
            }
        }
        catch (e) {
            console.error("네트워크 오류가 발생되었습니다.", e)
        }
    }
    const handleSave = async (title: string, content: string) => {
        const token = localStorage.getItem('token');

        try {
            const res = await fetch("http://localhost:4000/api/email/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({title,content,target_email}),
            });

            if (!res.ok) {
                throw new Error("보내기가 실패하였습니다.");
            }

            const data = await res.json();
            console.log("서버 응답:", data);

            // 서버 응답이 성공적일 때 상태 업데이트 및 모달 닫기

        } catch (e) {
            console.error("에러 발생:", e);
        }
    };


    const [isModalOpen, setIsModalOpen] = useState(false);
 

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const isFormValid = title.trim() !== '' && title.trim() !== ''

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
                        className='flex justify-center pl-3 items-center text-xl w-[55%] border-2' />
                    {target_email}
                </div>
            </div>

            <div className='flex flex-row justify-start'>
                <div className="w-full">
                    <label className="flex text-xl font-sans align-middle font-bold text-gray-700 pl-20 mt-8">
                        <div className='pt-1'>
                            메일 제목 :
                        </div>
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className="pl-5 ml-5 text-lg border p-1 rounded-ml w-[80%] font-sans" />
                    </label>
                </div>

            </div>
            <div className='flex flex-col justify-start'>
                <div className="w-full">
                    <label className="flex text-xl font-sans align-middle font-bold text-gray-700 pl-20 mt-8">
                        <div className='mt-1.5'
                        >
                            메일 내용 :
                        </div>
                        <textarea
                            onChange={(e) => setContent(e.target.value)}
                            className="ml-5 pl-5 text-lg border p-3 rounded-ml w-[80%] font-sans"
                            rows={7}
                            value={content} />
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
            <FormModal
                isOpen={isModalOpen} onClose={handleModalClose}>
                <div className="text-sm">메일을 보내시겠습니까?</div>
            </FormModal>

        </div >
    )
}

export default MailWrite
