import React, { useState } from "react";
import { connect } from "react-redux";
import Registration from "./Registration";
import { registerUser } from "../../store/reducers/users-reducer";
import { useNavigate } from "react-router-dom";
import { userRegistration_T } from "../../types/reducers";

type props_T = {
  registerUser: (registerUser: userRegistration_T) => void;
};

const RegistrationContainer = ({ registerUser }: props_T) => {
  const [error, setError] = useState();
  const navigation = useNavigate();

  const registration = async (registerObject: userRegistration_T) => {
    try {
      await registerUser(registerObject);
      navigation("/reg-success");
    } catch (e: any) {
      setError(e.response.data.error);
    }
  };

  return <Registration registration={registration} error={error!} />;
};

export default connect(null, { registerUser })(RegistrationContainer);
