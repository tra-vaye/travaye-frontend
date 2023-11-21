import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../../assets/logo.png";
import { AltButton, Button } from "../../UI/Buttons";
import classes from "./Header.module.css";
import { logout } from "../../../redux/Slices/authSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState("");
  const Location = useLocation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("authToken");

  const handleLogoutClick = () => {
    dispatch(logout());
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    setIsActive(Location.pathname);
  }, [Location.pathname]);

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Link to="/">
          <img src={Logo} alt="logo" className={classes.logo} />
        </Link>

        <div>
          <ul className={classes.links}>
            {Links.map(({ name, path }, i) => {
              return (
                <Navlink
                  active={path === isActive}
                  key={i}
                  onClick={() => {
                    setIsActive(path);
                    navigate(`${path}`);
                  }}
                >
                  <Link>{name}</Link>
                </Navlink>
              );
            })}
            {token && (
              <Navlink
                active={isActive === "/user"}
                onClick={() => {
                  setIsActive("/user");
                  navigate("/user");
                }}
              >
                <Link>My Account</Link>
              </Navlink>
            )}
          </ul>
          <div>
            {!token && (
              <Link style={{ textDecoration: "none" }} to={`/signup`}>
                <Button
                  // header={true}
                  color="green"
                >
                  Sign Up
                </Button>
              </Link>
            )}
            {!token && (
              <Link style={{ textDecoration: "none" }} to={`/login`}>
                <AltButton>Login</AltButton>
              </Link>
            )}
            {token && (
              <Link
                style={{ textDecoration: "none" }}
                onClick={handleLogoutClick}
              >
                <AltButton>Logout</AltButton>
              </Link>
            )}
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
  { name: "Locations", path: "/business-locations" },
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
