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
import MyPage from './components/MyPage/MyPage';
import ProfileEdit from './components/MyPage/ProfileEdit';
import Schedule from './components/MyPage/Schedule';
import Vacation from './components/MyPage/Vacation';
import SignUpPage from './pages/SignUpPage'; // 누락된 SignUpPage import 추가

const App = () => (
    <Routes>
        {/* 로그인 및 회원가입 페이지 */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign" element={<SignUpPage />} />

        {/* Layout 내부의 페이지들 */}
        <Route path="Layout/*" element={<Layout />}>
            {/* 기본 경로: Project */}
            <Route path="Project/*" element={<Project />} />
            <Route index element={<Project />} />

            {/* MyPage 경로 */}
            <Route path="MyPage/*" element={<MyPage />}>
                <Route index element={<ProfileEdit />} />
                <Route path="ProfileEdit" element={<ProfileEdit />} />
                <Route path="Schedule" element={<Schedule />} />
                <Route path="Vacation/*" element={<Vacation />} />
            </Route>

            {/* TeamPage 경로 */}
            <Route path="TeamPage" element={<TeamPage />} />

            {/* AuthPage 경로 */}
            <Route path="AuthPage/*" element={<AuthPage />}>
                <Route index element={<AnnualApplicationForm />} />
                <Route path="AnnualApplicationForm" element={<AnnualApplicationForm />} />
                <Route path="BusinessReport" element={<BusinessReport />} />
                <Route path="WorkingOutsideApplicationForm" element={<WorkingOutsideApplicationForm />} />
            </Route>

            {/* Mail 경로 */}
            <Route path="Mail/*" element={<Mail />}>
                <Route index element={<MailRead />} />
                <Route path="MailWrite" element={<MailWrite />} />
                <Route path="MailRead" element={<MailRead />} />
            </Route>
        </Route>
    </Routes>
);

export default App;
