import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/login/InputField';
import Button from '../components/login/Button';
import PasswordResetModal from './PasswordReset';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email) {
      setError('! 이메일을 입력해주세요.');
      return;
    }
    if (!password) {
      setError('! 비밀번호를 입력해주세요.');
      return;
    }
    setError('');
    
    fetch("http://localhost:4000/api/users/signin", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password}),
    }).then((res) => {
      if(!res.ok) {
        throw new Error("로그인 실패");
      }
      return res.json();
    }).then((data) => {
      const token = data.token;
      navigate('/project');
    }).catch((error) => {
      setError("! 아이디와 비밀번호를 다시 확인해주세요.");
      console.error("Error: ", error);
    });
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
    <div className="flex h-screen min-w-[1280px]">
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
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

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
