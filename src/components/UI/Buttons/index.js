import classes from "./Buttons.module.css";
import ArrowBackIosNewIcon from "../../../assets/left-arrow.png";
import ArrowForwardIosIcon from "../../../assets/right-arrow.png";
import styled from "styled-components";

export const AltButton = styled.button`
  margin: auto ${(props) => (props.location ? "0" : "15px")};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: ${(props) => (props.location ? "10px" : "15px")};
  background-color: white;
  color: #009f57;
  width: ${(props) => props.sidenav && "85.91px"};
  border: 2px solid #009f57;
  font-size: 20px;
`;

export const ScrollLeftBtn = (props) => {
  return (
    <button
      className={`${classes.scroll} ${
        props.className === "review-scroll" && classes.review
      } `}
    >
      <img src={ArrowBackIosNewIcon} alt="scroll" />
    </button>
  );
};

export const ScrollRightBtn = (props) => {
  return (
    <button
      className={`${classes.scroll} ${
        props.className === "review-scroll" && classes.review
      } `}
    >
      <img src={ArrowForwardIosIcon} alt="scroll" />
    </button>
  );
};

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  transform: scale(${(props) => (props.location ? "" : "0.9")});
  border: 2px solid
    ${(props) => (props.color === "green" ? " #009f57" : "#e9a009")};
  border-radius: ${(props) => (props.header ? "15px" : "10px")};
  background-color: ${(props) =>
    props.color === "green" ? " #009f57" : "#e9a009"};
  color: white;
  white-space: nowrap;
  margin-right: ${(props) => props.location && "20px"};
  font-weight: 600;
  font-size: ${(props) => (props.location ? "15px" : "20px")};
  line-height: 32px;
  color: #f0f0f0;
`;
