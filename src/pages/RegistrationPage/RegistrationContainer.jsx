import React, { useState } from "react";
import { connect } from "react-redux";
import Registration from "./Registration";
import { registerUser } from "../../store/reducers/users-reducer";
import { useNavigate } from "react-router-dom";

const RegistrationContainer = ({ registerUser }) => {
  const [error, setError] = useState();
  const navigation = useNavigate();

  const registration = async (registerObject) => {
    try {
      await registerUser(registerObject);
      navigation("/reg-success");
    } catch (e) {
      setError(e.response.data.error);
    }
  };

  return <Registration registration={registration} error={error} />;
};

export default connect(null, { registerUser })(RegistrationContainer);
