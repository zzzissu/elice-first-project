import { useEffect, useState } from 'react';

interface Schedule {
    title: string; // 일정 제목
    user_id: string; // 일정 작성자 이름
    content: string; // 내용
}

const TeamPage = () => {
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [schedules, setSchedules] = useState<Schedule[]>([]);

    const fetchStatusMessage = () => {
        const token = localStorage.getItem('token');
    
        fetch("http://localhost:4000/api/state/message", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("메시지를 불러오는데 실패하였습니다.");
            }
        }).then(data => {
            setStatusMessage(data.statusMessage); // 상태 메시지 업데이트
        }).catch((error) => {
            console.error("Error: ", error);
        });
    };

    const fetchSchedules = () => {
        const token = localStorage.getItem('token');

        fetch("http://localhost:4000/api/schedule/team", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("일정을 불러오는데 실패하였습니다.");
            }
        }).then(data => {
            setSchedules(data); // 다른 유저의 스케줄 데이터 업데이트
        }).catch((error) => {
            console.error("Error: ", error);
        });
    };

    useEffect(() => {
        fetchStatusMessage(); // 상태 메시지를 불러옴
        fetchSchedules(); // 다른 유저의 스케줄을 불러옴
    }, []);

    return (
        <div className='pt-10 pl-10'>
            <div className='flex flex-wrap gap-10'>
                {schedules.length > 0 ? ( // 스케줄이 있는 경우
                    schedules.map((schedule, index) => (
                        <div key={index} className='h-56 w-56 rounded-lg text-sm shadow-lg flex flex-col text-center justify-center items-center'>
                            <p className='mb-2'>{schedule.user_id} 님의 업무 계획입니다.</p> {/* 다른 유저의 이름 표시 */}
                            <div className='border-dashed border-2 p-1 text-sm w-44 mb-3'>
                                {statusMessage || "상태 메시지가 없습니다."}
                            </div>
                            <div className='border-b-2'>
                                {schedule.title}
                            </div>
                            <div>
                                <ul>
                                    <li>{schedule.content || "내용이 없습니다."}</li>
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='h-56 w-56 rounded-lg text-sm shadow-lg flex flex-col text-center justify-center items-center'>
                        <div className='border-dashed border-2 p-1 text-sm w-44 mb-3'>
                            {statusMessage || "상태 메시지가 없습니다."}
                        </div>
                        <div className='border-b-2'>
                            일정이 없습니다.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TeamPage;
