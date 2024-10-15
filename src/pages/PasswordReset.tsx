import React, { useState, useRef, useEffect } from 'react';
import Modal from '../components/modal/Modal';
import NewPasswordModal from './NewPassword';

interface PasswordResetModalProps {
  onClose: () => void;
  onEmailConfirm: () => void;
}

const PasswordResetModal = ({ onClose, onEmailConfirm }: PasswordResetModalProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [timer, setTimer] = useState(180);

  const verificationInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 타이머를 저장할 ref

  useEffect(() => {
    if (showVerificationModal) {
      timerRef.current = setInterval(() => {    // 모달이 열렸을 때 타이머 시작
        setTimer((prevTime) => {
          if (prevTime > 0) return prevTime - 1;
          if (prevTime === 0) {
            handleTimeOut();
          }
          return 0;
        });
      }, 1000);
    }

    // 모달이 닫히면 타이머 중지
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [showVerificationModal]);

  const handleTimeOut = () => {
    alert('시간이 초과되었습니다. 인증에 실패했습니다.');
    setShowVerificationModal(false);
    setShowPasswordModal(false);
    onClose();
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleEmailConfirm = () => {
    if (email === '') {
      setError('! 이메일을 입력해주세요.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('! 유효한 이메일 주소를 입력해주세요.');
    } else {
      setError('');
      alert('입력하신 메일로 인증번호가 발송되었습니다!');
      setShowVerificationModal(true);
      setTimer(180); // 타이머 3분으로 초기화
      setTimeout(() => {
        verificationInputRef.current?.focus(); // 인증번호 모달이 열리면 focus 이동
      }, 100);
    }
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEmailConfirm();
    }
  };

  const handleVerificationCodeConfirm = () => {
    if (codeInput === '') {
      setError('! 인증번호를 입력해주세요.');
    } else {
      alert('인증이 완료되었습니다!');
      setShowVerificationModal(false);
      setShowPasswordModal(false); // 이메일 확인 모달도 닫기
      setShowNewPasswordModal(true);
      if (timerRef.current) clearInterval(timerRef.current); // 인증 성공 시 타이머 중지
    }
  };

  const handleVerificationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleVerificationCodeConfirm();
    }
  };

  const handleNewPasswordModalClose = () => {
    setShowNewPasswordModal(false);
    onEmailConfirm();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    // 남은 초수가 한 자리수일 경우 0으로 처리
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <>
      {showPasswordModal && (
        <Modal onClose={onClose} title="비밀번호 찾기">
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            className="w-full border border-gray-300 p-2 mb-2 rounded-[10px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleEmailKeyDown}
          />
          {/* 에러 메시지 표시 */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-center">
            <button
              className="bg-mainColor text-white py-2 px-4 rounded-[10px]"
              onClick={handleEmailConfirm}
            >
              이메일 인증
            </button>
          </div>
        </Modal>
      )}

      {/* 인증번호 입력 모달 */}
      {showVerificationModal && (
        <Modal onClose={() => {
          setShowVerificationModal(false);
          setShowPasswordModal(false); // 이메일 확인 모달도 닫기
          onClose(); // 전체 모달 닫기
        }} title="인증번호 입력">
          <input
            type="text"
            ref={verificationInputRef} // ref 설정
            placeholder="인증번호 6자리를 입력해주세요"
            className="w-full border border-gray-300 p-2 mb-2 rounded-[10px]"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            onKeyDown={handleVerificationKeyDown}
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {/* 타이머 표시 */}
          <div className="text-center text-gray-500 mb-4">
            {`남은 시간: ${formatTime(timer)}`}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-mainColor text-white py-2 px-4 rounded-[10px]"
              onClick={handleVerificationCodeConfirm}
            >
              인증번호 확인
            </button>
          </div>
        </Modal>
      )}

      {/* 새 비밀번호 설정 모달 */}
      {showNewPasswordModal && <NewPasswordModal onClose={handleNewPasswordModalClose} />}
    </>
  );
};

export default PasswordResetModal;
