import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';

const AuthPage = () => {
    const [activeLink, setActiveLink] = useState('MailRead');
    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <div className='sectionDevide flex flex-col'>
            <div className='nevBar h-20 w-[80%] flex flex-row font-medium items-center ml-16'>
                <ul className='flex flex-row text-xl gap-20 font-medium'>
                    <li>
                        <Link
                            to="MailRead"
                            onClick={() => handleLinkClick('MailRead')}
                            className={`${activeLink === 'MailRead'
                                ? 'border-mainColor text-black border-b-8 pb-5 font-bold' : 'text-gray-400'
                                }`}
                        >
                            받은메일
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="Sendedmail"
                            onClick={() => handleLinkClick('Sendedmail')}
                            className={`${activeLink === 'Sendedmail'
                                ? 'border-mainColor text-black border-b-8 pb-5 font-bold' : 'text-gray-400'
                                }`}
                        >
                            보낸메일
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="MailWrite"
                            onClick={() => handleLinkClick('MailWrite')}
                            className={`${activeLink === 'MailWrite'
                                ? 'border-mainColor text-black border-b-8 pb-5 font-bold' : 'text-gray-400'
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
