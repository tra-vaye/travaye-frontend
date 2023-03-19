import { useState } from "react";
import { useDispatch } from "react-redux/es";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import Loader from "../../components/UI/Loader";
import { useFormik } from "formik";
import {
  Alternate,
  AppleAuth,
  FaceBookAuth,
  GoogleAuth,
} from "../../components/UI/svgs/svgs";
import { setUser } from "../../state";
import classes from "./Login.module.css";

const { businessLoginSchema, userLoginSchema } = require("../../schemas");

const Login = () => {
  const dispatch = useDispatch();

  const [userSignUp, setUserSignUp] = useState(true);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const toggleSignUp = () => {
    setUserSignUp((prevState) => !prevState);
  };

  const handleClick = async (e) => {
    setIsLoading(true);

    if (userSignUp) {
      const userLoginResponse = await fetch(
        "https://travaye-backend.onrender.com/api/user/login",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: values.userName,
            password: values.passWord,
          }),
        }
      );
      const loggedInUser = await userLoginResponse.json();
      if (userLoginResponse.ok) {
        console.log(loggedInUser);
        console.log(loggedInUser.user);
        dispatch(setUser({ user: loggedInUser.user }));
        setIsLoading(false);
        navigate("/user");
      } else {
        setIsLoading(false);
        alert("Error");
        console.log(loggedInUser);
        return;
      }
    } else if (!userSignUp) {
      const businessLoginResponse = await fetch(
        `https://travaye-backend.onrender.com/api/business/login`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            businessEmail: values.email,
            password: values.passWord,
          }),
        }
      );
      const loggedInBusiness = await businessLoginResponse.json();
      if (businessLoginResponse.ok) {
        console.log(businessLoginResponse);
        console.log(loggedInBusiness.user);
        dispatch(setUser({ user: loggedInBusiness.user }));
        setIsLoading(false);
        navigate("/user");
      } else {
        console.log(loggedInBusiness);
        alert("Error");
        setIsLoading(false);
        return;
      }
    }
  };

  //formik

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
      {" "}
      {isLoading && <Loader />}{" "}
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
                  error={userSignUp ? errors.userName : errors.email}
                  value={userSignUp ? values.userName : values.email}
                  onChange={handleChange}
                />

                <ErrorText>
                  {userSignUp && errors.userName && errors.userName}
                </ErrorText>

                <ErrorText>
                  {!userSignUp && errors.email && errors.email}
                </ErrorText>

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
                <ErrorText>{errors.passWord && errors.passWord}</ErrorText>
                <p className={`mb-3 text-end mt-4 ${classes.p}`}>
                  Forgot Password?
                </p>
              </div>
              <div className="d-flex justify-content-center">{Alternate}</div>
              <SocialsContainer>
                {FaceBookAuth} {GoogleAuth} {AppleAuth}
              </SocialsContainer>
              <div
                className={`d-flex justify-content-between mt-3 ${classes.text}`}
              >
                <p className="align-self-center">
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

const SocialsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 2rem;
  svg {
    transform: scale(0.7);
  }
`;

const ErrorText = styled.p`
  color: #f67f7f;
  font-size: 14px;
  margin-top: 10px;
`;
