import { BackDrop } from "../Modal/Modal";
import { createPortal } from "react-dom";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      {createPortal(<BackDrop />, document.getElementById("modal"))}
      <div className={classes["lds-roller"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default Loader;
