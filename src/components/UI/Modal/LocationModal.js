import classes from "./LocationModal.module.css";
import MaryLandMall from "../../../assets/maryland-mall.png";
import ReviewStars from "../../../assets/review-stars.png";
import Modal from "./Modal";
const LocationModal = (props) => {
  return (
    <Modal onClick={props.onClick}>
      <h3>Maryland Mall Cinema</h3>
      <h6>Funtasticaland, Ikorodu-Ososun Rd, Lagos 105102, Ikeja</h6>
      <div className="d-flex">
        <img src={MaryLandMall} alt="" className={classes.large} />
        <div className={classes.small}>
          <img src={MaryLandMall} alt="" />
          <img src={MaryLandMall} alt="" />
        </div>
      </div>
      <div className="d-flex justify-content-center my-3">
        Rating: <img src={ReviewStars} alt="" className={classes.stars} />
      </div>
      <p>
        Yeah, so i wanted to see a movie, but didn't want to go far cos i stay
        around Ikeja. I walked around my area a bit and found this cinema.
        Absolutely loved the sound experience and their popcorn was superb (came
        along free with my ticket) and i spent 6K5 to see 2 movies and I had to
        buy my own drink. Lovely Outing spot!
      </p>
    </Modal>
  );
};

export default LocationModal;
