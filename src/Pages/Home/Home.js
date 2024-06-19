import classes from "./Home.module.css";
import Perks from "../../components/UI/Perks";
import Instructions from "../../components/UI/Instructions";
import Explore from "../../components/UI/Explore";
import PurpleBistro from "../../assets/purple-bistro.png";
import Maryland from "../../assets/maryland-landing.png";

import { Button } from "../../components/UI/Buttons";
import Carousel from "../../components/UI/Carousel";
import Footer from "../../components/Layout/Footer/Footer";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import ReviewCarousel from "../../components/UI/Review/Review";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className={classes.landing}>
        <div className="row align-items-center">
          <div className="col-md-6 mt-4">
            <p className={classes.intro}>
              Your guide to{" "}
              <span className={classes.sapa}>affordable adventures</span>
              in Nigeria
            </p>
            <p>
              Plan your trips with Travaye and get the best places to visit for
              within and even under your budget.
            </p>
            <LandingButtonsContainer>
              <Link to="/plan-a-trip">
                <button className={classes.btn}>Plan A Trip &rarr;</button>
              </Link>
            </LandingButtonsContainer>
          </div>
          <div className={`${classes.videoSection} position-relative align-self-start ml-auto`}>
            <LandingImagesContainerYellow />
            <LandingImagesContainer className="d-flex justify-content-center">
              <MarylandLink src={Maryland} className="img-fluid" />

              <PurpleBistroLink src={PurpleBistro} className="img-fluid" />
              <YouTube
                src="https://www.youtube.com/embed/-N9OxTpt09Y?&autoplay=1&mute=1&controls=1&loop=1&modestbranding=1"
                title="YouTube video player"
                allow="autoplay; encrypted-media;"
              ></YouTube>
              
              {/* <div
                className={`d-flex flex-column justify-content-evenly ${classes.socials}`}
              >
                {FacebookIcon}{" "}
                <a href="http://twitter.com/travaye_"> {TwitterIcon}</a>
                <a href="https://www.instagram.com/travaye_/"> {InstaIcon} </a>
              </div> */}
            </LandingImagesContainer>

          </div>
        </div>
      </section>
      <Perks />
      <TitleText>
        Discover Places Around Nigeria
      </TitleText>
      <div className="w-full">
        <Carousel />
      </div>
      <TitleText>
        How To Use Travaye
      </TitleText>
      <Instructions />
      <div
        className={classes.reviewSlide}
      >
        <TitleText>
          What Our Customers Say
        </TitleText>
        <ReviewCarousel classes={classes} />
      </div>
      <section className={classes.explore}>
        <div className="d-flex justify-content-between align-items-center">
          <TitleText className="text-white !px-0">Explore with Travaye!</TitleText>
          <Button
            color="orange"
            onClick={() => {
              navigate("/plan-a-trip");
            }}
          >
            Get Started
          </Button>
        </div>
        <Explore classes={classes} />
      </section>

      <Footer />
    </>
  );
};

export default Home;

const LandingImagesContainer = styled.div`
  height: fit-content;
  border: 14px solid #009F57;
  z-index: 2;
  border-radius: 15px;
  background-color: white;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LandingImagesContainerYellow = styled.div`
  height: 100%;
  top: 13px;
  left: 31px;
  width: 91%;
  position: absolute;
  border: 20px solid #E9A309;
  border-radius: 15px;
  bottom: -5px;
  z-index: -2;

  @media (max-width: 768px) {
    width: 93.2%;
  }
`;

const YouTube = styled.iframe`
  width: 100%;
  height: 500px;

  @media (max-width: 780px) {

  }

`;

const PurpleBistroLink = styled.img`
  position: absolute;
  top: 7%;
  right: -22%;
  transform: scale(0.8);
  z-index: 3;

  @media (max-width: 780px) {
    transform: scale(0.7);
    right: -25%;
    top: 30px;
  }
`;

const MarylandLink = styled.img`
  position: absolute;
  bottom: 7%;
  left: -32%;
  z-index: 3;
  transform: scale(0.8);

  @media (max-width: 780px) {
    transform: scale(0.7);
    left: -24%;
    bottom: 20px;
  }
`;

const LandingButtonsContainer = styled.div`
  display: flex;

  @media (max-width: 767px) {
    transform: translatex(-50px);
    button {
      transform: scale(0.7);
    }
  }
`;

const TitleText = styled.h2`
  color: #000;
  font-size: 56px;
  font-weight: 700;
  text-align: center;
  padding-inline: 5%;
  
  @media (max-width: 1024px) {
    font-size: 48px;
  }

  @media (max-width: 780px) {
    font-size: 36px;
  }

  @media (max-width: 568px) {
    font-size: 28px;
  }
`