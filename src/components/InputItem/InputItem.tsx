import React, { ChangeEventHandler } from "react";
type props_T = {
  error?: string;
  touched?: boolean;
  name?: string;
  type?: string;
  value?: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  handleBlur?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
};

const InputItem = ({
  error,
  touched,
  name,
  type,
  value,
  handleChange,
  handleBlur,
  placeholder,
}: props_T) => {
  return (
    <div>
      <div className="error">{error && touched && error}</div>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
    </div>
  );
};

export default InputItem;
