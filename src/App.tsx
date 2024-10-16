// App.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Paths } from './components/constants/Paths'; // 경로 상수 import
import LoginPage from './pages/LoginPage';
import Layout from './pages/Layout';
import Project from './components/mainPage/Project';
import TeamPage from './components/teamPage/TeamPage';
import AuthPage from './pages/AuthPage';
import AnnualApplicationForm from './components/applicationForm/AnnualApplicationForm';
import BusinessReport from './components/applicationForm/BusinessReport';
import WorkingOutsideApplicationForm from './components/applicationForm/WorkingOutsideApplicationForm';
import Mail from './pages/Mail';
import MailWrite from './components/mail/MailWrite';
import MailRead from './components/mail/MailRead';
import MyPage from './components/myPage/MyPage';
import ProfileEdit from './components/myPage/ProfileEdit';
import Schedule from './components/myPage/Schedule';
import Vacation from './components/myPage/Vacation';
import SignUpPage from './pages/SignUpPage';
import SendedMail from './components/mail/SendedMail';
import NotFoundPage from './pages/NotFoundPage';
import TotalVacation from './components/myPage/TotalVacation';
import UsedVacation from './components/myPage/UsedVacation';

const App = () => (
    <Routes>
        {/* 로그인 및 회원가입 페이지 */}
        <Route path={Paths.home} element={<LoginPage />} />
        <Route path={Paths.signUp} element={<SignUpPage />} />

        {/* Layout이 적용된 페이지들 */}
        <Route element={<Layout />}>
            {/* 기본 경로: Project */}
            <Route path={Paths.project} element={<Project />} />
            {/* 다른 경로들 */}
            <Route path={Paths.myPage} element={<MyPage />}>
                {/* 중첩된 라우트 */}
                <Route index element={<ProfileEdit />} />
                <Route path={Paths.profileEdit} element={<ProfileEdit />} />
                <Route path={Paths.schedule} element={<Schedule />} />
                <Route path={Paths.vacation} element={<Vacation />}>
                <Route path={Paths.totalVacation} element={<TotalVacation />}/>
                <Route path={Paths.usedVacation} element={<UsedVacation />}/>
                </Route>
            </Route>

            <Route path={Paths.teamPage} element={<TeamPage />} />

            <Route path={Paths.authPage} element={<AuthPage />}>
                <Route index element={<AnnualApplicationForm />} />
                <Route path={Paths.annualApplication} element={<AnnualApplicationForm />} />
                <Route path={Paths.businessReport} element={<BusinessReport />} />
                <Route path={Paths.workingOutside} element={<WorkingOutsideApplicationForm />} />
            </Route>

            <Route path={Paths.mail} element={<Mail />}>
                <Route index element={<MailRead />} />
                <Route path={Paths.mailWrite} element={<MailWrite />} />
                <Route path={Paths.mailRead} element={<MailRead />} />
                <Route path={Paths.sendedMail} element={<SendedMail />} />
            </Route>
        </Route>

        {/* 404 에러페이지 */}
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
);

export default App;
