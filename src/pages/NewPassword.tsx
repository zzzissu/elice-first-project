import React, { useState } from "react";
import Modal from "../components/modal/Modal";

interface NewPasswordModalProps {
  onClose: () => void;
  email: string;
}

const NewPasswordModal = ({ onClose, email }: NewPasswordModalProps) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handlePasswordChange = () => {
    if (newPassword === "" || confirmPassword === "") {
      setError("! 비밀번호를 입력해주세요.");
    } else if (newPassword !== confirmPassword) {
      setError("! 비밀번호가 일치하지 않습니다.");
    } else {
      setError("");

      fetch("http://localhost:4000/api/users/password/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: newPassword,
          email: email,
        }),
      }).then((res) => {
        if (!res.ok) {
          console.log("newPassword:", newPassword);
          throw new Error("비밀번호 변경 실패");
        } return res.json();
      }).then((data) => {
        setIsSuccessModalOpen(true);
        console.log("비밀번호 변경 성공:", data);
      }).catch((error) => {
        setError("! 비밀번호 변경에 실패했습니다.");
        console.error("Error:", error);
      });      
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    onClose();
  };

  return (
    <>
      <Modal onClose={onClose} title="새 비밀번호">
        <input
          type="password"
          placeholder="새 비밀번호를 입력해주세요"
          className="w-full border border-gray-300 p-2 mb-2 rounded-[10px]"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          className="w-full border border-gray-300 p-2 mb-2 rounded-[10px]"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/* 에러 메시지 표시 */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex justify-center">
          <button
            className="bg-mainColor text-white py-2 px-4 rounded-[10px] w-1/2"
            onClick={handlePasswordChange}
          >
            변경
          </button>
        </div>
      </Modal>

      {/* 성공 모달 */}
      {isSuccessModalOpen && (
        <Modal onClose={closeSuccessModal} title="비밀번호 변경 성공">
          <p className="text-center border-gray-300">성공적으로 변경되었습니다!</p>
          <div className="flex justify-center mt-8">
            <button
              className="bg-mainColor text-white py-2 px-4 rounded-[10px] w-1/2"
              onClick={closeSuccessModal}
            >
              확인
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default NewPasswordModal;