import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import classes from "./Trip.module.css";

const PlanTrip = () => {
  return (
    <div className={classes.trip}>
      <h4 className="text-center">Plan Your desired Trip with Travaye</h4>
      <h5 className="text-center">
        Follow the Steps below to plan your trip in next to no time
      </h5>
      <div>
        <h4 className="mt-3">Step 1</h4>
        <p>Please Fill in Your City / Address Details </p>
        <div className="row">
          <div className="col-md-4">
            <select required>
              {States.map((state, i) => {
                return (
                  <option
                    key={i}
                    value={state}
                    hidden={state === "State"}
                    disabled={state === "State"}
                    selected={state === "State"}
                  >
                    {state}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-4">
            <select>
              <option>City</option>
            </select>
          </div>
          <div className="col-md-4">
            <select>
              <option>LGA</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <h4>Step 2</h4>
        <p>Please Select a Category of Outing Venues</p>
        <ul>
          {categories.map((category, i) => {
            return (
              <li key={i}>
                <input
                  type="radio"
                  value={category}
                  id={category}
                  name="category"
                />
                <label htmlFor={category}>{category}</label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-3">
        <h4>Step 3</h4>
        <p>Please Select a budget for your outing.</p>
        <select>
          {Budgets.map((budget, i) => {
            return (
              <option
                key={i}
                value={budget}
                hidden={budget === "Select Budget"}
                disabled={budget === "Select Budget"}
                selected={budget === "Select Budget"}
              >
                {budget}
              </option>
            );
          })}
        </select>
      </div>
      <ButtonContainer>
        <Button color="green">Continue</Button>
      </ButtonContainer>
    </div>
  );
};
export default PlanTrip;
const ButtonContainer = styled.div`
  button {
    margin-left: auto;
    border-radius: 10px;
    @media (max-width: 767px) {
      margin-left: 0;
    }
  }
`;
const States = [
  "State",
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nassarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const categories = [
  "Special Events",
  "Food & Drinks",
  "Entertainment Venues",
  "Parks & Relaxation Spots",
  "History & Arts",
  "Wildlife Attractions",
  "Sports & Recreation Centres",
  "Historical/Tourist Attractions",
];

const Budgets = [
  "Select Budget",
  "free",
  "freee - 5k",
  "5k - 10k",
  "10k - 20k",
];
