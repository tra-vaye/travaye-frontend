import Avatar from "../../assets/user-avatar.png";
import { Button } from "../../components/UI/Buttons";
import LocationBox from "../../components/UI/Location/LocationBox";
import { useEffect, useState } from "react";
import LocationModal from "../../components/UI/Modal/LocationModal";
import NewLocation from "../../components/UI/Modal/NewLocation";
import PointsModal from "../../components/UI/Modal/PointsModal";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useGetLocationsQuery } from "../../redux/Api/locationApi";
import { notification } from "antd";
import { useGetMeQuery } from "../../redux/Api/authApi";

const UserProfile = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [newLocationModal, setNewLocationModal] = useState(false);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const toggleShowLocationModal = () => {
    setShowLocationModal((prevState) => !prevState);
  };
  const toggleNewLocationModal = () => {
    setNewLocationModal((prevState) => !prevState);
  };

  const togglePointsModal = () => {
    setShowPointsModal((prevState) => !prevState);
  };

  const toggleDashboard = () => {
    setShowDashboard((prevState) => !prevState);
  };
  const [locations, setLocations] = useState([]);

  const { data, isError, error, isSuccess } = useGetLocationsQuery(1, 10);

  const { data: userData, isSuccess: userSuccess } = useGetMeQuery();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (isSuccess || userSuccess) {
      setLocations(data?.data);
      setUserInfo(userData?.user);
    }
    if (isError) {
      notification.error({
        message: error?.error,
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [data, error?.error, isError, isSuccess, userSuccess]);

  const userId = sessionStorage.getItem("user_id");
  const userLocations = locations?.filter((location) => {
    return location.locationAddedBy === userId;
  });

  let content;

  if (userLocations?.length < 1) {
    content = <p>No Location Added Yet</p>;
  } else {
    content = userLocations?.map((location, i) => {
      return <LocationBox location={location} key={i} />;
    });
  }

  return (
    <Container>
      <Dashboard showDashboard={showDashboard}>
        <Profile close={true}>
          <CloseIcon onClick={toggleDashboard} />
        </Profile>

        <img src={Avatar} alt="avatar" />
        <div>
          <h5 className="mt-1">
            {`${userInfo?.fullName} | ${userInfo?.username}` ||
              userInfo?.businessName}
          </h5>
          <h6 usernamame={true}>
            {`${userInfo?.email}` || `@${userInfo?.username}`}
          </h6>
          <h6>University Student</h6>
        </div>
        <div>
          <div>
            <h5>
              {userInfo?.address ? userInfo?.address : "No Address Provided"}
            </h5>
            <p>
              {userInfo?.occupation
                ? userInfo?.occupation
                : "  No Occupation Provided"}
            </p>
          </div>
          {!userInfo?.businessName && (
            <div>
              <h5>Total Outings</h5>
              <p>27 Outings</p>
            </div>
          )}
          <div>
            <h5>{userInfo?.fullName ? "Total Posts" : "User Visits"}</h5>
            <p>{userInfo?.fullName ? "6 Posts" : "null"}</p>
          </div>
          <div>
            <h5>Average Review</h5>
            <p>4.5 stars</p>
          </div>
        </div>
      </Dashboard>
      <Main>
        <div className="d-flex justify-content-between align-items-center mb-5 mt-3">
          <Profile onClick={toggleDashboard}>
            <AccountCircleIcon />
          </Profile>
          <div className="d-flex justify-content-between">
            <Button color="green" onClick={toggleNewLocationModal}>
              Post New
            </Button>
            <Link to="/plan-a-trip">
              <Button>Plan A Trip</Button>
            </Link>
          </div>
          <div
            style={{ transform: "scale(0.7)", cursor: "pointer" }}
            className="text-center"
            onClick={togglePointsModal}
          >
            <h3 style={{ color: "#e9a009" }}>Travaye Points</h3>
            <strong>80 Points</strong>
          </div>
        </div>
        <BoxContainer>
          {showLocationModal && (
            <LocationModal onClick={toggleShowLocationModal} />
          )}
          {newLocationModal && <NewLocation onClick={toggleNewLocationModal} />}
          {showPointsModal && <PointsModal onClick={togglePointsModal} />}
          {content}
        </BoxContainer>
      </Main>
    </Container>
  );
};

export default UserProfile;

const Profile = styled.i`
  margin-right: 10px;
  margin-left: 10px;

  svg {
    transform: scale(${(props) => !props.close && "1.5"});
    cursor: pointer;
  }
  @media (min-width: 1151px) {
    display: none;
  }
`;
const BoxContainer = styled.div`
  @media (max-width: 532px) {
    display: grid;
    place-items: center;
  }
`;

const Container = styled.div`
  display: flex;
  background-color: #c4c5c72d;
  a {
    text-decoration: none;
  }
  button {
    transform: scale(0.7);
  }
`;

const Dashboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 320px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(255, 254, 252);
  border-top: 0;
  border-right: 2px solid transparent;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
  padding-top: 120px;

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
  svg {
    display: none;
  }
  @media (max-width: 1150px) {
    display: ${(props) => (props.showDashboard ? "block" : "none")};
    padding-top: 100px;
    svg {
      display: block;
    }
  }
`;

const Main = styled.div`
  width: 70%;
  margin-left: 30%;
  min-height: 100vh;
  @media (max-width: 1150px) {
    margin-left: 0;
    width: 100%;
  }
`;