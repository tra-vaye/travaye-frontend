import classes from "./Buttons.module.css";
import ArrowBackIosNewIcon from "../../../assets/left-arrow.png";
import ArrowForwardIosIcon from "../../../assets/right-arrow.png";

//for navigation
export const SignUpButton = (props) => {
  return <button className={classes.btn}>Sign Up</button>;
};

//for form submit
export const LoginFormBtn = () => {
  return <button className={classes.btn}>Login</button>;
};

//for navigation
export const LoginButton = (props) => {
  return <button className={classes["btn--alt"]}>Login</button>;
};

export const ScrollLeftBtn = (props) => {
  return (
    <button
      className={`${classes.scroll} ${
        props.className === "review-scroll" && classes.review
      } `}
    >
      <img src={ArrowBackIosNewIcon} alt="scroll" />
    </button>
  );
};

export const ScrollRightBtn = (props) => {
  return (
    <button
      className={`${classes.scroll} ${
        props.className === "review-scroll" && classes.review
      } `}
    >
      <img src={ArrowForwardIosIcon} alt="scroll" />
    </button>
  );
};
