import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/login/InputField';
import Button from '../components/login/Button';

const SignUpPage = () => {
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        domain: '',
        customDomain: '',
        password: '',
        confirmPassword: '',
        birth: '',
        phone: '',
    });
    const [consent, setConsent] = useState(false);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };

    const handleSignUp = () => {
        const { username, email, domain, customDomain, password, confirmPassword, phone, birth } = userInfo;

        if (!username) {
            setError('! 이름을 입력해주세요.');
            return;
        }
        if (!email) {
            setError('! 이메일을 입력해주세요.');
            return;
        }
        if (!password) {
            setError('! 비밀번호를 입력해주세요.');
            return;
        }
        if (password !== confirmPassword) {
            setError('! 비밀번호가 일치하지 않습니다.');
            return;
        }
        if (!birth) {
            setError('! 생년월일을 입력해주세요.');
            return;
        }
        if (!consent) {
            setError('! 개인정보 활용 동의가 필요합니다.');
            return;
        }

        const fullEmail = domain === 'custom' ? `${email}@${customDomain}` : `${email}@${domain}`;

        setError('');

        fetch("http://localhost:4000/api/users/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: username,
                email: fullEmail,
                password: password,
                phone: phone,
                birth: birth}),
          }).then((res) => {
            if(!res.ok) {
              throw new Error("회원가입 실패");
            }
            return res.json();
          }).then((data) => {
            alert("회원가입 성공!")
            const token = data.token;
            localStorage.setItem("token", token);
            navigate('/');
          }).catch((error) => {
            console.error("Error: ", error);
          });
    };

    return (
        <div className="flex justify-center items-center bg-sky-50">
            <div className="w-full max-w-3xl bg-white p-8 shadow-md my-12">
                <h2 className="text-4xl font-bold text-mainColor mb-6">회원가입</h2>
                <p className="text-base mb-10">회원이 되어 일정관리 플랫폼을 경험해보세요!</p>
                <hr className="mb-4 border-black" />
                <p className="text-base font-semibold mb-3">가입 정보 입력</p>
                <hr className="mb-4 border-black" />

                {/* 이름 */}
                <label className="block mb-2 mt-6">
                    이름 <span className="text-rose-600">*</span>
                </label>
                <InputField
                    type="text"
                    name="username"
                    placeholder="본인 이름을 입력해주세요"
                    value={userInfo.username}
                    onChange={handleInputChange}
                />

                {/* 이메일 */}
                <label className="block mt-4 mb-2">
                    이메일 <span className="text-rose-600">*</span>
                </label>
                <div className="flex items-center">
                    <InputField
                        type="email"
                        name="email"
                        placeholder="이메일을 입력해주세요"
                        value={userInfo.email}
                        onChange={handleInputChange}
                    />
                    <span className="mx-2">@</span>
                    {userInfo.domain === 'custom' ? (
                        // 도메인 직접입력
                        <input
                            type="text"
                            name="customDomain"
                            placeholder="도메인 입력"
                            value={userInfo.customDomain}
                            onChange={handleInputChange}
                            className="text-sm border p-3 rounded-[10px] m-2.5 w-full border-gray-300"
                        />
                    ) : (
                        // 도메인 선택
                        <input
                            type="text"
                            name="domain"
                            value={userInfo.domain}
                            readOnly
                            className="text-sm border p-3 rounded-[10px] m-2.5 w-full border-gray-300"
                        />
                    )}
                    <select
                        className="border border-gray-300 rounded-[10px] p-3"
                        onChange={(e) => {
                            const selectedDomain = e.target.value;
                            setUserInfo({
                                ...userInfo,
                                domain: selectedDomain === 'custom' ? 'custom' : selectedDomain,
                                customDomain: selectedDomain !== 'custom' ? '' : userInfo.customDomain,
                            });
                        }}
                    >
                        <option value="">도메인 선택</option>
                        <option value="naver.com">naver.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="daum.net">daum.net</option>
                        <option value="custom">직접 입력</option>
                    </select>
                </div>

                {/* 비밀번호 */}
                <label className="block mt-4 mb-2">
                    비밀번호 <span className="text-rose-600">*</span>
                </label>
                <InputField
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={userInfo.password}
                    onChange={handleInputChange}
                />

                {/* 비밀번호 확인 */}
                <label className="block mt-4 mb-2">
                    비밀번호 확인 <span className="text-rose-600">*</span>
                </label>
                <InputField
                    type="password"
                    name="confirmPassword"
                    placeholder="비밀번호 확인"
                    value={userInfo.confirmPassword}
                    onChange={handleInputChange}
                />

                {/* 생년월일 */}
                <label className="block mt-4 mb-2">
                    생년월일 <span className="text-rose-600">*</span>
                </label>
                <InputField
                    type="text"
                    name="birth"
                    placeholder="생년월일을 입력해주세요 예)19900101"
                    value={userInfo.birth}
                    onChange={handleInputChange}
                />

                {/* 연락처 */}
                <label className="block mt-4 mb-2">연락처</label>
                <InputField
                    type="text"
                    name="phone"
                    placeholder="연락처를 입력해주세요 예)01012345678"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                />

                {/* 개인정보 활용 동의 */}
                <div className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                    />
                    <label>개인정보 활용에 동의합니다</label>
                </div>

                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

                <Button text="가입완료" onClick={handleSignUp} />
            </div>
        </div>
    );
};

export default SignUpPage;