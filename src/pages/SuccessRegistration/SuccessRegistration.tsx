import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessRegistration = () => {
  const navigation = useNavigate();
  return (
    <div className="loginContent">
      <h1>Success Registration!</h1>
      <h2>Now u can login</h2>
      <button
        className="authBtn success authIn "
        onClick={() => navigation("/login")}
      >
        Login
      </button>
    </div>
  );
};

export default SuccessRegistration;
