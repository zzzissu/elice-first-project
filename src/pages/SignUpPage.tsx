import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/login/InputField';
import Button from '../components/login/Button';
import ErrorMessage, { validateSignUp } from '../components/sign/ErrorMessage';
 
const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [domain, setDomain] = useState('');
    const [customDomain, setCustomDomain] = useState(''); // 도메인 직접입력
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birth, setBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [consent, setConsent] = useState(false); // 개인정보 동의 여부 상태
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    
    const navigate = useNavigate();

    const handleSignUp = () => {

        const emailWithDomain = customDomain ? `${email}@${customDomain}` : `${email}@${domain}`;
        const newErrorMessages = validateSignUp(username, email, password, confirmPassword, consent); // 유효성 검사

        setErrorMessages(newErrorMessages); // 에러 메시지 업데이트

        if (newErrorMessages.length === 0) {
            console.log('SignUp Info:', { emailWithDomain, username, birth, phone });   // 비밀번호는 받지않기
            navigate('/'); // 회원가입 완료 후 로그인 페이지로 이동
        }
    };


    return (
        <div className="flex justify-center items-center bg-sky-50">
            <div className="w-full max-w-3xl bg-white p-8 shadow-md my-12">
                <h2 className="text-4xl font-bold text-mainColor mb-6">회원가입</h2>
                <p className="text-base mb-16">회원이 되어 일정관리 플랫폼을 경험해보세요!</p>
                <hr className="mb-4 border-black" />
                <p className="text-base font-semibold mb-3">가입 정보 입력</p>
                <hr className="mb-4 border-black" />

                {/* 이름 */}
                <label className="block mb-2 mt-6">
                    이름 <span className="text-rose-600">*</span>
                </label>
                <InputField
                    type="text"
                    placeholder="본인 이름을 입력해주세요"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                {/* 이메일 */}
                <label className="block mt-4 mb-2">
                    이메일 <span className="text-rose-600">*</span>
                </label>
                <div className="flex items-center">
                    <InputField
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="mx-2">@</span>
                    {domain === 'custom' ? (
                        // 직접입력
                        <input
                            type="text"
                            placeholder="도메인 입력"
                            value={customDomain}
                            onChange={(e) => setCustomDomain(e.target.value)}
                            className="text-sm border p-3 rounded-[10px] m-2.5 w-full border-gray-300"
                        />
                    ) : (
                        // 도메인 선택
                        <input
                            type="text"
                            value={domain}
                            readOnly
                            className="text-sm border p-3 rounded-[10px] m-2.5 w-full border-gray-300"
                        />
                    )}
                    <select
                        className="border border-gray-300 rounded-[10px] p-3"
                        onChange={(e) => {
                            const selectedDomain = e.target.value;
                            setDomain(selectedDomain === 'custom' ? 'custom' : selectedDomain);
                            if (selectedDomain !== 'custom') {
                                setCustomDomain('');
                            }
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
                    placeholder="비밀번호를 입력해주세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* 비밀번호 확인 */}
                <label className="block mt-4 mb-2">
                    비밀번호 확인 <span className="text-rose-600">*</span>
                </label>
                <InputField
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {/* 생년월일 */}
                <label className="block mt-4 mb-2">생년월일</label>
                <InputField
                    type="text"
                    placeholder="생년월일을 입력해주세요 예)19900101"
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                />

                {/* 연락처 */}
                <label className="block mt-4 mb-2">연락처</label>
                <InputField
                    type="text"
                    placeholder="연락처를 입력해주세요 예)01012345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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

                <ErrorMessage messages={errorMessages} />

                <Button text="가입완료" onClick={handleSignUp} />
            </div>
        </div>
    );
};

export default SignUpPage;
