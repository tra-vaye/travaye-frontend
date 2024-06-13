import { notification, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import Loader from "../../components/UI/Loader";
import { useResetPasswordMutation } from "../../redux/Api/authApi";
import { AuthFormWrapper } from "../Login";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";

import classes from "./Login.module.css";
const updatePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Required")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirm is required"),
});
const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  let token = searchParams.get("token");
  let email = searchParams.get("email");
  const [resetPassword, { isLoading, error, isError, isSuccess, data }] =
    useResetPasswordMutation();
  const [seePass, setSeePass] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: () => {
      resetPassword({ ...values, token, email })
        .unwrap()
        .then(() => {
          notification.success({
            message: "password reset successfully",
            duration: 3,
            placement: "bottomRight",
          });
          navigate(`/login`);
        })
        .catch((error) => {
          notification.error({
            message: error?.data?.error,
            duration: 3,
            placement: "bottomRight",
          });
        });
    },
  });
  return (
    <Container className="d-flex justify-content-center col-md-6 offset-md-3 mt-3 text-center">
      {isLoading && <Loader />}
      <AuthFormWrapper onSubmit={handleSubmit}>
        <h3>Reset Password</h3>
        <p>Create a new password</p>
        <div className="flex flex-col items-center w-full">
          <span className="relative block mt-3 w-fit">
            <input
              id={"password"}
              name={"password"}
              className={`${
                errors.password && classes["input-error"]
              } !w-[15rem]`}
              type={seePass ? "text" : "password"}
              placeholder={"Enter Password"}
              value={values.password}
              onChange={handleChange}
            />
            {seePass ? (
              <FaEyeSlash
                className="absolute right-[2%] top-[10%] translate-y-[50%] cursor-pointer"
                onClick={() => setSeePass((prev) => !prev)}
              />
            ) : (
              <IoEyeSharp
                className="absolute right-[2%] top-[10%] translate-y-[50%] cursor-pointer"
                onClick={() => setSeePass((prev) => !prev)}
              />
            )}
          </span>
          <span className="relative block mt-3 w-fit">
            <input
              className={`${
                errors.confirmPassword && classes["input-error"]
              } !w-[15rem]`}
              id="confirmPassword"
              name="confirmPassword"
              type={seePass ? "text" : "password"}
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
            />
            {seePass ? (
              <FaEyeSlash
                className="absolute right-[2%] top-[10%] translate-y-[50%] cursor-pointer"
                onClick={() => setSeePass((prev) => !prev)}
              />
            ) : (
              <IoEyeSharp
                className="absolute right-[2%] top-[10%] translate-y-[50%] cursor-pointer"
                onClick={() => setSeePass((prev) => !prev)}
              />
            )}
          </span>
        </div>
        <Button color="green" type="submit">
          Reset Password
        </Button>
      </AuthFormWrapper>
    </Container>
  );
};

export default ResetPassword;

const Timer = styled.p`
  text-align: end;

  span {
    color: #e9a009;
  }
`;

const Container = styled.div`
  input {
    width: 18%;
    height: 55px;
    @media (min-width: 700px) {
      height: 60px;
      width: 16%;
    }
  }
  button {
    margin: auto;
    margin-top: 10em;
    width: 167px;
  }
  p {
    color: #9d9d9d;
  }
  h3 {
    color: #009f57;
    margin-bottom: 20px;
    font-weight: 600;
  }
`;
