import classes from "./Modal.module.css";
import { createPortal } from "react-dom";
import { CloseModalBtn } from "../svgs/svgs";

const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};
const ModalOverlay = (props) => {
  return (
    <div
      className={`${classes.overlay} ${
        props.className === "points-modal" && classes["points-modal"]
      }`}
    >
      <span onClick={props.onClick}>{CloseModalBtn}</span>
      {props.children}
    </div>
  );
};

const portalElement = document.getElementById("modal");

const Modal = (props) => {
  return (
    <>
      {createPortal(<BackDrop onClick={props.onClick} />, portalElement)}
      {createPortal(
        <ModalOverlay onClick={props.onClick} className={props.className}>
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
