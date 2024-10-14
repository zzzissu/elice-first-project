import React from 'react';
import { useState } from 'react';
import FormModal from '../applicationFormModal/FormModal';

const AnnualApplicationForm: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 상태
    const [reasonForAnnual, setreasonForAnnual] = useState<string>(''); // 연차사유 상태

    const openModal = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const isFormValid = reasonForAnnual !== '';
    return (
        <div className="h-auto w-full flex flex-col justify-center text-center align-middle">
            <div className="flex w-full space-x-4 justify-center text-center align-middle mt-7">
                <div className="flex w-1/2 justify-center text-center align-middle">
                    <label className="block pt-1 text-xl font-sans font-bold text-gray-700 pl-6 pr-10">이름 </label>
                    <div className="flex justify-center text-gray-700 text-xl w-[60%] font-sans font-bold h-8 bg-gray-300 rounded-lg shadow-lg items-center">
                        하정우
                    </div>
                </div>
                <div className="flex w-1/2">
                    <label className="block pt-1 text-xl font-sans font-bold text-gray-700 pl-6 pr-10">부서 </label>
                    <div className="flex justify-center text-gray-700 text-xl w-[60%] font-sans font-bold h-8 bg-gray-300 rounded-lg shadow-lg items-center">
                        프론트엔드 개발팀
                    </div>
                </div>
            </div>

            <div className="flex mt-7">
                <div className="flex w-1/2 justify-center text-center align-middle">
                    <label className=" text-xl font-bold text-gray-700 font-sans mt-1">연차 시작일</label>
                    <input
                        type="date"
                        className="border-2 w-[60%] rounded-md border-gray-300 shadow-sm ml-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg font-sans"
                    />
                </div>

                <div className="flex w-1/2">
                    <label className=" text-xl font-bold text-gray-700 font-sans">연차 종료일</label>
                    <input
                        type="date"
                        className=" border-2 w-[60%] rounded-md border-gray-300 shadow-sm ml-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg font-sans"
                    />
                </div>
            </div>
            <div className="flex w-full">
                <div className="w-full">
                    <label className="flex text-xl font-sans align-middle font-bold text-gray-700 ml-12 mt-5">
                        연차 사유
                    </label>
                    <textarea
                        value={reasonForAnnual}
                        onChange={(e) => setreasonForAnnual(e.target.value)}
                        className="text-sm border p-3 rounded-ml mt-2 w-[90%] font-sans"
                        placeholder="사유를 입력하세요"
                        rows={11}
                    />
                </div>
            </div>

            <div className="flex items-center justify-center mt-3">
                <button
                    onClick={openModal}
                    disabled={!isFormValid}
                    className={`text-lg font-sans w-24 bg-mainColor rounded-lg text-white rounded-ml p-2 ${
                        !isFormValid ? 'bg-gray-400 cursor-not-allowed' : ''
                    }`}
                >
                    결재 신청
                </button>
                <FormModal isOpen={isModalOpen} onClose={closeModal}>
                    <p className="font-sans text-xl font-bold">결재신청 완료</p>
                </FormModal>
            </div>
        </div>
    );
};
export default AnnualApplicationForm;
