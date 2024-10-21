import React, { useState } from 'react'

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete : ()=> void;
}

const DeleteModal = ({ isOpen, onClose, onDelete }: DeleteModalProps) => {
    const [inputValue, setInputValue] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={onClose}>
            <div
                className="flex flex-col bg-white p-10 rounded-lg w-96 shadow-lg relative text-center"
                onClick={(e) => e.stopPropagation()}>
                <div>정말로 탈퇴하시겠습니까??</div>
                <div>탈퇴하시려면 "탈퇴요청"을 입력하세요</div>
                <input
                    className='border-2 p-2 text-center'
                    type="text"
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputValue(e.target.value) }}
                />
                <div className='gap-2 flex justify-center'>
                    <button
                        disabled={inputValue !== '탈퇴요청'}
                        onClick={onDelete}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        탈퇴
                    </button>
                    <button
                        onClick={onClose}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
                        취소
                    </button>
                </div>
            </div>
        </div >
    );
}

export default DeleteModal;
