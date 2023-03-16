import classes from "./SignUp.module.css";

import {
  FaceBookAuth,
  GoogleAuth,
  AppleAuth,
  Alternate,
} from "../../components/UI/svgs/svgs";

import { Button } from "../../components/UI/Buttons";
import { Link } from "react-router-dom";
import { AuthFormWrapper } from "../Login";
import Avatar from "../../assets/signup-avatar.png";
import { useState } from "react";

const SignUp = () => {
  const [userSignUp, setUserSignUp] = useState(true);

  const toggleSignUp = () => {
    setUserSignUp((prevState) => !prevState);
  };

  return (
    <section className={classes.signup}>
      <div className="row">
        <div
          className={`col-md-6 d-flex flex-column justify-content-center align-items-center order-2 order-md-1 ${classes.intro}`}
        >
          <div className="px-5">
            <h3>
              {userSignUp
                ? "Enjoy your money anywhere"
                : "Open a Business Account"}
              <br /> {userSignUp ? "regardless of " : "with "}
              <span>{userSignUp ? "Sapa" : "Travaye"}</span>
            </h3>
            <p>
              {userSignUp
                ? "Easy planning, Max Flexing"
                : "Enjoy a 2-month Free-Trial"}
            </p>
            {userSignUp ? UserContent : BusinessContent}
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center  order-1 order-md-2">
          <AuthFormWrapper>
            <div className="d-flex justify-content-center">
              <div
                className={`d-flex justify-content-between  ${classes.link}`}
              >
                <p
                  onClick={toggleSignUp}
                  className={`${classes.navlink} ${
                    userSignUp && classes.active
                  }`}
                >
                  Sign Up as User
                </p>
                <p
                  onClick={toggleSignUp}
                  className={`text-end ${classes.navlink} ${
                    !userSignUp && classes.active
                  }`}
                >
                  Sign Up as a Business
                </p>
              </div>
            </div>

            <div className="d-flex flex-column">
              <input
                className="mt-4"
                placeholder={userSignUp ? "Full Name" : "Business Name"}
              />
              <input
                className="mt-4"
                placeholder={userSignUp ? "Username" : "Address"}
              />
              <input
                className="mt-4"
                placeholder={userSignUp ? "Email Address" : "Business Email"}
              />
              <input className="mt-4" type="password" placeholder="Password" />
            </div>
            <br />
            <div className="d-flex justify-content-center mt-2">
              {Alternate}
            </div>
            <div className={classes.socials}>
              {FaceBookAuth} {GoogleAuth} {AppleAuth}
            </div>
            <div
              className={`d-flex justify-content-between mt-3 ${classes.text}`}
            >
              <p className="align-self-center">
                Already have an account?{" "}
                <Link to="/login">
                  <span>Login</span>
                </Link>
              </p>
              <Button color="green">Sign Up</Button>
            </div>
          </AuthFormWrapper>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

const BusinessContent = (
  <p className={classes.business}>
    Connect your business and events with clients <br />
    from all over the country for just{" "}
    <span style={{ color: "#009f57" }}>$75 Monthly. </span>
  </p>
);

const UserContent = (
  <div className={classes.user}>
    <p>
      Trusted by over 5k users like{" "}
      <span style={{ color: "#009f57" }}> YOU!</span>
    </p>
    <p>
      “I wanted to go out but i had only 4k on me. <br />
      Luckily i found Travaye and used it. i am so glad <br /> because i enjoyed
      my outing so much!”
    </p>
    <div className="d-flex">
      <img src={Avatar} alt="avatar" />
      <h5 className="align-self-center ms-3">Jonathan Ikone</h5>
    </div>
  </div>
);
