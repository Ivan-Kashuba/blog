import React, { useState } from "react";
import Registration from "./Registration";
import { registerUser } from "../../store/reducers/users-reducer";
import { useNavigate } from "react-router-dom";
import { userRegistration_T } from "../../types/reducers";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export const RegistrationContainer = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState();
  const navigation = useNavigate();

  const registration = async (registerObject: userRegistration_T) => {
    try {
      await dispatch(registerUser(registerObject));
      navigation("/reg-success");
    } catch (e: any) {
      setError(e.response.data.error);
    }
  };

  return <Registration registration={registration} error={error!} />;
};
