import React from 'react';

const BusinessReport: React.FC = () => {
    return (
        <div className="h-auto w-full flex flex-col p-4 space-y-2">
            <div className="flex  w-full space-x-4 mb-10">
                <div className="w-1/2 p-4">
                    <label className="block text-2xl font-sans font-bold text-gray-700">이름</label>
                </div>
                <div className="w-1/2 p-4">
                    <label className="block text-2xl font-sans font-bold text-gray-700">부서</label>
                </div>
            </div>
            <div className="flex w-full space-x-4 p-4">
                <div className="w-1/3 ">
                    <label className="block text-2xl font-bold text-gray-700 font-sans ">업무명</label>
                    <input
                        type="text"
                        className="text-sm border p-3 rounded-[10px] m-2.5 w-full border-gray-300"
                        placeholder="업무명을 입력하세요"
                    />
                </div>
                <div className="w-1/3 ">
                    <label className="block text-2xl font-bold text-gray-700 font-sans ">업무 시작</label>
                    <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg font-sans"
                    />
                    <input
                        type="time"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg font-sans"
                    />
                </div>
                <div className="w-1/3">
                    <label className="block text-2xl font-bold text-gray-700 font-sans">업무 종료</label>
                    <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg font-sans"
                    />
                    <input
                        type="time"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg font-sans"
                    />
                </div>
            </div>
            <div className="flex w-full">
                <div className="w-full p-4">
                    <label className="block text-2xl font-sans font-bold text-gray-700">업무 보고서</label>
                    <textarea
                        className="text-sm border p-3 rounded-[10px] m-2.5 border-gray-300 w-full font-sans"
                        placeholder="업무내용을 작성하세요"
                        rows={25}
                    />
                </div>
            </div>
            <div className="flex w-full">
                <div className="w-full p-4">
                    <label className="block text-2xl font-sans font-bold text-gray-700">요청사항</label>
                    <input
                        type="text"
                        className="text-sm border p-3 rounded-[10px] m-2.5 border-gray-300 w-full font-sans"
                        placeholder="요청사항을 입력하세요"
                    />
                </div>
            </div>
            <div className="flex w-full">
                <div className="w-full p-4">
                    <label className="block text-2xl font-sans font-bold text-gray-700">특이사항</label>
                    <input
                        type="text"
                        className="text-sm border p-3 rounded-[10px] m-2.5 border-gray-300 w-full font-sans"
                        placeholder="특이사항을 입력하세요"
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <button className="text-lg font-sans  w-1/4 bg-mainColor text-white rounded-[10px] p-2 mt-">
                    결재 신청
                </button>
            </div>
        </div>
    );
};

export default BusinessReport;
