import React from 'react';

interface MailDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    mail: { title: string; content: string; user_email: string; created_at: string; id: number } | null;
}

const MailDetailModal: React.FC<MailDetailModalProps> = ({ isOpen, onClose, mail }) => {
    if (!isOpen || !mail) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4 border-b-2">{mail.title}</h2>
                <p className="mb-4">
    {mail.content}
</p>
                <div className="flex justify-end">
                    <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={onClose}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MailDetailModal;
