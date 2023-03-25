import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
// import { Alternate } from "../../components/UI/svgs/svgs";
import classes from "./SignUp.module.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../../assets/signup-avatar.png";
import { Button } from "../../components/UI/Buttons";
import Loader from "../../components/UI/Loader";
import { businessSignUpSchema, userSignUpSchema } from "../../schemas";
import serverUrl from "../../server";
import { setUser } from "../../state";
import { AuthFormWrapper, AuthRoutes, ErrorText, RouteLink } from "../Login";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userSignUp, setUserSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSignUp = () => {
    setUserSignUp((prevState) => !prevState);
  };
  const handleClick = async () => {
    setIsLoading(true);
    if (userSignUp) {
      const userSignUpResponse = await fetch(`${serverUrl}/api/user/`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values?.fullName,
          username: values?.userName,
          email: values?.email,
          password: values?.passWord,
        }),
      });
      const savedUser = await userSignUpResponse.json();
      if (userSignUpResponse.ok) {
        console.log(userSignUpResponse);
        console.log(savedUser);
        setIsLoading(false);
        dispatch(setUser({ user: savedUser.user }));
        navigate("/verify");
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
          body: JSON.stringify({
            businessName: values.businessName,
            businessEmail: values.email,
            address: values.address,
            password: values.passWord,
          }),
        }
      );
      const savedBusiness = await businessSignUpResponse.json();
      if (businessSignUpResponse.ok) {
        console.log(businessSignUpResponse);
        console.log(savedBusiness);
        setIsLoading(false);
        navigate("/verify");
      } else {
        setIsLoading(false);
        alert("Error");
        console.log(savedBusiness);
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
      fullName: "",
      userName: "",
      passWord: "",
      email: "",
      businessName: "",
      address: "",
      occupation: "",
    },
    validationSchema: userSignUp ? userSignUpSchema : businessSignUpSchema,
    onSubmit,
  });

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
          <AuthFormWrapper onSubmit={handleSubmit}>
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
                id={userSignUp ? "fullName" : "businessName"}
                name={userSignUp ? "fullName" : "businessName"}
                value={userSignUp ? values.fullName : values.businessName}
                className={`${
                  (userSignUp ? errors.fullName : errors.businessName) &&
                  classes["input-error"]
                } mt-4`}
                placeholder={userSignUp ? "Full Name" : "Business Name"}
                onChange={handleChange}
              />
              {(userSignUp ? errors.fullName : errors.businessName) && (
                <ErrorText>
                  {userSignUp ? errors.fullName : errors.businessName}
                </ErrorText>
              )}
              <input
                id={userSignUp ? "userName" : "address"}
                name={userSignUp ? "userName" : "address"}
                value={userSignUp ? values.userName : values.address}
                className={`${
                  (userSignUp ? errors.userName : errors.address) &&
                  classes["input-error"]
                } mt-4`}
                placeholder={userSignUp ? "Username" : "Address"}
                onChange={handleChange}
              />
              {(userSignUp ? errors.userName : errors.address) && (
                <ErrorText>
                  {userSignUp ? errors.userName : errors.address}
                </ErrorText>
              )}
              <input
                id="email"
                name="email"
                value={values.email}
                className={`${errors.email && classes["input-error"]} mt-4`}
                type="email"
                placeholder={userSignUp ? "Email Address" : "Business Email"}
                onChange={handleChange}
              />{" "}
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
              {userSignUp && (
                <>
                  <input
                    placeholder="Occupation"
                    id="occupation"
                    type="text"
                    name="occupation"
                    value={values.occupation}
                    className={`${
                      errors.occupation && classes["input-error"]
                    } mt-4`}
                    onChange={handleChange}
                  />
                  {errors.occupation && (
                    <ErrorText>{errors.occupation}</ErrorText>
                  )}
                </>
              )}
              <input
                className={`${errors.passWord && classes["input-error"]} mt-4`}
                id="passWord"
                name="passWord"
                type="passWord"
                placeholder="Password"
                value={values.passWord}
                onChange={handleChange}
              />{" "}
              {errors.passWord && <ErrorText>{errors.passWord}</ErrorText>}
            </div>
            <br />
            {/* <div className="d-flex justify-content-center mt-2">
              {Alternate}
            </div> */}
            {/* <div className={classes.socials}>
              {FaceBookAuth} {GoogleAuth} {AppleAuth}
            </div> */}
            <div
              className={`d-flex justify-content-between mt-3 ${classes.text}`}
            >
              <p className="align-self-center">
                Already have an account?{" "}
                <Link to="/login">
                  <span>Login</span>
                </Link>
              </p>
              <Button
                color="green"
                type="submit"
                disabled={
                  errors.email ||
                  errors.passWord ||
                  errors.userName ||
                  errors.fullName ||
                  errors.businessName ||
                  errors.address ||
                  errors.occupation
                }
              >
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
