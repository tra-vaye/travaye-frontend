import Avatar from "../../assets/user-avatar.png";
import { Button } from "../../components/UI/Buttons";
import LocationBox from "../../components/UI/Location/LocationBox";
import { useState } from "react";
import LocationModal from "../../components/UI/Modal/LocationModal";
import NewLocation from "../../components/UI/Modal/NewLocation";
import PointsModal from "../../components/UI/Modal/PointsModal";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
    <Container>
      <Dashboard>{DashboardContent}</Dashboard>
      <Main>
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
        </div>
      </Main>
    </Container>
  );
};

export default UserProfile;

const DashboardContent = (
  <>
    <img src={Avatar} alt="avatar" />
    <div>
      {/*  indo */}
      <h5 className="mt-1">Kenny Olu-Onifade</h5>
      <h6 usernamame={true}>@kaizenschmoney</h6>
      <h6>University Student</h6>
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

const Container = styled.div`
  display: flex;
  background-color: #c4c5c72d;
  a {
    text-decoration: none;
  }
`;

const Dashboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 25%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(255, 254, 252);
  border-top: 0;
  border-right: 2px solid transparent;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
  padding-top: 8%;
  z-index: 10;
  &:nth-child(5) div {
    margin-top: 1rem;
  }
  img {
    width: 150px;
    height: 150px;
  }
  h5 {
    color: #009f57;
    font-weight: 700;
  }
  @media (max-width: 1150px) {
    display: none;
  }
`;

const Info = styled.div`
  transform: scale(0.8);
`;

const Main = styled.div`
  width: 70%;
  margin-left: 25%;
  min-height: 100vh;
  @media (max-width: 1150px) {
    .main {
      margin-left: 0;
      width: 100%;
    }
  }
`;

// .info :nth-child(2) {
//   color: #e9a009;
// }

// .info :last-child {
//   color: #9d9d9d;
// }
