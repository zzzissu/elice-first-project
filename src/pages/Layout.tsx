import React, { useState, useEffect } from 'react';
import Nav from '../components/nav/Nav';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
    const [profileImg, setProfileImg] = useState<string>('/assets/Group 18.png');
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [emailData, setEmailData] = useState<{ newEmailCount: number; message: string } | null>(null);
    const [approvalCounts, setApprovalCounts] = useState({
        pending: 0,
        approved: 0,
        rejected: 0,
        annual: 0,
    });
    const [isEmailRead, setIsEmailRead] = useState<boolean>(false);
    const navigate = useNavigate();

    const fetchEmailData = () => {
        const token = localStorage.getItem("token");
        fetch("http://34.22.95.156:3004/api/email/check", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setEmailData(data))
            .catch((error) => console.error('이메일 조회 중 오류 발생:', error));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    useEffect(() => {
        userData();
        getApprovalCounts();
        getPicture();
        fetchEmailData();
    }, []);

    useEffect(() => {
        if (emailData && emailData.newEmailCount > 0) {
            setIsEmailRead(false);
        }
    }, [emailData]);

    const getPicture = () => {
        const token = localStorage.getItem('token');
        fetch('http://34.22.95.156:3004/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProfileImg(data.profile_image || '/assets/Group 18.png');
            })
            .catch((error) => console.error('사진을 가져오는 중 오류 발생:', error));
    };

    const userData = () => {
        const token = localStorage.getItem('token');
        fetch('http://34.22.95.156:3004/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setName(data.name);
                setDepartment(data.department);
                setPosition(data.position);
            })
            .catch((error) => console.error('정보조회 중 오류 발생:', error));
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
            .then((response) => response.json())
            .then((data) => {
                setApprovalCounts({
                    pending: data.pending_count || 0,
                    approved: data.approved_count || 0,
                    rejected: data.rejected_count || 0,
                    annual: data.annual_leave || 0,
                });
            })
            .catch((error) => console.error('결재 정보 조회 중 오류:', error));
    };

    // `handleSelectChange` 함수 정의
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };

    // `saveMessage` 함수 정의
    const saveMessage = (statusMessage: string) => {
        const token = localStorage.getItem('token');
        fetch('http://34.22.95.156:3004/api/state/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                statusMessage: statusMessage,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('상태메시지 전송 오류');
                }
                return response.json();
            })
            .then((data) => {
                console.log('상태 전송 성공', data);
                alert('상태 메시지가 저장되었습니다.');
            })
            .catch((error) => console.error('상태전송 중 오류 발생:', error));
    };

    const markEmailsAsRead = () => {
        const token = localStorage.getItem("token");
        fetch("http://34.22.95.156:3004/api/email/markAsRead", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then(() => {
                setIsEmailRead(true);
                setEmailData((prev) => (prev ? { ...prev, newEmailCount: 0 } : prev));
            })
            .catch((error) => console.error('이메일 상태 업데이트 중 오류 발생:', error));
    };

    return (
        <div className="flex">
            <Nav />
            <div className="w-[100%] min-w-[1280px]">
                <header>
                    <div className="h-20 w-auto bg-blue-700 flex justify-between items-center">
                        <div className="text-3xl text-white font-medium font-sans pl-8">Project</div>
                        <div className="flex flex-row">
                            <div
                                style={{
                                    backgroundImage: `url("${profileImg}")`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                                className="z-10 h-12 w-12 mr-3 rounded-full"
                            />
                            <div className="text-xl text-white pt-3 font-sans pr-3">{name}</div>
                            <div className="p-2 mr-1">
                                <img
                                    src={!isEmailRead && emailData && emailData.newEmailCount > 0 ? '/assets/alarmOn.png' : '/assets/alarmOff.png'}
                                    alt="alarm"
                                    className="h-9 w-9"
                                    onClick={markEmailsAsRead}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                            <button onClick={handleLogout} className="p-2 mr-3 border-l border-slate-400">
                                <img src="/assets/logout.png" alt="Logout" className="h-8 w-8 " />
                            </button>
                        </div>
                    </div>
                </header>

                {/* 회사사진 */}
                <div
                    style={{
                        backgroundImage: `url('/assets/office-3438241_1280.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    className="h-56 w-auto relative"
                />
                <div className="flex items-center max-h-screen bg-sky-50">
                    <div className="sectionDevide flex w-full">
                        <div className="leftSide relative -top-12 h-full">
                            <div className="flex flex-col items-center h-44 w-56 ml-20 bg-white rounded-lg shadow-2xl">
                                <div
                                    style={{
                                        backgroundImage: `url("${profileImg}")`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                    className="mt-5 h-20 w-20 rounded-full"
                                >
                                    <label htmlFor="imageUpload">
                                        <div
                                            style={{
                                                backgroundImage: `url('/assets/Group 17.png')`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                            className="h-8 w-8 ml-12 mt-14 cursor-pointer"
                                        />
                                    </label>
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        accept="image/png, image/jpeg"
                                        style={{ display: 'none' }}
                                    />
                                </div>

                                <div className="text-xl pt-2">{name}</div>
                                <div className=" pt-1 text-xs">
                                    {department} {position}
                                </div>
                            </div>

                            <div className="rounded-lg shadow-lg border w-56 h-8 ml-20 bg-white mt-3 flex items-center justify-between font-medium">
                                <div className="rounded-full bg-blue-700 h-3 w-3 ml-4" />
                                <div className="flex-grow ml-4 text-sm">결재중</div>
                                <div className="text-base text-blue-700 mr-4">{approvalCounts.pending}</div>
                            </div>

                            <div className="rounded-lg shadow-lg border w-56 ml-20 h-8 bg-white mt-2 flex items-center justify-between font-medium">
                                <div className="rounded-full bg-green-700 h-3 w-3 ml-4" />
                                <div className="flex-grow ml-4 text-sm">결재완료</div>
                                <div className="text-base text-green-700 mr-4">{approvalCounts.approved}</div>
                            </div>

                            <div className="rounded-lg shadow-lg border w-56 ml-20 h-8 bg-white mt-2 flex items-center justify-between font-medium">
                                <div className="rounded-full bg-red-700 h-3 w-3 ml-4" />
                                <div className="flex-grow ml-4 text-sm">반려</div>
                                <div className="text-base text-red-700 mr-4">{approvalCounts.rejected}</div>
                            </div>

                            <div className="rounded-lg shadow-lg border w-56 ml-20 h-8 bg-white mt-2 flex items-center justify-between font-medium">
                                <div className="rounded-full bg-purple-700 h-3 w-3 ml-4" />
                                <div className="flex-grow ml-4 text-sm">연차</div>
                                <div className="text-base text-purple-700 mr-4">{approvalCounts.annual}</div>
                            </div>

                            <div className="rounded-lg shadow-lg border h-64 w-56 ml-20 mt-2 flex bg-white flex-col justify-center items-center font-bold">
                                <div className="text-center">당신의 상태를 알려주세요</div>
                                <button className="flex flex-row text-center align-middle items-center border-2 mt-3 rounded-lg shadow-lg">
                                    <form action="" className="w-full m-1 text-sm">
                                        <select name="situation" onChange={handleSelectChange}>
                                            <option value="현재자리중">현재자리중</option>
                                            <option value="출장중">출장중</option>
                                            <option value="휴가중">휴가중</option>
                                            <option value="자리비움">자리비움</option>
                                        </select>
                                    </form>
                                </button>

                                <input
                                    type="textarea"
                                    className="border-2 mt-2 w-44 text-center text-sm"
                                    placeholder="출장중일때만 활성화"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    disabled={selectedOption !== '출장중'}
                                />

                                <div className="flex justify-end w-full">
                                    <button
                                        className="bg-mainColor text-white rounded-lg shadow-lg h-8 w-12 mr-6 mt-3"
                                        onClick={() => saveMessage(inputValue)}
                                        disabled={inputValue.trim() === '' || selectedOption !== '출장중'}
                                    >
                                        저장
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="rightSide relative w-[100%] -top-12 ml-20">
                            <div className="flex flex-col w-[90%] h-[100%] bg-white rounded-lg shadow-lg">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
