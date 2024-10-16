import React from 'react';
import { Routes, Link, Route } from 'react-router-dom';
import TotalVacation from './TotalVacation';
import UsedVacation from './UsedVacation';

const Vacation = () => {
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
                    <button className="text-lg font-bold border-2 h-32 w-56 rounded-lg shadow-lg">
                        <Link to="used-vacation">
                            사용 연차
                            <div className="mt-2 text-red-700">6</div>
                        </Link>
                    </button>
                </div>
            </div>

            {/*휴가 디테일 구역 */}
            <div className="downSideSite">
                <Routes>
                    <Route path="total-vacation" element={<TotalVacation />} />
                    <Route path="used-vacation" element={<UsedVacation />} />
                </Routes>
            </div>
        </div>
    );
};

export default Vacation;
