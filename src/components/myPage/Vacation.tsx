import React,{useState, useEffect} from 'react';
import { Routes, Link, Route } from 'react-router-dom';
import TotalVacation from './TotalVacation';
import UsedVacation from './UsedVacation';

const Vacation = () => {

    useEffect(()=>{
        userData();
      },[])
    
      const [annual_leave,  setAnnual_leave] = useState("")
      const userData = async () => {
        try {
          const token = localStorage.getItem('token')
          if (!token) {
            console.log("사용자의 정보를 받아오지 못했습니다.")
          }
          const res = await fetch("http://localhost:4000/api/users", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setAnnual_leave(data.annual_leave);
          } else {
            console.log(res.status)
            console.error("사용자의 정보를 가져오는데 실패하였습니다.")
          }
        }
        catch (e) {
          console.error("네트워크 오류가 발생되었습니다.", e)
        }
      }
    return (
        <div className="sectionDevide ">
            {/*휴가 버튼 구역 */}
            <div className="flex flex-col justify-center items-center">
                <div className="upSideSite h-40 w-full border-b-2 flex flex-row items-center justify-center gap-20">
                    <button className="text-lg font-bold border-2 h-32 w-56 rounded-lg shadow-lg">
                        <Link to="total-vacation">
                            전체 연차
                            <div className="mt-2">{annual_leave}</div>
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
