import { useState } from "react";
import {
  Alternate,
  AppleAuth,
  FaceBookAuth,
  GoogleAuth,
} from "../../components/UI/svgs/svgs";

import {
  Link,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import classes from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const [userLoginData, setUserLoginData] = useState({
    username: "",
    password: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    const userLoginResponse = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/user/login`,
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
      navigate("/user");
    } else {
      console.log(loggedInUser);
    }
  };

  const UserLogin = () => {
    return (
      <form>
        <div className="d-flex flex-column">
          <input
            className="mt-5"
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setUserLoginData({
                ...userLoginData,
                username: e.target.value,
              })
            }
          />
          <input
            className="mt-5"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setUserLoginData({
                ...userLoginData,
                password: e.target.value,
              })
            }
          />

          <p className={`mb-3 text-end mt-4 ${classes.p}`}>Forgot Password?</p>
        </div>
        <div className="d-flex justify-content-center">{Alternate}</div>
        <SocialsContainer>
          {FaceBookAuth} {GoogleAuth} {AppleAuth}
        </SocialsContainer>
        <div className="d-flex justify-content-between">
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
      </form>
    );
  };

  const BusinessLogin = () => {
    return (
      <form>
        <div className="d-flex flex-column">
          <input
            className="mt-5"
            type="text"
            placeholder="Email Address"
            onChange={(e) =>
              setUserLoginData({
                ...userLoginData,
                username: e.target.value,
              })
            }
          />
          <input
            className="mt-5"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setUserLoginData({
                ...userLoginData,
                password: e.target.value,
              })
            }
          />

          <p className={`mb-3 text-end mt-4 ${classes.p}`}>Forgot Password?</p>
        </div>
        <div className="d-flex justify-content-center">{Alternate}</div>
        <SocialsContainer>
          {FaceBookAuth} {GoogleAuth} {AppleAuth}
        </SocialsContainer>
        <div className="d-flex justify-content-between">
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
      </form>
    );
  };

  return (
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
            <LoginRoutes>
              {routes.map((route, i) => {
                return (
                  <RouteLink
                    key={i}
                    active={`/login/${route}` === location.pathname}
                  >
                    <Link to={route}>{route.toUpperCase()}</Link>
                  </RouteLink>
                );
              })}
            </LoginRoutes>

            <Routes>
              <Route path="/business" element={<BusinessLogin />} />
              <Route path="/user" element={<UserLogin />} />
            </Routes>
          </AuthFormWrapper>
        </div>
      </div>
    </section>
  );
};
export default Login;

export const AuthFormWrapper = (props) => {
  return <div className={classes.form}>{props.children}</div>;
};

const routes = ["user", "business"];
const RouteLink = styled.li`
  color: ${(props) => (props.active ? "#009f57" : "#9d9d9d")};
  border-bottom: 3px solid ${(props) => (props.active ? "#009f57" : "#9d9d9d")};
  width: 100%;
  height: 43px;
  text-align: center;
`;

const LoginRoutes = styled.ul`
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
