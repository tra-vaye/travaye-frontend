import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/UI/Buttons";
import classes from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
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
      navigate("/login");
    } else {
      console.log(loggedInUser);
    }
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
              <p className={`mb-5 text-end mt-4 ${classes.p}`}>
                Forgot Password?
              </p>
            </div>
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
          </AuthFormWrapper>
        </div>
      </div>
    </section>
  );
};
export default Login;

export const AuthFormWrapper = (props) => {};
