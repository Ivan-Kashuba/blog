import React from "react";

const TextAreaItem = ({
  error,
  touched,
  label,
  name,
  value,
  handleChange,
  handleBlur,
  placeholder,
  cols,
  rows,
}) => {
  return (
    <div>
      <div className="textAreaItem">
        <div>{label}</div>
        <div className="error">{error && touched && error}</div>
        <textarea
          cols={cols}
          rows={rows}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          name={name}
          value={value}
        />
      </div>
    </div>
  );
};

export default TextAreaItem;
