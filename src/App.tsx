import React from 'react';
import { Route, Routes } from 'react-router-dom';
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

const App = () => (
    <Routes>
        {/* 로그인 및 회원가입 페이지 */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign" element={<SignUpPage />} />

        {/* Layout 내부의 페이지들 */}
        <Route path="layout/*" element={<Layout />}>
            {/* 기본 경로: Project */}
            <Route path="project/*" element={<Project />} />
            <Route index element={<Project />} />

            {/* MyPage 경로 */}
            <Route path="my-page/*" element={<MyPage />}>
                <Route index element={<ProfileEdit />} />
                <Route path="profile-edit" element={<ProfileEdit />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="vacation/*" element={<Vacation />} />
            </Route>

            {/* TeamPage 경로 */}
            <Route path="team-page" element={<TeamPage />} />

            {/* AuthPage 경로 */}
            <Route path="auth-page/*" element={<AuthPage />}>
                <Route index element={<AnnualApplicationForm />} />
                <Route path="annual-application" element={<AnnualApplicationForm />} />
                <Route path="business-report" element={<BusinessReport />} />
                <Route path="working-outside" element={<WorkingOutsideApplicationForm />} />
            </Route>

            {/* Mail 경로 */}
            <Route path="mail/*" element={<Mail />}>
                <Route index element={<MailRead />} />
                <Route path="mail-write" element={<MailWrite />} />
                <Route path="mail-read" element={<MailRead />} />
                <Route path="sended-mail" element={<SendedMail />} />
            </Route>
        </Route>
    </Routes>
);

export default App;
