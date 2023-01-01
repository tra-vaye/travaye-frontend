import classes from "./LocationBox.module.css";
import MaryLandMall from "../../../assets/maryland-mall.png";
import { LocationBoxStar } from "../svgs/svgs";

const LocationBox = (props) => {
  return (
    <div className={classes.location} onClick={props.onClick}>
      <img src={MaryLandMall} alt="location" className="img-fluid" />
      <h6>Maryland Mall Cinema</h6>
      <div className="d-flex justify-content-between">
        <p>Lagos, Nigeria</p>
        <p>4.5 {LocationBoxStar} </p>
      </div>
    </div>
  );
};

export default LocationBox;
