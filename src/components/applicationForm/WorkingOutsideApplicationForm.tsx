import React, { useState } from 'react';
import FormModal from '../modal/FormModal';

const WorkingOutsideApplicationForm: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [reasonForWorking, setReasonForWorking] = useState(''); // 외근사유 상태

    const openModal = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const isFormValid = reasonForWorking !== '';
    return (
        <div className="flex flex-row max-w-[1280px]">
            <div className="flex-1 w-full p-8 bg-white">
                <div className="flex flex-row gap-4">
                    <div className="flex-1 flex flex-col space-y-2">
                        <label className="text-lg font-bold text-gray-700">이름</label>
                        <div className="bg-gray-200 text-gray-700 text-lg p-2 rounded">하정우</div>
                    </div>
                    <div className="flex-1 flex flex-col space-y-2">
                        <label className="text-lg font-bold text-gray-700">부서</label>
                        <div className="bg-gray-200 text-gray-700 text-lg p-2 rounded">프론트엔드 개발팀</div>
                    </div>
                </div>
                <div className="flex flex-row gap-4 mt-4">
                    <div className="flex-1 flex flex-col space-y-2">
                        <label className="text-lg font-bold text-gray-700">시작</label>
                        <input type="date" className="border rounded p-2 w-full" />
                    </div>
                    <div className="flex-1 flex flex-col space-y-2">
                        <label className="text-lg font-bold text-gray-700">종료</label>
                        <input type="date" className="border rounded p-2 w-full" />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="text-lg font-bold text-gray-700">사유</label>
                    <textarea
                        value={reasonForWorking}
                        onChange={(e) => setReasonForWorking(e.target.value)}
                        className="w-full border p-4 rounded resize-none"
                        rows={5}
                        placeholder="사유를 입력하세요"
                    />
                </div>
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={openModal}
                        disabled={!isFormValid}
                        className={`w-32 py-2 font-sans font-bold text-white bg-blue-500 rounded ${
                            !isFormValid ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-600'
                        }`}
                    >
                        결재 신청
                    </button>
                </div>

                <FormModal isOpen={isModalOpen} onClose={closeModal}>
                    <p className="font-sans text-xl font-bold ml-2">결재신청 완료</p>
                </FormModal>
            </div>
        </div>
    );
};
export default WorkingOutsideApplicationForm;
