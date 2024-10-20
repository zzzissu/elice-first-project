import { useCallback, useEffect, useState } from 'react';

interface Schedule {
    title: string;
    user_name: string;
    status_message?: string;
    isPersonal?: boolean;
}

interface GroupedSchedule {
    user_name: string;
    status_message?: string;
    schedules: Schedule[];
}

interface PersonerItem {
    title: string;
    content: string;
    user_name: string;
    created_at: string;
    id: number;
    confirmed?: boolean;
}

const TeamPage = () => {
    const [groupedSchedules, setGroupedSchedules] = useState<GroupedSchedule[]>([]);
    const [currentPage, setCurrentPage] = useState<{ [key: string]: number }>({}); // 각 사용자별 페이지 상태
    const itemsPerPage = 3; // 한 페이지에 표시할 일정 수
    const [confirmedSchedule, setConfirmedSchedule] = useState<PersonerItem | null>(null);

    // 확정된 개인 일정 가져오기
    useEffect(() => {
        const savedSchedule = localStorage.getItem('confirmedSchedule');
        if (savedSchedule) {
            setConfirmedSchedule(JSON.parse(savedSchedule));
        }
    }, []);

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

    // 팀 일정 가져오기
    const fetchTeamSchedules = useCallback(async () => {
        try {
            const scheduleResponse = await fetch('http://34.22.95.156:3004/api/schedule/team', getFetchOptions('GET'));
    
            if (!scheduleResponse.ok) {
                throw new Error('팀 일정을 불러오는데 실패했습니다.');
            }
    
            const schedules: Schedule[] = await scheduleResponse.json();
            const grouped = groupByUser(schedules);
    
            console.log('Grouped schedules:', grouped); // 그룹화된 일정들 확인
    
            // 사용자별로 상태 메시지를 비동기로 가져옴
            const updatedGroupedSchedules = await Promise.all(
                grouped.map(async (group) => {
                    try {
                        const statusMessage = await fetchStatusMessage(group.user_name);
                        console.log(`Fetched status message for ${group.user_name}:`, statusMessage); // 사용자별 메시지 출력
                        
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
    
            // 상태 메시지가 업데이트된 그룹들 출력
            console.log('Updated grouped schedules with status messages:', updatedGroupedSchedules);
    
            setGroupedSchedules([...updatedGroupedSchedules]);
        } catch (error) {
            console.error('Error fetching team schedules:', error);
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
            console.log(`Full response for ${userName}:`, data); // 전체 응답을 확인
            return data.statusMessage; // 여기서 statusMessage 대신 다른 값을 확인할 수도 있습니다.
        } catch (error) {
            console.error('상태 메시지 불러오기 오류:', error);
            return '상태 메시지가 없습니다.';
        }
    };
    
    // 일정들을 사용자별로 그룹화하는 함수
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
        fetchTeamSchedules(); // 팀 일정 가져오기
    }, [fetchTeamSchedules]);

    // 페이지네이션 핸들러
    const handlePageChange = (userName: string, newPage: number) => {
        setCurrentPage((prev) => ({ ...prev, [userName]: newPage }));
    };

    return (
        <div className="pt-10 pl-10">
            {/* 그룹화된 일정들 렌더링 */}
            <div className="flex flex-wrap gap-10">
                {groupedSchedules.length > 0 ? (
                    groupedSchedules.map((group, index) => {
                        const userPage = currentPage[group.user_name] || 1;
                        const indexOfLastItem = userPage * itemsPerPage;
                        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                        const currentItems = group.schedules.slice(indexOfFirstItem, indexOfLastItem);
                        const totalPages = Math.ceil(group.schedules.length / itemsPerPage);

                        return (
                            <div
                                key={index}
                                className="h-72 w-56 rounded-lg text-sm shadow-lg flex flex-col text-center justify-start items-center"
                            >
                                {/* 사용자 이름 */}
                                <p className="bg-mainColor text-white w-full text-center mb-2 p-2 rounded-t-lg">
                                    {group.user_name} 님의 업무 계획입니다.
                                </p>

                                {/* 상태 메시지 */}
                                <div className="border-dashed border-2 p-1 text-sm w-44 mb-3">
                                    {group.status_message || '상태 메시지가 없습니다.'}
                                </div>

                                {/* 공유된 개인 일정 */}
                                {confirmedSchedule && group.user_name === confirmedSchedule.user_name && (
                                    <div className="h-10 w-full bg-yellow-200 text-black text-center mb-2 p-2 rounded-lg">
                                        {confirmedSchedule.title}
                                    </div>
                                )}

                                {/* 업무 일정 - 페이지네이션 추가 */}
                                <div className="overflow-y-auto flex-grow p-2 w-full">
                                    <ul className="list-disc">
                                        {currentItems.map((schedule, idx) => (
                                            <li key={idx} className="text-left mb-2 border-b">
                                                {schedule.title}
                                            </li>
                                        ))}
                                    </ul>
                                    {/* 페이지네이션 버튼 */}
                                    {totalPages > 1 && (
                                        <div className="flex justify-center mt-2">
                                            {Array.from({ length: totalPages }, (_, i) => (
                                                <button
                                                    key={i}
                                                    className={`mx-1 px-2 py-1 rounded ${userPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                                        }`}
                                                    onClick={() => handlePageChange(group.user_name, i + 1)}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="h-56 w-56 rounded-lg text-sm shadow-lg flex flex-col text-center justify-center items-center">
                        <div className="border-b-2">일정이 없습니다.</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamPage;
