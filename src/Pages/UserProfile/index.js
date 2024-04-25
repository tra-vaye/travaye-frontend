import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../../assets/user-avatar.png";
import { Button } from "../../components/UI/Buttons";
import LocationBox from "../../components/UI/Location/LocationBox";
import LocationModal from "../../components/UI/Modal/LocationModal";
import PointsModal from "../../components/UI/Modal/PointsModal";
import { useGetLocationsQuery } from "../../redux/Api/locationApi";
import { notification, Spin } from "antd";
import { useUpdateProfilePhotoMutation } from "../../redux/Api/authApi";
import { IoIosCamera } from "react-icons/io";

const UserProfile = () => {
  const [updateProfile, { isLoading: updatingPhoto }] =
    useUpdateProfilePhotoMutation();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [newLocationModal, setNewLocationModal] = useState(false);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const userType = useSelector((state) => state.auth.userType);

  const toggleShowLocationModal = () => {
    setShowLocationModal((prevState) => !prevState);
  };
  const toggleNewLocationModal = () => {
    setNewLocationModal((prevState) => !prevState);
  };
  const navigate = useNavigate();
  const togglePointsModal = () => {
    setShowPointsModal((prevState) => !prevState);
  };
  const [firstVisit, setFirstVisit] = useState(true);
  const toggleDashboard = () => {
    setShowDashboard((prevState) => !prevState);
  };
  const [locations, setLocations] = useState([]);

  const [selectedCategories, updateSelectedCategories] = useState([]);
  const [selectedFilters, updateSelectedFilters] = useState([]);

  // Categories and locationCity are queries for the backend and they are in array formats
  // I am joining every element in the array using .join() to make the request query a single query in a request to avoid server overload
  // and making replacing spaces with hyphens and making them lowercase

  const {
    data,
    isError,
    error,
    isSuccess,
    refetch: refetchLocations,
    isLoading,
  } = useGetLocationsQuery({
    page: 1,
    count: 10,
    categories: selectedCategories
      .map((category) => category.toLowerCase().replace(/\s+/g, "-"))
      .join(","),
    locationCity: selectedFilters.join(","),
  });
  const location = useLocation();
  // const {
  //   data: userData,
  //   isSuccess: userSuccess,
  //   refetch: refetchUserData,
  //   isLoading: isFetching,
  // } = useGetMeQuery({
  //   userType: userType,
  // });
  const userData = useSelector((store) => store.auth.user).payload;
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (isSuccess) {
      setLocations(data?.data);
      console.log(locations);
    }
    if (isError) {
      notification.error({
        message: error?.error,
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [data, error?.error, isError, isSuccess, locations]);

  useEffect(() => {
    // if (userSuccess) {
    setUserInfo(userData?.user);
    // }
  }, [userData?.user]);

  useEffect(() => {
    // Check if it's the first visit
    if (firstVisit) {
      // Set firstVisit to false after the initial render
      setFirstVisit(false);
    } else {
      // Fetch data again when the page is revisited
      refetchLocations();
      // refetchUserData();
    }
  }, [location.pathname, firstVisit, refetchLocations]);
  const userLikedLocations = userData?.likedLocations;

  // Filter out any undefined values in case a location name doesn't match any location
  const filteredUserLikedLocations = userLikedLocations?.filter(Boolean) || [];

  console.log(locations);
  let content;

  if (filteredUserLikedLocations.length < 1) {
    content = (
      <p>
        No Liked Locations Yet,{" "}
        <Button onClick={() => navigate(`/business-locations`)}>
          Add some here{" "}
        </Button>{" "}
      </p>
    );
  } else {
    content = filteredUserLikedLocations.map((location, i) => {
      return (
        <LocationBox
          onClick={() => {
            navigate(`/location/${location?._id}`);
          }}
          location={location}
          key={i}
        />
      );
    });
  }

  return (
    <Container>
      <Dashboard showDashboard={showDashboard}>
        <Profile close={true}>
          <CloseIcon onClick={toggleDashboard} />
        </Profile>

        <div className="relative">
          {updatingPhoto && (
            <Spin className="absolute bottom-[50%] left-[50%]" />
          )}
          <img
            className="rounded-full w-[150px] h-[150px]"
            src={userData?.profilePhoto || Avatar}
            alt="avatar"
          />
          <label htmlFor="photo">
            <IoIosCamera className="text-black text-[25px] absolute bottom-[15%] right-[5%] cursor-pointer !block" />
          </label>
          <input
            onChange={(e) => {
              const profileData = new FormData();
              profileData.append("picture", e.target.files[0]);
              updateProfile(profileData);
            }}
            id="photo"
            accept="image/*"
            type="file"
            className="hidden"
          />
        </div>
        <div>
          <h5 className="mt-1">{`${userData?.fullName}`}</h5>
          <h6 usernamame={true}>{`@${userData?.username}`}</h6>
          <h6>University Student</h6>
        </div>
        <div>
          <div>
            <h5>
              {userData?.address ? userData?.address : "No Address Provided"}
            </h5>
            <p>
              {userData?.occupation
                ? userData?.occupation
                : "  No Occupation Provided"}
            </p>
          </div>
          <div>
            <h5>Total Outings</h5>
            <p>27 Outings</p>
          </div>
          <div>
            <h5>{userData?.fullName ? "Total Posts" : "User Visits"}</h5>
            <p>{userData?.fullName ? "6 Posts" : "null"}</p>
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
          <div className="flex justify-start items-center gap-[0.3rem]">
            {/* <Button color="green" onClick={toggleNewLocationModal}>
              Post New
            </Button> */}
            <Link to="/plan-a-trip">
              <Button>Plan A Trip</Button>
            </Link>
            <a
              target="_blank"
              href="https://www.travaye.ng/create-event"
              className="bg-[#009F57] px-[4px] font-[600] h-[2.5rem] rounded-[10px] flex items-center justify-center text-[15px] text-[#f0f0f0]"
            >
              <p>Create Event</p>
            </a>
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
          {/* {newLocationModal && <NewLocation onClick={toggleNewLocationModal} />} */}
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
