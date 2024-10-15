import React from 'react';

interface ModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;    // 모달 내부에 렌더링할 내용
}

const Modal = ({ onClose, title, children }: ModalProps) => {
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(); // 모달 외부를 클릭하면 닫기
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOutsideClick} // 모달 외부 클릭 시 닫기
    >
      <div
        className="bg-white p-6 rounded-[10px] w-96 shadow-lg relative"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 부모요소를 따라 닫힘 방지
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-200"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-10 text-center">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
