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
