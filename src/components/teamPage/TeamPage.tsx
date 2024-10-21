import { useCallback, useEffect, useState } from 'react';

interface Schedule {
    title: string;
    user_name: string;
    isPersonal?: boolean;
}

interface GroupedSchedule {
    user_name: string;
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
    const [currentPage, setCurrentPage] = useState<{ [key: string]: number }>({});
    const [state, setState] = useState<{ state: string }[]>([]);  // 배열로 수정
    const [statusMessage, setstatusMessage] = useState<{ status_message: string }[]>([]);  // 배열로 수정
    const itemsPerPage = 3;

    useEffect(() => {
        userState();  // 상태와 상태 메시지 조회
        userMessage();
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

    const userState = () => {
        const token = localStorage.getItem('token');
        fetch("http://34.22.95.156:3004/api/state/all", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log('상태 조회 응답:', response);  // 응답을 확인
            if (!response.ok) {
                throw new Error("정보를 가져오는데 실패하였습니다.");
            }
            return response.json();
        })
        .then((data) => {
            console.log('상태 데이터:', data);  // 데이터 확인
            setState(data);  // 데이터를 setState에 저장
        })
        .catch((error) => {
            console.error('상태 조회 중 오류 발생:', error);
        });
    };

   const userMessage = () => {
    const token = localStorage.getItem('token');
    fetch("http://34.22.95.156:3004/api/state/all/messages", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        console.log('상태 메시지 응답:', response);  // 응답을 확인
        if (!response.ok) {
            throw new Error("정보를 가져오는데 실패하였습니다.");
        }
        return response.json();
    })
    .then((data) => {
        console.log('상태 메시지 데이터:', data);  // 데이터 확인
        setstatusMessage(data);  // 데이터를 setstatusMessage에 저장
    })
    .catch((error) => {
        console.error('상태 메시지 조회 중 오류 발생:', error);
    });
};
    // 팀 일정을 가져오는 함수
    const fetchTeamSchedules = useCallback(async () => {
        try {
            const response = await fetch('http://34.22.95.156:3004/api/schedule/team', getFetchOptions('GET'));
            if (!response.ok) {
                throw new Error('팀 일정을 불러오는데 실패했습니다.');
            }

            const schedules: Schedule[] = await response.json();
            const grouped = groupByUser(schedules);
            setGroupedSchedules(grouped);

            return grouped;
        } catch (error) {
            console.error('Error fetching team schedules:', error);
            return [];
        }
    }, []);

    // 일정 데이터를 사용자별로 그룹화하는 함수
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

        // 객체의 값을 배열로 변환해서 반환
        return Object.values(grouped);
    };

    useEffect(() => {
        fetchTeamSchedules();
    }, [fetchTeamSchedules]);

    const handlePageChange = (userName: string, newPage: number) => {
        setCurrentPage((prev) => ({ ...prev, [userName]: newPage }));
    };

    const renderPaginationButtons = (totalPages: number, currentPage: number, userName: string) => {
        return Array.from({ length: totalPages }, (_, i) => (
            <button
                key={i}
                className={`mx-1 px-2 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                onClick={() => handlePageChange(userName, i + 1)}
            >
                {i + 1}
            </button>
        ));
    };

    const renderScheduleItems = (group: GroupedSchedule) => {
        const userPage = currentPage[group.user_name] || 1;
        const indexOfLastItem = userPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = group.schedules.slice(indexOfFirstItem, indexOfLastItem);
        const totalPages = Math.ceil(group.schedules.length / itemsPerPage);

        return (
            <div className="h-72 w-56 rounded-lg text-sm shadow-lg flex flex-col text-center justify-start items-center">
                <p className="bg-mainColor text-white w-full text-center mb-2 p-2 rounded-t-lg">
                    {group.user_name} 님의 업무 계획입니다.
                </p>
                <div>
                    {state.length > 0 ? (
                        <p>상태: {state[0].state}</p>
                    ) : (
                        <p>상태 정보가 없습니다.</p>
                    )}
                </div>
                <div>
                    {statusMessage.length > 0 ? (
                        <p>상태 메시지: {statusMessage[0].status_message}</p>
                    ) : (
                        <p>상태 메시지가 없습니다.</p>
                    )}
                </div>

                <div className="overflow-y-auto flex-grow p-2 w-full">
                    <ul className="list-disc">
                        {currentItems.map((schedule, idx) => (
                            <li key={idx} className="text-left mb-2 border-b">
                                {schedule.title}
                            </li>
                        ))}
                    </ul>
                    {totalPages > 1 && <div className="flex justify-center mt-2">{renderPaginationButtons(totalPages, userPage, group.user_name)}</div>}
                </div>
            </div>
        );
    };

    return (
        <div className="pt-10 pl-10">
            <div className="flex flex-wrap gap-10">
                {groupedSchedules.length > 0 ? (
                    groupedSchedules.map((group, index) => (
                        <div key={index}>{renderScheduleItems(group)}</div>
                    ))
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
