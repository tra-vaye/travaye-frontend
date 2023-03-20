import { useState } from "react";
import { useDispatch } from "react-redux/es";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import Loader from "../../components/UI/Loader";
import {
  Alternate,
  AppleAuth,
  FaceBookAuth,
  GoogleAuth,
} from "../../components/UI/svgs/svgs";
import { setUser } from "../../state";
import classes from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();

  const [userSignUp, setUserSignUp] = useState(true);

  const navigate = useNavigate();

  const [userLoginData, setUserLoginData] = useState({
    username: "",
    password: "",
  });
  const [businessLoginData, setBusinessLoginData] = useState({
    businessEmail: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const toggleSignUp = () => {
    setUserSignUp((prevState) => !prevState);
  };

  // const handleClick = async (e) => {
  //   e.preventDefault();

  // };
  const handleClick = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (userSignUp) {
      const userLoginResponse = await fetch(
        "https://travaye-backend.onrender.com/api/user/login",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userLoginData),
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
          body: JSON.stringify(businessLoginData),
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

  const googleSignIn = () => {
    if (userSignUp) {
      window.open(
        `${process.env.REACT_APP_SERVER_URL}/api/user/auth/google`,
        "self",
        "width=500 height=600"
      );
    } else {
      window.open(
        `${process.env.REACT_APP_SERVER_URL}/api/business/google`,
        "self",
        "width=500 height=600"
      );
    }
  };

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
            <AuthFormWrapper>
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
                  className="mt-5"
                  type={`${userSignUp ? "text" : "email"}`}
                  placeholder={`${userSignUp ? "Username" : "Email Address"}`}
                  onChange={
                    userSignUp
                      ? (e) =>
                          setUserLoginData({
                            ...userLoginData,
                            username: e.target.value,
                          })
                      : (e) =>
                          setBusinessLoginData({
                            ...businessLoginData,
                            businessEmail: e.target.value,
                          })
                  }
                />
                <input
                  className="mt-5"
                  type="password"
                  placeholder="Password"
                  onChange={
                    userSignUp
                      ? (e) =>
                          setUserLoginData({
                            ...userLoginData,
                            password: e.target.value,
                          })
                      : (e) =>
                          setBusinessLoginData({
                            ...businessLoginData,
                            password: e.target.value,
                          })
                  }
                />
                <p className={`mb-3 text-end mt-4 ${classes.p}`}>
                  Forgot Password?
                </p>
              </div>
              <div className="d-flex justify-content-center">{Alternate}</div>
              <SocialsContainer>
                {FaceBookAuth} {<GoogleAuth onClick={googleSignIn} />}{" "}
                {AppleAuth}
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
                <Button color="green" onClick={handleClick}>
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
  return <form className={classes.form}>{props.children}</form>;
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
