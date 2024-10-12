import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Layout from './pages/Layout';
import MyPage from './components/myPage/MyPage';
import ProfileEdit from './components/myPage/ProfileEdit';
import Schedule from './components/myPage/Schedule';
import Vacation from './components/myPage/Vacation';
import Project from './components/mainPage/Project';
import TeamPage from './components/teamPage/TeamPage';
import AuthPage from './pages/AuthPage';
import AnnualApplicationForm from './components/applicationForm/AnnualApplicationForm';
import BusinessReport from './components/applicationForm/BusinessReport';
import WorkingOutsideApplicationForm from './components/applicationForm/WorkingOutsideApplicationForm';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/*" element={<Layout />}>
        <Route path="Project" element={<Project />} />


        <Route path="MyPage/*" element={<MyPage />}>
          <Route index element={<ProfileEdit />} />
          <Route path="ProfileEdit" element={<ProfileEdit />} />
          <Route path="Schedule" element={<Schedule />} />
          <Route path="Vacation/*" element={<Vacation />} />
        </Route>

        <Route path="TeamPage" element={<TeamPage />} />

        <Route path="AuthPage/*" element={<AuthPage />}>
          <Route index element={<AnnualApplicationForm />} />
          <Route path="AnnualApplicationForm" element={<AnnualApplicationForm />} />
          <Route path="BusinessReport" element={<BusinessReport />} />
          <Route path="WorkingOutsideApplicationForm" element={<WorkingOutsideApplicationForm />} />
        </Route>

      </Route>

    </Routes>
  );
};

export default App;
