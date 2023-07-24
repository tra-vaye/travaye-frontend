/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import Loader from "../../components/UI/Loader";

import classes from "./Login.module.css";

import { businessLoginSchema, userLoginSchema } from "../../schemas";

import {
  useBusinessLoginMutation,
  useUserLoginMutation,
} from "../../redux/Api/authApi";
import { notification } from "antd";

const Login = () => {
  const dispatch = useDispatch();

  const [userSignUp, setUserSignUp] = useState(true);

  const navigate = useNavigate();

  const toggleSignUp = () => {
    setUserSignUp((prevState) => !prevState);
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const [
    userLogin,
    {
      isLoading: loginLoading,
      error: loginError,
      isSuccess: loginSuccess,
      data,
    },
  ] = useUserLoginMutation();

  const [
    businessLogin,
    {
      isLoading: businessLoading,
      error: businessError,
      isSuccess: businessSuccess,
      data: businessData,
    },
  ] = useBusinessLoginMutation();

  useEffect(() => {
    if (loginError || businessError) {
      notification.error({
        message: loginError?.data?.error || businessError?.data?.error,
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [businessError, loginError]);

  useEffect(() => {
    if (loginSuccess || businessSuccess) {
      notification.success({
        message: "Login Successfully",
        duration: 3,
        placement: "bottomRight",
      });

      sessionStorage.setItem("authToken", data?.token || businessData?.token);
      navigate("/user");
    }
  }, [dispatch, businessSuccess, loginSuccess]);

  const handleClick = async () => {
    if (userSignUp) {
      await userLogin({ username: values.userName, password: values.passWord });
    }
    if (!userSignUp) {
      await businessLogin({
        businessEmail: values.email,
        password: values.passWord,
      });
    }
  };

  const onSubmit = () => {
    console.log(values);
    handleClick();
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      passWord: "",
    },
    validationSchema: userSignUp ? userLoginSchema : businessLoginSchema,
    onSubmit,
  });

  return (
    <>
      {(loginLoading || businessLoading) && <Loader />}
      <section className={classes.login}>
        <div className="row">
          <div
            className={`col-md-6 d-flex justify-content-center align-items-center ${classes.text}`}
          >
            <div>
              <h3>
                Ready to go out without <br />
                <span className={classes.sapa}>Sapa? </span>
              </h3>
              <p>Login now and Plan a Trip</p>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <AuthFormWrapper onSubmit={handleSubmit}>
              <AuthRoutes>
                <RouteLink
                  onClick={!userSignUp ? toggleSignUp : undefined}
                  active={userSignUp}
                >
                  USER
                </RouteLink>
                <RouteLink
                  onClick={userSignUp ? toggleSignUp : undefined}
                  active={!userSignUp}
                >
                  BUSINESS
                </RouteLink>
              </AuthRoutes>
              <div className="d-flex flex-column">
                <input
                  id={userSignUp ? "userName" : "email"}
                  name={userSignUp ? "userName" : "email"}
                  className={`${
                    (userSignUp ? errors.userName : errors.email) &&
                    classes["input-error"]
                  } mt-5`}
                  type={`${userSignUp ? "text" : "email"}`}
                  placeholder={`${userSignUp ? "Username" : "Email Address"}`}
                  value={userSignUp ? values.userName : values.email}
                  onChange={handleChange}
                />
                {userSignUp && errors.userName && (
                  <ErrorText>{errors.userName}</ErrorText>
                )}
                {!userSignUp && errors.email && (
                  <ErrorText>{errors.email}</ErrorText>
                )}

                <input
                  className={`${
                    errors.passWord && classes["input-error"]
                  } mt-5`}
                  id="passWord"
                  name="passWord"
                  type="passWord"
                  placeholder="Password"
                  value={values.passWord}
                  onChange={handleChange}
                />
                {errors.passWord && <ErrorText> {errors.passWord}</ErrorText>}
                <p className={`mb-3 text-end mt-4 ${classes.p}`}>
                  Forgot Password?
                </p>
              </div>
              {/* <div className="d-flex justify-content-center">{Alternate}</div> */}
              {/* <SocialsContainer>
                {FaceBookAuth} {<GoogleAuth onClick={googleSignIn} />}{" "}
                {AppleAuth}
              </SocialsContainer> */}
              <div
                className={`d-flex justify-content-between mt-3 ${classes.text}`}
              >
                <p className="align-self-center" login="true">
                  New To Travaye?{" "}
                  <Link to="/signup">
                    <span>Sign Up</span>
                  </Link>
                </p>
                <Button
                  color="green"
                  type="submit"
                  disabled={errors.email || errors.passWord || errors.userName}
                >
                  Login
                </Button>
              </div>
            </AuthFormWrapper>
          </div>
        </div>
      </section>{" "}
    </>
  );
};
export default Login;

export const AuthFormWrapper = (props) => {
  return (
    <form className={classes.form} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};

export const RouteLink = styled.li`
  color: ${(props) => (props.active ? "#009f57" : "#9d9d9d")};
  border-bottom: 3px solid ${(props) => (props.active ? "#009f57" : "#9d9d9d")};
  width: 100%;
  height: 43px;
  cursor: pointer;
  text-align: center;
`;

export const AuthRoutes = styled.ul`
  padding-inline-start: 0;
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

// const SocialsContainer = styled.div`
//   display: flex;
//   justify-content: space-evenly;
//   margin-top: 2rem;
//   svg {
//     transform: scale(0.7);
//   }
// `;

export const ErrorText = styled.p`
  color: #f67f7f;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 0;
`;
