import * as Yup from "yup";

export const initialValues={
  id:-1,
  firstName: '',
  lastName: '',
  phone: '',
  phoneLabel: '',
  email: '',
  emailLabel: ''
};

export const validationSchema=Yup.object({
  firstName: Yup
    .string()
    .required("Required")
    .max(25, "Must be 25 characters or less.")
    .min(3,"Must be at least 3 characters long"),
  lastName: Yup
    .string()
    .required("Required")
    .max(25,"Must be 25 characters or less.")
    .min(3,"Must be at least 3 characters."),
  phone:  Yup
    .string()
    .required("Required")
    .min(10,"Must be 10 numbers"),
  phoneLabel: Yup
    .string()
    .required("Required")
    .min(2, "Must be greater than 2 characters"),
  email: Yup
    .string()
    .email("Must be a valid email")
    .required("Required"),
  emailLabel: Yup
    .string()
    .required("Required")
    .min(2, "Must be greater than 2 characters")
});

