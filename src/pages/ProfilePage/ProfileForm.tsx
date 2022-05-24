import { Formik } from "formik";
import React from "react";
import InputItem from "../../components/InputItem/InputItem";
import { User } from "../../types/models";
import { updateCurrentUser } from "../../store/reducers/auth-reducer";
import { useAppDispatch } from "../../hooks/useAppDispatch";

type props_T = {
  currentUser: User;
  handleEditMode: (status: boolean) => void;
};

const ProfileForm = ({ currentUser, handleEditMode }: props_T) => {
  const dispatch = useAppDispatch();

  const initialForm = {
    name: currentUser.name || "",
    extra_details: currentUser.extra_details || "",
    skills: currentUser.skills || "",
    profession: currentUser.profession || "",
    details: currentUser.details || "",
  };
  return (
    <div>
      <Formik
        initialValues={initialForm}
        onSubmit={(values) => {
          dispatch(updateCurrentUser(currentUser._id as string, values));
          handleEditMode(false);
        }}
      >
        {({ values, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            Name
            <InputItem
              touched={touched.name}
              name="name"
              type="text"
              value={values.name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="Name"
            />
            Tech stack
            <InputItem
              touched={touched.extra_details}
              name="extra_details"
              type="text"
              value={values.extra_details}
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="Tech stack"
            />
            Skills
            <InputItem
              touched={touched.skills}
              name="skills"
              type="text"
              value={values.skills}
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="Skills"
            />
            Profession
            <InputItem
              touched={touched.profession}
              name="profession"
              type="text"
              value={values.profession}
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="Profession"
            />
            About
            <InputItem
              touched={touched.details}
              name="details"
              type="text"
              value={values.details}
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder="About"
            />
            <div>
              <button type="submit">Save</button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileForm;
