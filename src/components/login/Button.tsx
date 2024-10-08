import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="text-2xl font-bold w-full bg-mainColor text-white rounded-[10px] m-2.5 p-3 mt-14"
    >
      {text}
    </button>
  );
};

export default Button;
