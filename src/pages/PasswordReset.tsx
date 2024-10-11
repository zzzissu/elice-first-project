import React, { useState } from 'react';
import Modal from '../components/password/Modal'; 

interface PasswordResetModalProps {
  onClose: () => void;
  onEmailConfirm: () => void;
}

const PasswordResetModal = ({ onClose, onEmailConfirm }: PasswordResetModalProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  // 추후 비밀번호 받아오는 코드 작성

  const handleEmailConfirm = () => {
    if (email === '') {
      setError('이메일을 입력해주세요.');
    } else if (!/\S+@\S+\.\S+/.test(email)) { // 이메일 형식 검사
      setError('유효한 이메일 주소를 입력해주세요.');
    } else {
      setError('');
      setShowPasswordModal(true);
    }
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    onEmailConfirm();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEmailConfirm();
    }
  };

  return (
    <>
      <Modal onClose={onClose} title="비밀번호 변경">
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          className="w-full border border-gray-300 p-2 mb-2 rounded-[10px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {/* 에러 메시지 표시 */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex justify-center">
          <button
            className="bg-mainColor text-white py-2 px-4 rounded-[10px]"
            onClick={handleEmailConfirm}
          >
            이메일 확인
          </button>
        </div>
      </Modal>

      {/* 비밀번호 모달 */}
      {showPasswordModal && (
        <Modal onClose={handlePasswordModalClose} title="비밀번호 확인">
          <p className="pb-6 flex justify-center font-semibold">회원님의 비밀번호는: 0000입니다.</p>
          <div className="flex justify-center">
            <button
              className="bg-mainColor text-white py-2 px-4 rounded-[10px] w-1/2"
              onClick={handlePasswordModalClose}
            >
              확인
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PasswordResetModal;
