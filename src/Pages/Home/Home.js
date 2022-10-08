import classes from "./Home.module.css";
import LandingImage from "../../assets/landing.png";
import StoryButton from "../../assets/story-button.png";
import Footer from "../../components/Layout/Footer/Footer";
import Perks from "../../components/UI/Perks";
import Instructions from "../../components/UI/Instructions";
import ReviewImage from "../../assets/review-image.png";
import ReviewStars from "../../assets/review-stars.png";
import Avatar from "../../assets/avatar.png";
import GetStarted from "../../assets/get-started.png";
import Man from "../../assets/man.png";

const Home = () => {
  return (
    <>
      <section className={classes.landing}>
        <div className="row">
          <div className="col-lg-6 mb-5">
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
          </div>
        </div>
      </section>
      <Perks />
      <p className={classes.text}>PLANNING WITH TRAVAYE?</p>
      <h2>Discover Places around Nigeria</h2>
      <Instructions />
      <h2>How To Use Travaye</h2>
      <Instructions />
      <section className={`row px-3 ${classes.reviews}`}>
        <div className="col-lg-6 d-flex justify-content-center">
          <img src={ReviewImage} alt="image" className="img-fluid" />
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
            <div className="d-flex justify-content-between">
              <div className="d-flex justify-content-center align-items-center mt-3 me-4 ">
                <img src={Avatar} alt="avatar" />
                <div>
                  <p>Barnabas Peters</p>
                  <p>Photographer</p>
                </div>
              </div>

              <div className="d-flex justify-content-center align-items-center">
                Buttons
              </div>
            </div>
            <img src={ReviewStars} alt="stars" className="mt-3" />
          </div>
        </div>
      </section>
      <section className={classes["get-started"]}>
        <div>
          <img src={GetStarted} alt="banner" className="img-fluid" />
          <img src={Man} alt="poster" className="img-fluid" />
          <div>
            <h2>
              Explore The World <br /> With Travaye
            </h2>
            <button>Get Started</button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
