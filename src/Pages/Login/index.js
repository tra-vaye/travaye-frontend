/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import Loader from "../../components/UI/Loader";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";

import classes from "./Login.module.css";

// import { businessLoginSchema, userLoginSchema } from "../../schemas";

import { notification } from "antd";
import {
  useBusinessLoginMutation,
  useUserLoginMutation,
} from "../../redux/Api/authApi";
import { setUserType } from "../../redux/Slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.auth.userType);
  const [seePass, setSeePass] = useState(false);
  const [userSignUp, setUserSignUp] = useState(true);
  useEffect(() => {
    dispatch(setUserType({ userType: "user" }));
  }, []);
  const navigate = useNavigate();

  const toggleSignUp = (type) => {
    setUserSignUp((prevState) => !prevState);

    dispatch(setUserType({ userType: type }));
  };

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
    if (loginSuccess) {
      const user = data?.user;

      if (user?.emailVerified) {
        notification.success({
          message: "Login Successfully",
          duration: 3,
          placement: "bottomRight",
        });

        const authToken = data?.token;
        sessionStorage.setItem("userType", userType);
        sessionStorage.setItem("authToken", authToken);
        sessionStorage.setItem("user_id", data?.user?._id);

        navigate(`/${userType}`);
      } else {
        const authToken = data?.token;
        sessionStorage.setItem("authToken", authToken);
        sessionStorage.setItem("userType", userType);
        sessionStorage.setItem("user_id", data?.user?._id);

        // Navigate to the verification page
        navigate("/verify-email");
      }
    } else if (businessSuccess) {
      const business = businessData?.user;

      if (business?.emailVerified) {
        notification.success({
          message: "Login Successfully",
          duration: 3,
          placement: "bottomRight",
        });

        const authToken = businessData?.token;
        sessionStorage.setItem("authToken", authToken);
        sessionStorage.setItem("userType", userType);
        sessionStorage.setItem("user_id", businessData?.user?._id);
        if (businessData?.user?.businessVerified === "verified") {
          if (businessData?.user?.addedCard === true) {
            navigate(`/${userType}`);
          } else {
            navigate(`/subscribe`);
          }
        } else if (businessData?.user?.businessVerified === "pending") {
          notification.warning({
            message: " Business Verification Pending",
            duration: 3,
            placement: "bottomRight",
          });
          if (businessData?.user?.addedCard === true) {
            navigate(`/${userType}`);
          } else {
            navigate(`/subscribe`);
          }
        } else {
          navigate(`/register`);
        }
      } else {
        const authToken = businessData?.token;
        sessionStorage.setItem("authToken", authToken);
        sessionStorage.setItem("userType", userType);
        sessionStorage.setItem("user_id", businessData?.user?._id);

        // Navigate to the verification page
        navigate("/verify-email");
      }
    }
  }, [dispatch, businessSuccess, loginSuccess, data, businessData, userType]);

  const handleClick = async () => {
    if (userSignUp) {
      sessionStorage.setItem("userType", "user");
      dispatch(setUserType({ userType: "user" }));

      await userLogin({ username: values.userName, password: values.passWord })
        .unwrap()
        .catch((err) => {
          notification.error({
            message: err?.data?.error || "an error occured",
            placement: "bottomRight",
          });
        });
    }
    if (!userSignUp) {
      dispatch(setUserType({ userType: "business" }));
      sessionStorage.setItem("userType", "business");

      await businessLogin({
        businessEmail: values.email,
        password: values.passWord,
      })
        .unwrap()
        .catch((err) => {
          notification.error(err?.data?.error || "an error occured");
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
    onSubmit,
  });

  return (
    <>
      {(loginLoading || businessLoading) && <Loader />}
      <section className={classes.login}>
        <div className="row">
          <div
            className={`col-md-6 flex justify-start items-center flex-col gap-3 mb-4 ${classes.text}`}
          >
            <div>
              <h3 className="text-3xl">
                Ready to have fun on a <br />
                <span className={classes.sapa}>Budget?</span>
              </h3>
              <p className="text-2xl mt-2">Login now and Plan a Trip</p>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <AuthFormWrapper onSubmit={handleSubmit}>
              <AuthRoutes>
                <RouteLink
                  onClick={!userSignUp ? () => toggleSignUp("user") : undefined}
                  active={userSignUp}
                >
                  USER
                </RouteLink>
                <RouteLink
                  onClick={
                    userSignUp ? () => toggleSignUp("business") : undefined
                  }
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
                <span className="relative block mt-5">
                  <input
                    className={`${
                      errors.passWord && classes["input-error"]
                    } w-full`}
                    id="passWord"
                    name="passWord"
                    type={seePass ? "text" : "password"}
                    placeholder="Password"
                    value={values.passWord}
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
                {errors.passWord && <ErrorText> {errors.passWord}</ErrorText>}
                <Link
                  to={"/forgot-password"}
                  className={`mb-3 text-end mt-4 ${classes.p}`}
                >
                  Forgot Password?
                </Link>
              </div>
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

export const ErrorText = styled.p`
  color: #f67f7f;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 0;
`;
