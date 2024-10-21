import React, { useState, useEffect } from 'react';

const TotalVacation = () => {
    const [name, setName] = useState('');
    const [approvalCounts, setApprovalCounts] = useState({
        annual: 0, // 연차
    });

    useEffect(() => {
        userData();
        getApprovalCounts(); // 결재 상태 데이터 가져오기
    }, []);

    const userData = () => {
        const token = localStorage.getItem('token');
        fetch('http://34.22.95.156:3004/api/users', {
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
            .then((data) => {
                setName(data.name);
                setApprovalCounts({
                    annual: data.annual_leave,
                });
            })
            .catch((error) => {
                console.error('정보조회 중 오류 발생:', error);
            });
    };

    const getApprovalCounts = () => {
        const token = localStorage.getItem('token');
        fetch('http://34.22.95.156:3004/api/approval/count', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => (response.ok ? response.json() : Promise.reject('결재 정보 조회 실패')))
            .then((data) => {
                setApprovalCounts({
                    annual: data.annual_leave || 0, // 연차
                });
            })
            .catch((error) => console.error('결재 정보 조회 중 오류:', error));
    };

    return (
        <div className="ml-14 text-base font-bold flex flex-col justify-center text-left">
            <div className="mt-8">
                현재 {name}님의 전체 연차는 16개 입니다.
            </div>
            <div className="mt-4">2024년 10월에 입사하였으며 년차 증가당 1개가 추가증가됩니다.</div>

            <div className="mt-4">현재 총 {approvalCounts.annual}개의 연차가 남아있습니다.</div>
        </div>
    );
};

export default TotalVacation;
