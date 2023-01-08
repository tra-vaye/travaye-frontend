import classes from "./SideNav.module.css";
import { Links } from "../Header/Header";
import { AltButton, Button } from "../../UI/Buttons";

const SideNav = () => {
  return (
    <div className={classes.sideNav}>
      <ul>
        {Links.map((link, i) => {
          return <li>{link}</li>;
        })}
      </ul>
      <div>
        <Button color="green">Sign Up</Button>
        <AltButton>Login</AltButton>
      </div>
    </div>
  );
};

export default SideNav;
