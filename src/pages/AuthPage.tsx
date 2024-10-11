import React, { useState } from 'react';
import { Routes, Link, Route, Navigate } from 'react-router-dom';
import AnnualApplicationForm from '../components/applicationForm/BusinessReport';
import BusinessReport from '../components/applicationForm/BusinessReport';
import WorkingOutsideApplicationForm from '../components/applicationForm/WorkingOutsideApplicationForm';

const AuthPage = () => {
    const [activeLink, setActiveLink] = useState('AnnualApplicationForm');
    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <div className="flex flex-col w-auto h-auto">
            <header>
                <div className="h-24 w-auto bg-blue-700 flex justify-between items-center">
                    <div className="text-3xl text-white font-medium font-sans  pl-8">Project</div>
                    <div className="flex flex-row">
                        <div
                            style={{
                                backgroundImage: `url('/assets/Group 18.png')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                            className="z-10 h-12 w-12 mr-3"
                        />
                        <div className="text-xl text-white pt-3 font-sans mr-12">최준영</div>
                    </div>
                </div>
            </header>

            {/* 회사사진*/}
            <div
                style={{
                    backgroundImage: `url('/assets/office-3438241_1280.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="h-64 w-auto relative"
            />

            {/* 오른쪽 섹션 */}
            <div className="relative w-[90%] ml-20 -top-24">
                <div className="flex flex-col h-full w-full bg-white rounded-lg shadow-2xl">
                    {/* 오른쪽 섹션 Nav */}
                    <div className="h-24 w-[90%] flex flex-row font-medium items-center ml-28">
                        <ul className="flex flex-row text-xl gap-32 font-medium">
                            <li>
                                <Link
                                    to="AnnualApplicationForm"
                                    onClick={() => handleLinkClick('AnnualApplicationForm')}
                                    className={`${
                                        activeLink === 'AnnualApplicationForm'
                                            ? 'border-blue-700 text-black border-b-8 pb-6 text-2xl font-sans font-bold'
                                            : 'text-gray-400 font-sans'
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
                                            ? 'border-blue-700 text-black border-b-8 pb-6  text-2xl  font-sans font-bold'
                                            : 'text-gray-400 font-sans'
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
                                            ? 'border-blue-700 text-black border-b-8 pb-6 text-2xl  font-sans font-bold'
                                            : 'text-gray-400 font-sans'
                                    }`}
                                >
                                    업무보고서
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 오른쪽 섹션 Main */}
                    <div className="border-t-2">
                        <Routes>
                            <Route path="/" element={<Navigate to="AnnualApplicationForm" />}></Route>
                            <Route path="AnnualApplicationForm" element={<AnnualApplicationForm />} />
                            <Route path="WorkingOutsideApplicationForm" element={<WorkingOutsideApplicationForm />} />
                            <Route path="BusinessReport" element={<BusinessReport />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
