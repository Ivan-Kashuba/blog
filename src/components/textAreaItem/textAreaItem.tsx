import React, { ChangeEvent } from "react";
import { FormikTouched } from "formik";
type props_T = {
  error?: string;
  touched?: boolean;
  label?: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.ChangeEvent<any>) => void;
  placeholder: string;
  cols: number;
  rows: number;
};

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
}: props_T) => {
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
