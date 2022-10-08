import Details from "./data";
import CardList from "../CardLIst";

const Instructions = () => {
  return (
    <CardList className="instructions">
      {Details.map(({ id, step, detail, img }) => {
        return (
          <li key={id}>
            <div>
              <img src={img} alt="vector" className="mb-3" />
              <h5>{step}</h5>
              <p>{detail}</p>
            </div>
          </li>
        );
      })}
    </CardList>
  );
};

export default Instructions;
