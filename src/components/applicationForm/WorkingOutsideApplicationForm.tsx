import React, { useState } from 'react';
import FormModal from '../modal/FormModal';
import { useUserApi } from '../utils/useProfileApi';

const WorkingOutsideApplicationForm: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [reasonForWorking, setReasonForWorking] = useState(''); // 외근사유 상태
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const profile = useUserApi(); //유저 정보

    const openModal = () => {
        if (!isFormValid) return;
        setIsSubmitting(true);

        const token = localStorage.getItem('token');
        fetch('http://localhost:4000/api/approval/outside', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                content: reasonForWorking,
                start_date: startDate,
                finish_date: endDate,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('제출 실패');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data); // 응답 데이터 출력
                setIsModalOpen(true); // 모달 열기
            })
            .catch((error) => {
                console.error('Error:', error); // 에러 처리
            })
            .finally(() => {
                setIsSubmitting(false); // 요청 완료 후 제출 상태 변경
            });
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달 닫기
        const token = localStorage.getItem('token');

        fetch('http://localhost:4000/api/approval/count', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response.status);
                    throw new Error('정보를 가져오지 못했습니다.');
                }
            })
            .catch((error) => {
                console.error('정보조회 중 오류 발생:', error);
            });
    };

    const isFormValid = reasonForWorking !== '' && startDate !== '' && endDate !== '';
    return (
        <div className="flex flex-row max-w-[1280px]">
            <div className="flex-1 w-full p-8 bg-white">
                <div className="flex flex-row gap-4">
                    <div className="flex-1 flex flex-col space-y-2">
                        <label className="text-lg font-bold text-gray-700">이름</label>
                        <div className="bg-gray-200 text-gray-700 text-lg p-2 rounded">{profile.name}</div>
                    </div>
                    <div className="flex-1 flex flex-col space-y-2">
                        <label className="text-lg font-bold text-gray-700">부서</label>
                        <div className="bg-gray-200 text-gray-700 text-lg p-2 rounded">{profile.department}</div>
                    </div>
                </div>
                <div className="flex flex-row gap-4 mt-4">
                    <div className="flex-1 flex flex-col space-y-2">
                        <label className="text-lg font-bold text-gray-700">시작</label>
                        <input
                            type="date"
                            className="border rounded p-2 w-full"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="flex-1 flex flex-col space-y-2">
                        <label className="text-lg font-bold text-gray-700">종료</label>
                        <input
                            type="date"
                            className="border rounded p-2 w-full"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
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
                        disabled={!isFormValid || isSubmitting}
                        className={`w-32 py-2 font-sans font-bold text-white bg-blue-500 rounded ${
                            !isFormValid || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-600'
                        }`}
                    >
                        결재 신청
                    </button>
                </div>

                <FormModal isOpen={isModalOpen} onClose={closeModal}>
                    <p className="font-sans text-xl font-bold ml-2">결재신청 완료</p>
                    <button
                        onClick={() => {
                            closeModal(); // 모달 닫기
                            window.location.reload(); // 페이지 새로고침
                        }}
                        className="ml-10 mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        확인
                    </button>
                </FormModal>
            </div>
        </div>
    );
};
export default WorkingOutsideApplicationForm;
