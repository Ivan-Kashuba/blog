import { Formik } from "formik";
import React from "react";
import { NavLink } from "react-router-dom";
import InputItem from "../../components/InputItem/InputItem";
import { loginValidator } from "../../validators/validators";

type props_T = {
  login: (values: { email: string; password: string }) => void;
  error: string;
};

const Login = ({ login, error }: props_T) => {
  return (
    <div className="authContainer">
      <div className="loginContainer">
        <h1>Login</h1>
        <NavLink className="loginLink" to="/registration">
          Registration
        </NavLink>
        {error ? <div className="error">{error}</div> : null}
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => loginValidator(values)}
          onSubmit={(values) => {
            login(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} className="loginContent">
              <div className="loginItem">
                <InputItem
                  error={errors.email}
                  touched={touched.email}
                  name="email"
                  type="email"
                  value={values.email}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="Email"
                />
              </div>
              <div className="loginItem">
                <InputItem
                  error={errors.password}
                  touched={touched.password}
                  name="password"
                  type="password"
                  value={values.password}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="Password"
                />
              </div>
              <div className="loginItem">
                <button type="submit" className="authBtn authIn">
                  Sign In
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
