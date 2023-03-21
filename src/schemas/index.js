import * as yup from "yup";

export const userLoginSchema = yup.object({
  userName: yup
    .string()
    .min(6, "Too Short!")
    .max(12, "Too Long")
    .required("Username cannot be blank!"),
  passWord: yup
    .string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password must include 5-12 characters"),
});

export const businessLoginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email!")
    .required("Email cannot be blank!"),
  passWord: yup
    .string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password must include 5-12 characters"),
});

export const userSignUpSchema = yup.object({
  fullName: yup
    .string()
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "🌚🌚🌚🌚")
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
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password must include 5-12 characters"),
  occupation: yup
    .string()
    .matches(/^(\S+\s{0,1}\S+)?$/, "🌚🌚🌚🌚")
    .required("Field cannot be blank!"),
});

export const businessSignUpSchema = yup.object({
  businessName: yup
    .string()
    .matches(/^[a-zA-Z0-9\s.'-]{2,100}$/, "🌚🌚🌚🌚")
    .min(3, "Too Short!")
    .max(50, "Too Long")
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
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Password must include 5-12 characters"),
});
