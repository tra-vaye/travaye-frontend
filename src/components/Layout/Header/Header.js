import Logo from "../../../assets/logo.png";
import classes from "./Header.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { SignUpButton, LoginButton } from "../../UI/Buttons";

export const Links = ["Home", "Businesses", "Shop", "Contact Us"];
const Header = (props) => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <img src={Logo} alt="logo" className={classes.logo} />
        <div>
          <ul className={classes.links}>
            {Links.map((link, i) => (
              <li key={i}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
          <div>
            <LoginButton />
            <SignUpButton />
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
