import { useNavigate } from "react-router-dom";
import {
  Alternate,
  AppleAuth,
  FaceBookAuth,
  GoogleAuth,
} from "../../components/UI/svgs/svgs";
import classes from "./SignUp.module.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../assets/signup-avatar.png";
import { Button } from "../../components/UI/Buttons";
import { AuthFormWrapper, AuthRoutes, RouteLink } from "../Login";
import Loader from "../../components/UI/Loader";

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
  });
  const [businessData, setBusinessData] = useState({
    businessName: "",
    businessEmail: "",
    address: "",
    password: "",
  });
  const [userSignUp, setUserSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSignUp = () => {
    setUserSignUp((prevState) => !prevState);
  };
  const handleClick = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (userSignUp) {
      const userSignUpResponse = await fetch(
        "https://travaye-backend.onrender.com/api/user/",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const savedUser = await userSignUpResponse.json();
      if (userSignUpResponse.ok) {
        console.log(userSignUpResponse);
        console.log(savedUser);
        setIsLoading(false);
        navigate("/login");
      } else {
        setIsLoading(false);
        console.log(savedUser);
        alert("Error");
        return;
      }
    } else if (!userSignUp) {
      const businessSignUpResponse = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/business/`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(businessData),
        }
      );
      const savedBusiness = await businessSignUpResponse.json();
      if (businessSignUpResponse.ok) {
        console.log(businessSignUpResponse);
        console.log(savedBusiness);
        setIsLoading(false);
        navigate("/user");
      } else {
        setIsLoading(false);
        alert("Error");
        console.log(savedBusiness);
        return;
      }
    }
  };

  return (
    <section className={classes.signup}>
      {isLoading && <Loader />}
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
            <AuthRoutes>
              <RouteLink
                onClick={!userSignUp ? toggleSignUp : undefined}
                active={userSignUp}
              >
                User Sign Up
              </RouteLink>
              <RouteLink
                onClick={userSignUp ? toggleSignUp : undefined}
                active={!userSignUp}
              >
                Business Sign Up
              </RouteLink>
            </AuthRoutes>

            <div className="d-flex flex-column">
              <input
                className="mt-4"
                placeholder={userSignUp ? "Full Name" : "Business Name"}
                onChange={
                  userSignUp
                    ? (e) =>
                        setUserData({ ...userData, fullName: e.target.value })
                    : (e) =>
                        setBusinessData({
                          ...businessData,
                          businessName: e.target.value,
                        })
                }
              />
              <input
                className="mt-4"
                placeholder={userSignUp ? "Username" : "Address"}
                onChange={
                  userSignUp
                    ? (e) =>
                        setUserData({ ...userData, username: e.target.value })
                    : (e) =>
                        setBusinessData({
                          ...businessData,
                          address: e.target.value,
                        })
                }
              />

              <input
                className="mt-4"
                type="email"
                placeholder={userSignUp ? "Email Address" : "Business Email"}
                onChange={
                  userSignUp
                    ? (e) => setUserData({ ...userData, email: e.target.value })
                    : (e) =>
                        setBusinessData({
                          ...businessData,
                          businessEmail: e.target.value,
                        })
                }
              />
              <select className="mt-4">
                <option disabled selected hidden>
                  Category
                </option>
                <option>Student</option>
                <option>Photographer</option>
                <option>Artist</option>
                <option>Enterpreneur</option>
                <option>Writer</option>
                <option>Digital Creator</option>
              </select>
              <input
                className="mt-4"
                type="password"
                placeholder="Password"
                onChange={
                  userSignUp
                    ? (e) =>
                        setUserData({ ...userData, password: e.target.value })
                    : (e) =>
                        setBusinessData({
                          ...businessData,
                          password: e.target.value,
                        })
                }
              />
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
              <Button color="green" onClick={handleClick}>
                Sign Up
              </Button>
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
