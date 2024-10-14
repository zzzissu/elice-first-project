import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';

const AuthPage = () => {
    const [activeLink, setActiveLink] = useState('MailRead');
    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <div className='sectionDevide flex flex-col'>
            <div className='nevBar h-24 w-[80%] flex flex-row font-medium items-center ml-28'>
                <ul className='flex flex-row text-2xl gap-20 font-medium'>
                    <li>
                        <Link
                            to="MailRead"
                            onClick={() => handleLinkClick('MailRead')}
                            className={`${activeLink === 'MailRead'
                                ? 'border-blue-700 text-black border-b-8 pb-4 font-bold' : 'text-gray-400'
                                }`}
                        >
                            메일 읽기
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="MailWrite"
                            onClick={() => handleLinkClick('MailWrite')}
                            className={`${activeLink === 'MailWrite'
                                ? 'border-blue-700 text-black border-b-8 pb-4 font-bold' : 'text-gray-400'
                                }`}
                        >
                            메일 쓰기
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
