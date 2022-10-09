import Header from "./Header/Header";
import classes from "./Layout.module.css";
import { Links } from "./Header/Header";
import { SignUpButton, LoginButton } from "../UI/Buttons";
import { useState } from "react";

const Layout = (props) => {
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav((prevState) => !prevState);
  };

  return (
    <>
      <Header onToggleSideNav={toggleSideNav} showSideNav={showSideNav} />
      {showSideNav && (
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
      )}
      <div>{props.children}</div>
    </>
  );
};

export default Layout;
