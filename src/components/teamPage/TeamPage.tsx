import { useEffect, useState } from 'react';

interface Schedule {
    title: string; // 일정 제목
    user_name: string; // 일정 작성자 이름
    statusMessage: string; // 유저별 상태 메시지 추가
}

interface GroupedSchedule {
    user_name: string;
    statusMessage: string;
    schedules: Schedule[];
}

const TeamPage = () => {
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [groupedSchedules, setGroupedSchedules] = useState<GroupedSchedule[]>([]);

    const fetchStatusMessage = () => {
        const token = localStorage.getItem('token');

        fetch('http://34.22.95.156:3004/api/state/message', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('메시지를 불러오는데 실패하였습니다.');
                }
            })
            .then((data) => {
                setStatusMessage(data.statusMessage); // 상태 메시지 업데이트
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    };

    const fetchSchedules = () => {
        const token = localStorage.getItem('token');

        fetch('http://34.22.95.156:3004/api/schedule/team', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('일정을 불러오는데 실패하였습니다.');
                }
            })
            .then((data) => {
                const grouped = groupByUser(data); // 데이터를 유저별로 그룹화
                setGroupedSchedules(grouped);
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    };

    const groupByUser = (schedules: Schedule[]): GroupedSchedule[] => {
        const grouped = schedules.reduce((acc: { [key: string]: GroupedSchedule }, schedule) => {
            if (!acc[schedule.user_name]) {
                acc[schedule.user_name] = {
                    user_name: schedule.user_name,
                    statusMessage: schedule.statusMessage,
                    schedules: [],
                };
            }
            acc[schedule.user_name].schedules.push(schedule);
            return acc;
        }, {});

        return Object.values(grouped);
    };

    useEffect(() => {
        fetchStatusMessage(); // 상태 메시지를 불러옴
        fetchSchedules(); // 다른 유저의 스케줄을 불러옴
    }, []);

    return (
        <div className="pt-10 pl-10">
            <div className="flex flex-wrap gap-10">
                {groupedSchedules.length > 0 ? ( // 그룹화된 스케줄이 있는 경우
                    groupedSchedules.map((group, index) => (
                        <div
                            key={index}
                            className="h-56 max-h-56 w-56 rounded-lg text-sm shadow-lg flex flex-col text-center justify-center items-center"
                        >
                            <p className="sticky top-0 bg-mainColor text-white w-full text-center mb-2 p-2 rounded-t-lg">
                                {group.user_name} 님의 업무 계획입니다.
                            </p>{' '}
                            {/* 다른 유저의 이름 표시 */}
                            <div className="overflow-y-auto flex-grow p-2">
                                <div className="border-dashed border-2 p-1 text-sm w-44 mb-3">
                                    {group.statusMessage || '상태 메시지가 없습니다.'}
                                </div>
                                <ul className="list-disc">
                                    {group.schedules.map((schedule, idx) => (
                                        <li key={idx} className="text-left mb-2 border-b">
                                            {schedule.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-56 w-56 rounded-lg text-sm shadow-lg flex flex-col text-center justify-center items-center">
                        <div className="border-dashed border-2 p-1 text-sm w-44 mb-3">
                            {statusMessage || '상태 메시지가 없습니다.'}
                        </div>
                        <div className="border-b-2">일정이 없습니다.</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamPage;
