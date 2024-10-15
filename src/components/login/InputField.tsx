import React from 'react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ type, placeholder, value, onChange }: InputFieldProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="text-sm border p-3 rounded-[10px] m-2.5 w-full border-gray-300"
    />
  );
};

export default InputField;
