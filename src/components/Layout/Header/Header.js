import Logo from "../../../assets/logo.png";
import classes from "./Header.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Button, AltButton } from "../../UI/Buttons";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Header = (props) => {
  const [isActive, setIsActive] = useState("");
  const Location = useLocation();

  useEffect(() => {
    setIsActive(Location.pathname);
  }, [Location.pathname]);

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <img src={Logo} alt="logo" className={classes.logo} />
        <div>
          <ul className={classes.links}>
            {Links.map(({ name, path }, i) => {
              return (
                <Navlink
                  active={path === isActive}
                  key={i}
                  onClick={() => {
                    setIsActive(path);
                  }}
                >
                  <Link to={path}>{name}</Link>
                </Navlink>
              );
            })}
          </ul>
          <div>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button header={true} color="green">
                Sign Up
              </Button>
            </Link>
            <Link to="/login/user" style={{ textDecoration: "none" }}>
              <AltButton>Login</AltButton>
            </Link>
          </div>
        </div>
        <button className={classes.hamburger} onClick={props.onToggleSideNav}>
          {props.showSideNav ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>
    </header>
  );
};

export default Header;

export const Links = [
  { name: "Home", path: "/" },
  { name: "Businesses", path: "/business-locations" },
  { name: "Shop", path: "/#" },
  { name: "Contact Us", path: "/contact-us" },
];

export const Navlink = styled.li`
  a {
    color: ${(props) => (props.active ? "#e9a009" : "#000")};
    text-decoration: none;
    &:hover {
      color: ${(props) => !props.active && "#e9a0097d"};
      transition: 200ms ease-in-out;
    }
  }
`;
