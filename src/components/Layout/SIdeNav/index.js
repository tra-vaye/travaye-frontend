import classes from "./SideNav.module.css";
import { Links } from "../Header/Header";
import { SignUpButton, LoginButton } from "../../UI/Buttons";

const SideNav = () => {
  return (
    <div className={classes.sideNav}>
      <ul>
        {Links.map((link, i) => {
          return <li>{link}</li>;
        })}
      </ul>
      <div>
        <SignUpButton />
        <LoginButton />
      </div>
    </div>
  );
};

export default SideNav;
