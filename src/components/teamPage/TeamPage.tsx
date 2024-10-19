import { useCallback, useEffect, useState } from 'react';

interface Schedule {
    title: string;
    user_name: string;
    status_message?: string;
}

interface GroupedSchedule {
    user_name: string;
    status_message?: string;
    schedules: Schedule[];
}

const TeamPage = () => {
    const [groupedSchedules, setGroupedSchedules] = useState<GroupedSchedule[]>([]);

    const getFetchOptions = (method: string) => {
        const token = localStorage.getItem('token');
        return {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
    };

    const fetchSchedules = useCallback(async () => {
        try {
            const scheduleResponse = await fetch('http://34.22.95.156:3004/api/schedule/team', getFetchOptions('GET'));

            if (!scheduleResponse.ok) {
                throw new Error('일정을 불러오는데 실패하였습니다.');
            }

            const schedules: Schedule[] = await scheduleResponse.json();
            const grouped = groupByUser(schedules);
            console.log('Fetched and grouped schedules:', grouped);

            const updatedGroupedSchedules = await Promise.all(
                grouped.map(async (group) => {
                    try {
                        const statusMessage = await fetchStatusMessage(group.user_name);
                        return {
                            ...group,
                            status_message: statusMessage,
                        };
                    } catch (error) {
                        console.error(`Error fetching status message for ${group.user_name}:`, error);
                        return {
                            ...group,
                            status_message: '상태 메시지가 없습니다.',
                        };
                    }
                })
            );

            setGroupedSchedules([...updatedGroupedSchedules]);
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    }, []);

    const fetchStatusMessage = async (userName: string): Promise<string> => {
        try {
            const response = await fetch(
                `http://34.22.95.156:3004/api/state/message?user=${userName}`,
                getFetchOptions('GET')
            );

            if (!response.ok) {
                throw new Error('상태 메시지 조회 오류');
            }

            const data = await response.json();
            return data.statusMessage;
        } catch (error) {
            console.error('Error fetching status message: ', error);
            return '상태 메시지가 없습니다.';
        }
    };

    const groupByUser = (schedules: Schedule[]): GroupedSchedule[] => {
        const grouped = schedules.reduce((acc: { [key: string]: GroupedSchedule }, schedule) => {
            if (!acc[schedule.user_name]) {
                acc[schedule.user_name] = {
                    user_name: schedule.user_name,
                    schedules: [],
                };
            }
            acc[schedule.user_name].schedules.push(schedule);
            return acc;
        }, {});

        return Object.values(grouped);
    };

    useEffect(() => {
        fetchSchedules();
    }, [fetchSchedules]);

    useEffect(() => {
        console.log('Schedules updated in state:', groupedSchedules);
    }, [groupedSchedules]);

    return (
        <div className="pt-10 pl-10">
            <div className="flex flex-wrap gap-10">
                {groupedSchedules.length > 0 ? (
                    groupedSchedules.map((group, index) => (
                        <div
                            key={index}
                            className="h-56 max-h-56 w-56 rounded-lg text-sm shadow-lg flex flex-col text-center justify-center items-center"
                        >
                            <p className="sticky top-0 bg-mainColor text-white w-full text-center mb-2 p-2 rounded-t-lg">
                                {group.user_name} 님의 업무 계획입니다.
                            </p>
                            <div className="overflow-y-auto flex-grow p-2">
                                <div className="border-dashed border-2 p-1 text-sm w-44 mb-3">
                                    {group.status_message || '상태 메시지가 없습니다.'}
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
                            상태 메시지가 없습니다.
                        </div>
                        <div className="border-b-2">일정이 없습니다.</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamPage;
