import Logo from "../../../assets/logo.png";
import classes from "./Header.module.css";

const Header = () => {
  const Links = ["Home", "Businesses", "Shop", "Contact Us"];
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
            <button className={classes.btn}>Sign Up</button>
            <button className={classes["btn--alt"]}>Login</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
