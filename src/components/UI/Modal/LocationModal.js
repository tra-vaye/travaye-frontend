import classes from "./LocationModal.module.css";
import MaryLandMall from "../../../assets/maryland-mall.png";
import ReviewStars from "../../../assets/review-stars.png";
import Modal from "./Modal";
import styled from "styled-components";
const LocationModal = (props) => {
  return (
    <Modal onClick={props.onClick}>
      <Container>
        <h3>Maryland Mall Cinema</h3>
        <h6>Funtasticaland, Ikorodu-Ososun Rd, Lagos 105102, Ikeja</h6>
        <div className="d-flex justify-content-center">
          <img
            src={MaryLandMall}
            alt=""
            className={`${classes.large} img-fluid`}
          />
        </div>
        <div className="d-flex justify-content-center my-3">
          Rating: <img src={ReviewStars} alt="" className={classes.stars} />
        </div>
        <p>
          Yeah, so i wanted to see a movie, but didn't want to go far cos i stay
          around Ikeja. I walked around my area a bit and found this cinema.
          Absolutely loved the sound experience and their popcorn was superb
          (came along free with my ticket) and i spent 6K5 to see 2 movies and I
          had to buy my own drink. Lovely Outing spot!
        </p>
      </Container>
    </Modal>
  );
};

export default LocationModal;

const Container = styled.div``;
