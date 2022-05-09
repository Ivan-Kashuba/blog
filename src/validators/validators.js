export const loginValidator = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (values.password.length > 10) {
    errors.password = "Max password length is 10 symbols";
  }
  if (!values.password) {
    errors.password = "Your password is empty";
  }
  return errors;
};

export const postCreatorValidator = (values) => {
  const errors = {};
  if (!values.fullText) {
    errors.fullText = "Full Text is not allowed to be empty";
  }
  if (values.fullText.length < 20) {
    errors.fullText = "Full Text length must be at least 20 characters long";
  }
  if (!values.title) {
    errors.title = "Title is not allowed to be empty";
  }
  if (values.title.length < 5) {
    errors.title = "Title length must be at least 5 characters long";
  }
  if (!values.description) {
    errors.description = "Description is not allowed to be empty";
  }
  return errors;
};

export const commentCreatorValidator = (values) => {
  const errors = {};
  if (values.text.length < 3) {
    errors.text = "Length should be at least 3 symbols";
  }
  if (values.text.length > 80) {
    errors.text = "Length should be max 80 symbols";
  }
  return errors;
};
