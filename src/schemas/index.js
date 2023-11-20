import * as yup from "yup";

export const userLoginSchema = yup.object({
  userName: yup
    .string()
    .matches(/^[a-zA-Z0-9_-]{3,16}$/, "Please choose another username")
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
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid Email")
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
    .matches(/^[a-zA-Z0-9_-]{3,16}$/, "Please choose another username")
    .min(6, "Too Short!")
    .max(12, "Too Long")
    .required("Username cannot be blank!"),
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid Email")
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
    .matches(/^[a-zA-Z0-9\s.'",()-]+$/, "🌚🌚🌚🌚")
    .min(3, "Too Short!")
    .max(50, "Too Long to be the name of a business")
    .required("Field cannot be blank!"),
  address: yup
    .string()
    .matches(/^[a-zA-Z0-9]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "🌚🌚🌚🌚")
    .min(8, "Too Short for an address!")
    .max(150, "Too Long")
    .required("Field cannot be blank!"),
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Enter a valid email")
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
