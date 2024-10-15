import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const MyPage = () => {
    const [activeLink, setActiveLink] = useState('ProfileEdit');
    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <div className="sectionDevide flex flex-col">
            <div className="nevBar h-20 w-[80%] flex flex-row font-medium items-center ml-16">
                <ul className="flex flex-row text-xl gap-20 font-medium">
                    <li>
                        <Link
                            to="profile-edit"
                            onClick={() => handleLinkClick('profile-edit')}
                            className={`${
                                activeLink === 'profile-edit'
                                    ? 'border-mainColor text-black border-b-8 pb-5 font-bold'
                                    : 'text-gray-400'
                            }`}
                        >
                            프로필 편집
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="schedule"
                            onClick={() => handleLinkClick('schedule')}
                            className={`${
                                activeLink === 'schedule'
                                    ? 'border-mainColor text-black border-b-8 pb-5 font-bold'
                                    : 'text-gray-400'
                            }`}
                        >
                            일정
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="vacation"
                            onClick={() => handleLinkClick('vacation')}
                            className={`${
                                activeLink === 'vacation'
                                    ? 'border-mainColor text-black border-b-8 pb-5 font-bold'
                                    : 'text-gray-400'
                            }`}
                        >
                            휴가 일정
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="border-t-2">
                <Outlet />
            </div>
        </div>
    );
};

export default MyPage;
