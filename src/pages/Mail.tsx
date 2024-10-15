import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AuthPage = () => {
    const [activeLink, setActiveLink] = useState('MailRead');
    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <div className="sectionDevide flex flex-col">
            <div className="nevBar h-20 w-[80%] flex flex-row font-medium items-center ml-16">
                <ul className="flex flex-row text-xl gap-20 font-medium">
                    <li>
                        <Link
                            to="mail-read"
                            onClick={() => handleLinkClick('mail-read')}
                            className={`${
                                activeLink === 'mail-read'
                                    ? 'border-mainColor text-black border-b-8 pb-5 font-bold'
                                    : 'text-gray-400'
                            }`}
                        >
                            받은메일
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="sended-mail"
                            onClick={() => handleLinkClick('sended-mail')}
                            className={`${
                                activeLink === 'sended-mail'
                                    ? 'border-mainColor text-black border-b-8 pb-5 font-bold'
                                    : 'text-gray-400'
                            }`}
                        >
                            보낸메일
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="mail-write"
                            onClick={() => handleLinkClick('mail-write')}
                            className={`${
                                activeLink === 'mail-write'
                                    ? 'border-mainColor text-black border-b-8 pb-5 font-bold'
                                    : 'text-gray-400'
                            }`}
                        >
                            메일작성
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
