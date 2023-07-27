import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setLogout } from "../../../state";
import { AltButton, Button } from "../../UI/Buttons";
import { Links, Navlink } from "../Header/Header";
import classes from "./SideNav.module.css";

const SideNav = (props) => {
  const [isActive, setIsActive] = useState("");
  const Location = useLocation();
  const dispatch = useDispatch();
  // const token = Boolean(useSelector((state) => state.user));
  const handleLogoutClick = () => {
    dispatch(setLogout());
  };
  useEffect(() => {
    setIsActive(Location.pathname);
  }, [Location.pathname]);

  const token = sessionStorage.getItem("authToken");

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
        {token && (
          <Navlink
            active={isActive === "/user"}
            onClick={() => {
              setIsActive("/user");
              props.onToggleSideNav();
            }}
          >
            <Link to="/user">My Account</Link>
          </Navlink>
        )}
      </ul>
      <div>
        {!token && (
          <Link to="/signup">
            <Button
              color="green"
              onClick={() => {
                props.onToggleSideNav();
              }}
            >
              Sign Up
            </Button>
          </Link>
        )}
        {!token && (
          <Link to="/login">
            <AltButton
              onClick={() => {
                props.onToggleSideNav();
              }}
              sidenav={true}
            >
              Login
            </AltButton>
          </Link>
        )}
        {token && (
          <Link to="/login" onClick={handleLogoutClick}>
            <AltButton
              onClick={() => {
                props.onToggleSideNav();
                sessionStorage.removeItem("authToken");
              }}
              sidenav={true}
            >
              Log out
            </AltButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SideNav;
