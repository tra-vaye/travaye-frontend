import classes from "./SideNav.module.css";
import { Links } from "../Header/Header";
import { AltButton, Button } from "../../UI/Buttons";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navlink } from "../Header/Header";

const SideNav = (props) => {
  const [isActive, setIsActive] = useState("");
  const Location = useLocation();

  useEffect(() => {
    setIsActive(Location.pathname);
  }, [Location.pathname]);

  return (
    <div className={classes.sideNav}>
      <ul>
        {Links.map(({ name, path }, i) => {
          return (
            <Navlink
              active={path === isActive}
              key={i}
              onClick={() => {
                setIsActive(path);
                props.onToggleSideNav();
              }}
            >
              <Link to={path}>{name}</Link>
            </Navlink>
          );
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
