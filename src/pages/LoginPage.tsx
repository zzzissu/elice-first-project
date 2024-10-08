import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../components/login/InputField';
import Button from '../components/login/Button';

const LoginPage = () => {
  const [employeeNum, setEmployeeNum] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Employee:', employeeNum);
    console.log('Password:', password);
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
            placeholder="Employee number"
            value={employeeNum}
            onChange={(e) => setEmployeeNum(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-xs flex justify-end space-x-2 mt-4">
            <Link to="/" className="hover:underline">
              회원가입
            </Link>
            <p> | </p>
            <Link to="/" className="text-xs text-gray-500 hover:underline">
              비밀번호 찾기
            </Link>
          </div>
          <Button text="LOGIN" onClick={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
