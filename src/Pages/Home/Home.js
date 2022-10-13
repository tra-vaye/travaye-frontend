import classes from "./Home.module.css";
import LandingImage from "../../assets/landing.png";
import StoryButton from "../../assets/story-button.png";

import Perks from "../../components/UI/Perks";
import Instructions from "../../components/UI/Instructions";
import ReviewImage from "../../assets/review-image.png";
import ReviewStars from "../../assets/review-stars.png";
import Avatar from "../../assets/avatar.png";
import GetStarted from "../../assets/get-started.png";
import Man from "../../assets/man.png";
import {
  FacebookIcon,
  InstaIcon,
  TwitterIcon,
} from "../../components/UI/svgs/svgs";
import { ScrollLeftBtn, ScrollRightBtn } from "../../components/UI/Buttons";
import Carousel from "../../components/UI/Carousel";

const Home = () => {
  return (
    <>
      <section className={classes.landing}>
        <div className="row">
          <div className="col-lg-6 mb-2">
            <p className={classes.intro}>
              Enjoy Outings without having to think of{" "}
              <span className={classes.sapa}>Sapa!</span>{" "}
            </p>
            <p>
              Plan your trips with Travaye and get the best places to visit for
              within and even under your budget.
            </p>
            <div className="d-flex">
              <button className={classes.btn}>Plan A Trip</button>
              <button className={classes["btn--alt"]}>
                <img src={StoryButton} alt="play" /> Watch Stories
              </button>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-center align-self-start">
            <img src={LandingImage} alt="poster" className="img-fluid " />
            <div
              className={`d-flex flex-column justify-content-evenly ${classes.socials}`}
            >
              {FacebookIcon} {TwitterIcon} {InstaIcon}
            </div>
          </div>
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
      <section className={classes["get-started"]}>
        <div className="row">
          <div className="col-md-6">
            <div>
              <h2>
                Explore The World <br /> With Travaye
              </h2>
              <button>Get Started</button>
            </div>
          </div>
          <div className="col-md-6">
            {/* <img src={Man} alt="poster" className="img-fluid" /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
