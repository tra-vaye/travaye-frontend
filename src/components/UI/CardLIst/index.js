import classes from "./CardList.module.css";

const CardList = (props) => {
  return (
    <ul
      className={`${classes.card} ${
        props.className === "instructions" && classes.instructions
      }`}
    >
      {props.children}
    </ul>
  );
};
export default CardList;
