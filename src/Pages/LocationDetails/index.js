import { AltButton, Button } from "../../components/UI/Buttons";
import classes from "./LocationDetails.module.css";
import Maryland from "../../assets/mm-ticket-prices.png";
import Avatar from "../../assets/user-avatar.png";

import { FourStars, FiveStars } from "../../components/UI/svgs/svgs";

const LocationDetails = () => {
  return (
    <div className={classes.location}>
      <div className="row">
        <div className="col-md-6">
          <figure>
            <img src={Maryland} alt="poster" />
            <figcaption>
              Please scroll/swipe to see additional images
            </figcaption>
          </figure>
        </div>
        <div className={`col-md-6 ${classes.details}`}>
          <div>
            <h4>The Maryland Mall Cinema (Genesis Cinemas)</h4>
            <h6>Funtasticaland, Ikorodu-Ososun Rd, Lagos 105102, Ikeja</h6>
          </div>

          <p>
            Maryland Mall Cinemas is one of Nigeria's leading cinema developers
            and operators of multiplex cinemas in Nigeria. The Only ScreenX
            Cinema with a state of the art spund system and 3D viewing pleaseure
            just for you. Come and have a great time while you enjoy your movies
            at Maryland Mall Cinemas
          </p>
          <div className="mb-3">
            <div className="d-flex justify-content-beetween">
              <span
                style={{
                  color: " #009F57",
                  fontWeight: "700",
                  marginRight: "3px",
                }}
              >
                Ticket Prices:
              </span>{" "}
              #1500 - #6000
              <div className="ms-auto">
                <a href="https://genesiscinemas.com/maryland-mall-lagos/#/ms-2287/1">
                  <span style={{ color: " #009F57" }}>Book Tickets</span>{" "}
                </a>

                <i>
                  <svg
                    width="28"
                    height="10"
                    viewBox="0 0 28 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5H27M15.625 1L27 5L15.625 9"
                      stroke="#009F57"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </i>
              </div>
            </div>
            <h6>
              <i>(Tickets come along with free 500g popcorn)</i>
            </h6>
          </div>

          <div className="d-flex mb-3">
            <Button color="green" location={true}>
              Add to Locations
            </Button>
            <Button location={true}>View on Google Maps</Button>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <form>
            <textarea
              rows="13"
              placeholder="Share your experience here...."
            ></textarea>
            <AltButton location={true} className="ms-auto mt-3 mb-5">
              Post Experience
            </AltButton>
          </form>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-between">
            <h4>Reviews</h4>
            <div>
              Average Rating <i>{FourStars}</i>
            </div>
          </div>
          <ul className={classes.reviews}>
            <li>
              <div>
                <div className="d-flex justify-content-between">
                  <h5>
                    <b>Awesome Sound Experience!!!</b>
                  </h5>
                  <i>{FiveStars}</i>
                </div>

                <p>
                  Awesome Sound Experience!!! Best Cinema Experience I have
                  experienced in my life. Sound was so amazing and the 3d
                  viewing was ecstatic. Fantastic Popcorns as well!
                </p>
                <div className={classes.user}>
                  <img src={Avatar} className="img-fluid  me-2" alt="pfp" />
                  <p className="mt-1" style={{ color: "#009f57" }}>
                    Kehinde Olu-Onifade
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <div className="d-flex justify-content-between">
                  <h5>
                    <b>Awesome Sound Experience!!!</b>
                  </h5>
                  <i>{FiveStars}</i>
                </div>

                <p>
                  Awesome Sound Experience!!! Best Cinema Experience I have
                  experienced in my life. Sound was so amazing and the 3d
                  viewing was ecstatic. Fantastic Popcorns as well!
                </p>
                <div className={classes.user}>
                  <img src={Avatar} className="img-fluid  me-2" alt="pfp" />
                  <p className="mt-1" style={{ color: "#009f57" }}>
                    Kehinde Olu-Onifade
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
