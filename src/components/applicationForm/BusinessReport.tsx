import React, { useState } from 'react';
import FormModal from '../applicationFormModal/FormModal';

const BusinessReport: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [taskName, setTaskName] = useState(''); // 업무명 상태
    const [reportContent, setReportContent] = useState(''); // 업무 보고서 상태

    const openModal = () => {
        setIsModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
    };

    const isFormValid = taskName !== '' && reportContent !== '';
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

            <div className="flex pt-5 w-full justify-center">
                <div className="flex w-1/3 justify-center text-center align-middle">
                    <label className="text-xl font-bold text-gray-700 font-sans mt-1">업무명</label>
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        className=" border-2 w-[55%] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-sans ml-3"
                        placeholder="업무명을 입력하세요"
                    />
                </div>

                <div className="flex w-1/3">
                    <label className=" text-xl  font-bold text-gray-700 font-sans mt-1 pr-4">업무 시작</label>
                    <input
                        type="date"
                        className=" w-[30%] border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-sans"
                    />
                    <input
                        type="time"
                        className=" w-[30%] border-2 rounded-md border-gray-300 shadow-sm  ml-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-sans"
                    />
                </div>
                <div className="flex w-1/3">
                    <label className=" text-xl  font-bold text-gray-700 font-sans mt-1 pr-4">업무 종료</label>
                    <input
                        type="date"
                        className=" w-[30%] border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-sans"
                    />
                    <input
                        type="time"
                        className=" w-[30%] border-2 rounded-md border-gray-300 shadow-sm  ml-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-sans"
                    />
                </div>
            </div>

            <div className="flex w-full">
                <div className="w-full">
                    <label className="flex text-xl font-sans align-middle font-bold text-gray-700 ml-10 mt-5">
                        업무 보고서
                    </label>
                    <textarea
                        value={reportContent}
                        onChange={(e) => setReportContent(e.target.value)}
                        className="flex text-sm border p-3 rounded-ml ml-10 mt-2 w-[93%] font-sans"
                        placeholder="사유를 입력하세요"
                        rows={5}
                    />
                </div>
            </div>
            <div className="flex w-full">
                <div className="flex w-1/2">
                    <label className="flex text-xl font-sans align-middle ml-10 font-bold text-gray-700 mt-2">
                        요청사항
                    </label>
                </div>
                <div>
                    <label className="flex text-xl font-sans align-middle font-bold ml-10 text-gray-700 mt-2">
                        특이사항
                    </label>
                </div>
            </div>
            <div className="flex w-full">
                <div className="flex w-1/2">
                    <textarea
                        className="flex text-sm border p-3 rounded-ml ml-10 mt-2 w-[90%] font-sans"
                        placeholder="요청사항을 입력하세요"
                        rows={3}
                    />
                </div>
                <div className="flex w-1/2">
                    <textarea
                        className="flex text-sm border p-3 rounded-ml ml-10 mt-2 w-[86%] font-sans"
                        placeholder="특이사항을 입력하세요"
                        rows={3}
                    />
                </div>
            </div>

            <div className="flex items-center justify-center mt-4">
                <button
                    onClick={openModal}
                    disabled={!isFormValid}
                    className={`text-lg font-sans w-24 bg-mainColor rounded-lg  text-white rounded-ml mt-2 p-2 ${
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

export default BusinessReport;
