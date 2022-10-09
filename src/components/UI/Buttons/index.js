import classes from "./Buttons.module.css";

export const SignUpButton = (props) => {
  return <button className={classes.btn}>Sign Up</button>;
};

export const LoginButton = (props) => {
  return <button className={classes["btn--alt"]}>Login</button>;
};
