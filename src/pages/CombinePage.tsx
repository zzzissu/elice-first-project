import React from 'react';
import Nav from '../components/nav/Nav';
import { Route, Routes } from 'react-router-dom';
import MyPage from '../components/myPage/MyPage';
import MainPage from '../components/mainPage/mainPage'
import TeamPage from '../components/teamPage/TeamPage';
import AuthPage from './AuthPage';


const CombinePage = () => {
    return (
        <div className="flex">
          {/* 왼쪽 Nav */}
          <Nav />
          
          {/* 오른쪽 메인 콘텐츠 영역 */}
          <div className='w-[100%]'>
            <Routes>
              <Route path="MyPage/*" element={<MyPage />} />
              <Route path="MainPage/*" element={<MainPage />} />
              <Route path='TeamPage' element={<TeamPage />} />
              <Route path='AuthPage/*' element={<AuthPage />} />
  
            </Routes>
          </div>
        </div>
      );
    };

export default CombinePage
