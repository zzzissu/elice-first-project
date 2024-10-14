import React, { useState } from 'react';
import Modal from './Modal';


const MailWrite = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mailTitle, setMailTitle] = useState('');
    const [mailContent, setMailContent] = useState('');

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const isFormValid = mailTitle.trim() !== '' && mailContent.trim() !==''

    return (
        <div className="h-auto w-full flex flex-col justify-center text-center align-middle">
            <div className="flex w-full space-x-4 justify-center text-center align-middle mt-12">
                <div className="flex w-1/2 justify-center text-center align-middle">
                    <label className="block pt-3 text-3xl font-sans font-bold text-gray-700 pl-6 pr-20">보내는 사람 </label>
                    <div className='flex justify-center text-gray-700 text-2xl w-[60%] font-sans font-bold h-14 bg-gray-300 rounded-lg shadow-lg items-center'>
                        hjh268100@gmail.com
                    </div>

                </div>
                <div className="flex w-1/2">
                    <label className="block pt-3 text-3xl font-sans font-bold text-gray-700 pl-6 pr-12">받는 사람 </label>
                    <input
                        placeholder='0000@0000.000'
                        className='flex justify-center shadow-lg items-center text-2xl w-[60%] border-2' />
                </div>
            </div>

            <div className='flex flex-row justify-start'>
                <div className="w-full">
                    <label className="flex text-3xl font-sans align-middle font-bold text-gray-700 pl-20 mt-8">
                        <div className='mt-1.5'>
                            메일 제목 :
                        </div>
                        <input
                            onChange ={(e)=>setMailTitle(e.target.value)}
                            value={mailTitle}
                            className="ml-5 pl-5 text-xl border p-3 rounded-ml w-[80%] font-sans" />
                    </label>
                </div>

            </div>
            <div className='flex flex-col justify-start'>
                <div className="w-full">
                    <label className="flex text-3xl font-sans align-middle font-bold text-gray-700 pl-20 mt-8">
                        <div className='mt-1.5'
                        >
                            메일 내용 :
                        </div>
                        <textarea
                        onChange ={(e)=>setMailContent(e.target.value)}
                            className="ml-5 pl-5 text-xl border p-3 rounded-ml w-[80%] font-sans"
                            rows={15}
                            value={mailContent} />
                    </label>
                </div>

            </div>
            <div className="flex justify-center mt-4">
                <button
                    className="text-2xl font-sans w-48 bg-mainColor text-white rounded-ml p-4"
                    onClick={handleModalOpen}
                    disabled={!isFormValid}
                    >
                    메일 보내기
                </button>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                <div className="text-lg">메일을 보내시겠습니까?</div>
            </Modal>

        </div >
    )
}

export default MailWrite
