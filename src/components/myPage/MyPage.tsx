import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const MyPage = () => {
  const location = useLocation();
  const activeLink = location.pathname.split('/').pop();
  

  return (
    <div className='sectionDevide flex flex-col'>
      <div className='nevBar h-20 w-[80%] flex flex-row font-medium items-center ml-16'>
        <ul className='flex flex-row text-xl gap-20 font-medium'>
          <li>
            <Link
              to='ProfileEdit'
              className={`${
                activeLink === 'ProfileEdit' ? 'border-mainColor text-black border-b-8 pb-5 font-bold' : 'text-gray-400'
              }`}
            >
              프로필 편집
            </Link>
          </li>
          <li>
            <Link
              to='Schedule'
              className={`${
                activeLink === 'Schedule' ? 'border-mainColor text-black border-b-8 pb-5 font-bold' : 'text-gray-400'
              }`}
            >
              일정
            </Link>
          </li>
          <li>
            <Link
              to='Vacation'
              className={`${
                activeLink === 'Vacation' ? 'border-mainColor text-black border-b-8 pb-5 font-bold' : 'text-gray-400'
              }`}
            >
              휴가 일정
            </Link>
          </li>
        </ul>
      </div>
      
      <div className='border-t-2'>
        <Outlet />
      </div>
    </div>
  );
};

export default MyPage;
