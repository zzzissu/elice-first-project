import React,{useEffect, useState} from 'react'

const TotalVacation = () => {

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
    <div className='ml-14 text-base font-bold flex flex-col justify-center text-left'>
      <div className='mt-8'>
        현재 하정우님의 전체 연차는 {annual_leave}개 입니다.
      </div>
      <div className='mt-4'>
        2024년 10월에 입사하였으며 년차 증가당 1개가 추가증가됩니다.
      </div>

      <div className='mt-4'>
        현재 총 10개의 연차가 남아있습니다.
      </div>
    </div>
  )
}

export default TotalVacation
