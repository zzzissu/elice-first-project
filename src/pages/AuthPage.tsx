import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AuthPage = () => {
    const [activeLink, setActiveLink] = useState('AnnualApplicationForm');
    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <div className="sectionDevide flex flex-col">
            <div className="nevBar h-24 w-[80%] flex flex-row font-medium items-center ml-28">
                <ul className="flex flex-row text-2xl gap-20 font-medium">
                    <li>
                        <Link
                            to="AnnualApplicationForm"
                            onClick={() => handleLinkClick('AnnualApplicationForm')}
                            className={`${
                                activeLink === 'AnnualApplicationForm'
                                    ? 'border-blue-700 text-black border-b-8 pb-4 font-bold'
                                    : 'text-gray-400'
                            }`}
                        >
                            연차신청서
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="WorkingOutsideApplicationForm"
                            onClick={() => handleLinkClick('WorkingOutsideApplicationForm')}
                            className={`${
                                activeLink === 'WorkingOutsideApplicationForm'
                                    ? 'border-blue-700 text-black border-b-8 pb-4 font-bold'
                                    : 'text-gray-400'
                            }`}
                        >
                            외근신청서
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="BusinessReport"
                            onClick={() => handleLinkClick('BusinessReport')}
                            className={`${
                                activeLink === 'BusinessReport'
                                    ? 'border-blue-700 text-black border-b-8 pb-4 font-bold'
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
