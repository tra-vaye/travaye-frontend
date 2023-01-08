import Avatar from "../../assets/user-avatar.png";
import classes from "./UserProfile.module.css";
import { Button } from "../../components/UI/Buttons";
import LocationBox from "../../components/UI/Location/LocationBox";
import { useState } from "react";
import LocationModal from "../../components/UI/Modal/LocationModal";
import NewLocation from "../../components/UI/Modal/NewLocation";
import PointsModal from "../../components/UI/Modal/PointsModal";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [newLocationModal, setNewLocationModal] = useState(false);
  const [showPointsModal, setShowPointsModal] = useState(false);

  const toggleShowLocationModal = () => {
    setShowLocationModal((prevState) => !prevState);
  };
  const toggleNewLocationModal = () => {
    setNewLocationModal((prevState) => !prevState);
  };

  const togglePointsModal = () => {
    setShowPointsModal((prevState) => !prevState);
  };
  return (
    <section className={classes.user}>
      <div className={classes.dashboard}>{Dashboard}</div>
      <div className={classes.main}>
        <div className="d-flex justify-content-between align-items-center p-3 mb-5">
          <div className="d-flex ">
            <Button color="green" onClick={toggleNewLocationModal}>
              Post New
            </Button>
            <Link to="/plan-a-trip">
              <Button>Plan A Trip</Button>
            </Link>
          </div>
          <div
            style={{ transform: "scale(0.9)", cursor: "pointer" }}
            className="text-center"
            onClick={togglePointsModal}
          >
            <h3 style={{ color: "#e9a009" }}>Travaye Points</h3>
            <strong>80 Points</strong>
          </div>
        </div>
        <div>
          {showLocationModal && (
            <LocationModal onClick={toggleShowLocationModal} />
          )}
          {newLocationModal && <NewLocation onClick={toggleNewLocationModal} />}
          {showPointsModal && <PointsModal onClick={togglePointsModal} />}
          <LocationBox onClick={toggleShowLocationModal} />
          {/* <LocationBox /> <LocationBox /> <LocationBox /> <LocationBox />{" "}
          <LocationBox /> <LocationBox /> <LocationBox /> <LocationBox />{" "}
          <LocationBox /> */}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

const Dashboard = (
  <>
    <img src={Avatar} alt="avatar" />
    <div className={classes.info}>
      <h3 className="mt-1">Kenny Olu-Onifade</h3>
      <h4>@kaizenschmoney</h4>
      <h4>University Student</h4>
    </div>
    <div>
      <div>
        <h5>About</h5>
        <p>
          Civil Engineer (In View) // <br /> Creative Director at Kaizen Brand
          // <br /> Chelsea FC Fanatic
        </p>
      </div>
      <div>
        <h5>Total Outings</h5>
        <p>27 Outings</p>
      </div>
      <div>
        <h5>Total Posts</h5>
        <p>6 Posts</p>
      </div>
      <div>
        <h5>Average Review</h5>
        <p>4.5 stars</p>
      </div>
    </div>
  </>
);
