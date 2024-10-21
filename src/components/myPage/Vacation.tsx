import React ,{useState, useEffect}from 'react';
import { Routes, Link, Route } from 'react-router-dom';
import TotalVacation from './TotalVacation';



const Vacation = () => {
    useEffect(() => {
        getApprovalCounts(); // 결재 상태 데이터 가져오기
    }, []);
    
    const [approvalCounts, setApprovalCounts] = useState({
        annual: 0, // 연차
    });
    
    const getApprovalCounts = () => {
        const token = localStorage.getItem('token');
        fetch('http://34.22.95.156:3003/api/approval/count', {
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
        <div className="sectionDevide ">
            {/*휴가 버튼 구역 */}
            <div className="flex flex-col justify-center items-center">
                <div className="upSideSite h-40 w-full border-b-2 flex flex-row items-center justify-center gap-20">
                    <button className="text-lg font-bold border-2 h-32 w-56 rounded-lg shadow-lg">
                        <Link to="total-vacation">
                            전체 연차
                            <div className="mt-2">16</div>
                        </Link>
                    </button>
                </div>
            </div>

            {/*휴가 디테일 구역 */}
            <div className="downSideSite">
                <Routes>
                    <Route path="total-vacation" element={<TotalVacation />} />
                </Routes>
            </div>
        </div>
    );
};

export default Vacation;
