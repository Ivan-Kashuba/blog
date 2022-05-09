import React from "react";

const InputItem = ({
  error,
  touched,
  name,
  type,
  value,
  handleChange,
  handleBlur,
  placeholder,
}) => {
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
