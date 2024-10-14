import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/login/InputField';
import Button from '../components/login/Button';
import PasswordResetModal from './PasswordReset';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    navigate('Layout/');
  };

  const openPasswordResetModal = () => {
    setIsModalOpen(true);
  };

  const closePasswordResetModal = () => {
    setIsModalOpen(false);
  };

  const handleEmailConfirm = () => {
    closePasswordResetModal();
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src="/assets/login.jpg"
          alt="Login Background"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="max-w-md w-full m-36">
          <h2 className="text-6xl font-bold mb-3.5 text-mainColor m-2.5">Login</h2>
          <p className="text-base py-2 mb-10 m-2.5">일정관리플랫폼 4알렸다</p>
          <InputField
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-xs flex justify-end space-x-2 mt-4">
            <Link to="/sign" className="hover:underline">
              회원가입
            </Link>
            <p> | </p>
            <button
              onClick={openPasswordResetModal}
              className="text-xs text-gray-500 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </button>
          </div>
          <Button text="LOGIN" onClick={handleLogin} />
        </div>
      </div>

      {/* 비밀번호 찾기 모달 */}
      {isModalOpen && (
        <PasswordResetModal
          onClose={closePasswordResetModal}
          onEmailConfirm={handleEmailConfirm}
        />
      )}

    </div>
  );
};

export default LoginPage;
