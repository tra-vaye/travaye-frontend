import * as yup from "yup";

export const userLoginSchema = yup.object({
  userName: yup
    .string()
    .min(6, "Too Short!")
    .max(12, "Too Long")
    .required("Username cannot be blank!"),
  passWord: yup
    .string()
    .min(5, "Too Short")
    .max(12, "Too Long!")
    .required("Password must include 5-12 characters"),
});

export const businessLoginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email!")
    .required("Email cannot be blank!"),
  passWord: yup
    .string()
    .min(5, "Too Short")
    .max(12, "Too Long!")
    .required("Password must include 5-12 characters"),
});

export const userSignUpSchema = yup.object({
  fullName: yup
    .string()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .required("Field cannot be blank!"),
  userName: yup
    .string()
    .min(6, "Too Short!")
    .max(12, "Too Long")
    .required("Username cannot be blank!"),
  email: yup
    .string()
    .email("Invalid email!")
    .required("Email cannot be blank!"),
  passWord: yup
    .string()
    .min(5, "Too Short")
    .max(12, "Too Long!")
    .required("Password must include 5-12 characters"),
  occupation: yup
    .string()
    .min(3, "Too Short!")
    .max(20, "Too Long")
    .required("Field cannot be blank!"),
});

export const businessSignUpSchema = yup.object({
  businessName: yup
    .string()
    .min(3, "Too Short!")
    .max(20, "Too Long")
    .required("Field cannot be blank!"),
  address: yup
    .string()
    .min(3, "Too Short!")
    .max(50, "Too Long")
    .required("Field cannot be blank!"),
  email: yup
    .string()
    .email("Invalid email!")
    .required("Email cannot be blank!"),
  passWord: yup
    .string()
    .min(5, "Too Short")
    .max(12, "Too Long!")
    .required("Password must include 5-12 characters"),
});
