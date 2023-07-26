import classes from "./Home.module.css";
import LandingImage from "../../assets/landing.png";

import Perks from "../../components/UI/Perks";
import Instructions from "../../components/UI/Instructions";
import ReviewImage from "../../assets/review-image.png";
import ReviewStars from "../../assets/review-stars.png";
import Avatar from "../../assets/avatar.png";
import GetStarted from "../../assets/get-started.png";
import Man from "../../assets/man.png";
import PurpleBistro from "../../assets/purple-bistro.png";
import Maryland from "../../assets/maryland-landing.png";

import {
  FacebookIcon,
  InstaIcon,
  PlayStory,
  TwitterIcon,
} from "../../components/UI/svgs/svgs";
import {
  Button,
  ScrollLeftBtn,
  ScrollRightBtn,
} from "../../components/UI/Buttons";
import Carousel from "../../components/UI/Carousel";
import Footer from "../../components/Layout/Footer/Footer";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className={classes.landing}>
        <div className="row">
          <div className="col-lg-6  mt-4">
            <p className={classes.intro}>
              Enjoy Outings without having to think of{" "}
              <span className={classes.sapa}>Sapa!</span>{" "}
            </p>
            <p>
              Plan your trips with Travaye and get the best places to visit for
              within and even under your budget.
            </p>
            <LandingButtonsContainer>
              <Link to="/plan-a-trip">
                <button className={classes.btn}>Plan A Trip</button>
              </Link>

              <a href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTQwMDM1NTU1MzYyODI0?story_media_id=2927036580269740747&igshid=YmMyMTA2M2Y=">
                <button className={classes["btn--alt"]}>
                  {PlayStory} Watch Stories
                </button>
              </a>
            </LandingButtonsContainer>
          </div>
          <LandingImagesContainer className="col-lg-6 d-flex justify-content-center align-self-start">
            <MarylandLink src={Maryland} className="img-fluid " />

            <PurpleBistroLink src={PurpleBistro} className="img-fluid " />

            <img src={LandingImage} alt="poster" className="img-fluid " />
            <div
              className={`d-flex flex-column justify-content-evenly ${classes.socials}`}
            >
              {FacebookIcon}{" "}
              <a href="http://twitter.com/travaye_"> {TwitterIcon}</a>
              <a href="https://www.instagram.com/travaye_/"> {InstaIcon} </a>
            </div>
          </LandingImagesContainer>
        </div>
      </section>
      <Perks />
      <p className={classes.text}>PLANNING WITH TRAVAYE?</p>
      <h2>Discover Places Around Nigeria</h2>
      <Carousel />
      <h2>How To Use Travaye</h2>
      <Instructions />
      <section className={`row px-3 ${classes.reviews}`}>
        <div className="col-lg-6 d-flex justify-content-center">
          <img src={ReviewImage} alt="banner" className="img-fluid" />
        </div>
        <div
          className={`col-lg-6 d-flex flex-column justify-content-center px-5 ${classes.content}`}
        >
          <h2>What are they saying?</h2>
          <h3>What Our Customers Say About Travaye</h3>
          <article>
            I am a GenZ Techie trying to live my best life without worrying
            about Sapa and Travaye helps me do just that by helping me find top
            notch locations I can flex at within my budget. Shoutout to Travaye!{" "}
          </article>
          <div className={classes.user}>
            <div className="d-flex justify-content-between flex-wrap">
              <div className="d-flex justify-content-center align-items-center mt-3 me-4 ">
                <img src={Avatar} alt="avatar" />
                <div>
                  <p>Barnabas Peters</p>
                  <p
                    style={{
                      fontWeight: " 700",
                      fontSize: "22px",
                      lineHeight: " 40px",
                      textAlign: "justify",
                      color: " #9d9d9d",
                    }}
                  >
                    Photographer
                  </p>
                  <div className={classes.stars}>
                    <img src={ReviewStars} alt="stars" className="mt-3 " />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center justify-self-center mx-auto mt-3">
                <ScrollRightBtn className="review-scroll" />
                <ScrollLeftBtn className="review-scroll" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <GetStartedConainer>
        <GetStartedContent className="row">
          <div className="col-md-6 d-flex justify-content-center align-items-center  ">
            <div>
              <h2>
                Explore The World <br /> With Travaye
              </h2>
              <Button
                color="orange"
                onClick={() => {
                  navigate("/plan-a-trip");
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
          <div className="d-none d-md-block col-md-6 ">
            <img src={Man} alt="poster" className="img-fluid" />
          </div>
        </GetStartedContent>
      </GetStartedConainer>
      <Footer />
    </>
  );
};

export default Home;

const GetStartedConainer = styled.section`
  margin-top: 8rem;
  display: flex;
  justify-content: center;
  h2 {
    text-align: start;
    color: white;
    margin-bottom: 50px;
    @media (max-width: 767px) {
      text-align: center;
    }
  }
  img {
    width: 280px;
    height: 320px;
    position: relative;
    left: 20%;
    bottom: 0;
  }
  button {
    width: 250px;
    border-radius: 30px;
  }
`;

const GetStartedContent = styled.div`
  width: 70%;
  background-color: #009f57;
  background-image: url(${GetStarted});
  background-position: center;
  border-radius: 50px;

  @media (max-width: 1030px) {
    width: 90%;
  }
  @media (max-width: 767px) {
    padding: 15px;
    button {
      width: 100%;
    }
  }
`;

const LandingImagesContainer = styled.div`
  position: relative;

  @media (max-width: 991px) {
    transform: translateY(150px);
  }
`;

const PurpleBistroLink = styled.img`
  position: absolute;
  top: 7%;
  left: 0;
  transform: scale(0.9);
  @media (max-width: 640px) {
    transform: scale(0.7);
    left: -40px;
    top: -30px;
  }
`;

const MarylandLink = styled.img`
  position: absolute;
  bottom: 17%;
  left: 0;
  transform: scale(0.9);
  @media (max-width: 640px) {
    transform: scale(0.7);
    left: -40px;
    bottom: 0;
  }
`;

const LandingButtonsContainer = styled.div`
  @media (max-width: 767px) {
    transform: translatex(-50px);
    button {
      transform: scale(0.8);
    }
  }
`;
