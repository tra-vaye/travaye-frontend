import Details from "./data";
import CardList from "../CardLIst";

const Instructions = () => {
  return (
    <CardList className="instructions">
      {Details.map(({ id, step, img }) => {
        return (
          <li key={id}>
            <img src={img} alt="vector" />
            <h5>{step}</h5>
          </li>
        );
      })}
    </CardList>
  );
};

export default Instructions;
