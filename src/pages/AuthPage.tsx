import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AuthPage = () => {
    const [activeLink, setActiveLink] = useState('AnnualApplicationForm');
    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <div className="sectionDevide flex flex-col">
            <div className="nevBar h-20 w-[80%] flex flex-row font-medium items-center ml-16">
                <ul className="flex flex-row text-xl gap-20 font-medium">
                    <li>
                        <Link
                            to="annual-application"
                            onClick={() => handleLinkClick('annual-application')}
                            className={`${
                                activeLink === 'annual-application'
                                    ? 'border-mainColor text-black border-b-8 pb-5 font-bold'
                                    : 'text-gray-400'
                            }`}
                        >
                            연차신청서
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="working-outside"
                            onClick={() => handleLinkClick('working-outside')}
                            className={`${
                                activeLink === 'working-outside'
                                    ? 'border-mainColor text-black border-b-8 pb-5 font-bold'
                                    : 'text-gray-400'
                            }`}
                        >
                            외근신청서
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="business-report"
                            onClick={() => handleLinkClick('business-report')}
                            className={`${
                                activeLink === 'business-report'
                                    ? 'border-mainColor text-black border-b-8 pb-5 font-bold'
                                    : 'text-gray-400'
                            }`}
                        >
                            업무보고서
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

export default AuthPage;
