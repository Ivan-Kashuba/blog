import { Formik } from "formik";
import React from "react";
import InputItem from "../../components/InputItem/InputItem";
import { loginValidator } from "../../validators/validators";
import { userRegistration_T } from "../../types/reducers";

type props_T = {
  registration: (registerData: userRegistration_T) => void;
  error: string;
};

const Registration = ({ registration, error }: props_T) => {
  return (
    <div className="authContainer">
      <div className="registerContainer">
        <h1>Registration</h1>
        {error ? <div className="error">{error}</div> : null}
        <Formik
          initialValues={{
            email: "",
            password: "",
            name: "",
            extra_details: "",
            skills: "",
            profession: "",
            details: "",
          }}
          validate={(values) => loginValidator(values)}
          onSubmit={(values) => {
            registration(values);
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
                <InputItem
                  error={errors.name}
                  touched={touched.name}
                  name="name"
                  type="text"
                  value={values.name}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="Name"
                />
              </div>

              <div className="loginItem">
                <InputItem
                  error={errors.extra_details}
                  touched={touched.extra_details}
                  name="extra_details"
                  type="text"
                  value={values.extra_details}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="Extra Details"
                />
              </div>

              <div className="loginItem">
                <InputItem
                  error={errors.skills}
                  touched={touched.skills}
                  name="skills"
                  type="text"
                  value={values.skills}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="Skills"
                />
              </div>

              <div className="loginItem">
                <InputItem
                  error={errors.profession}
                  touched={touched.profession}
                  name="profession"
                  type="text"
                  value={values.profession}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="Profession"
                />
              </div>

              <div className="loginItem">
                <InputItem
                  error={errors.details}
                  touched={touched.details}
                  name="details"
                  type="text"
                  value={values.details}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="Details"
                />
              </div>

              <div className="loginItem">
                <button type="submit" className="authBtn authUp">
                  Sign Up
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Registration;
