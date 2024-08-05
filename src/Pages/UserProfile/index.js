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
import { useGetLocationsQuery } from "../../redux/Api/locationApi";
import { notification, Spin } from "antd";
import { useGetMeQuery, useUpdateProfilePhotoMutation } from "../../redux/Api/authApi";
import { IoIosCamera } from "react-icons/io";
import NewLocation from "../../components/UI/Modal/NewLocation";
import ChatIcon from "../../assets/Icons/ChatIcon";
import { Dashboard, Main } from "../BusinessProfile/BusinessProfile";
import ScanIcon from "../../assets/Icons/ScanIcon";
import SupportModal from "../../components/UI/Modal/SupportModal";
import AdvertModal from "../../components/UI/Modal/AdvertModal";

const UserProfile = () => {
  const [updateProfile, { isLoading: updatingPhoto }] = useUpdateProfilePhotoMutation();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showAdvertModal, setShowAdvertModal] = useState(true);
  const [newLocationModal, setNewLocationModal] = useState(false);
  // const [showPointsModal, setShowPointsModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const userType = useSelector((state) => state.auth.userType);

  const toggleShowLocationModal = () => {
    setShowLocationModal((prevState) => !prevState);
  };
  const toggleShowAdvertModal = () => {
    setShowAdvertModal((prevState) => !prevState);
  };
  const toggleNewLocationModal = () => {
    setNewLocationModal((prevState) => !prevState);
  };
  const navigate = useNavigate();
  // const togglePointsModal = () => {
  //   setShowPointsModal((prevState) => !prevState);
  // };
  const [firstVisit, setFirstVisit] = useState(true);
  const toggleDashboard = () => {
    setShowDashboard((prevState) => !prevState);
  };
  const [locations, setLocations] = useState([]);

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
    // categories: selectedCategories
    //   .map((category) => category.toLowerCase().replace(/\s+/g, "-"))
    //   .join(","),
    // locationCity: selectedFilters.join(","),
  });
  const location = useLocation();
  const {
    data: userData,
    isSuccess: userSuccess,
    refetch: refetchUserData,
    isLoading: isFetching,
  } = useGetMeQuery({
    userType: userType,
  });
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (isSuccess) {
      setLocations(data?.data);
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
    if (userSuccess) {
      setUserInfo(userData?.user);
    }
  }, [userData?.user]);

  useEffect(() => {
    // Check if it's the first visit
    if (firstVisit) {
      // Set firstVisit to false after the initial render
      setFirstVisit(false);
    } else {
      // Fetch data again when the page is revisited
      refetchLocations();
    }
  }, [location.pathname, firstVisit, refetchLocations]);
  const userLikedLocations = userData?.likedLocations;

  // Filter out any undefined values in case a location name doesn't match any location
  const filteredUserLikedLocations = userLikedLocations?.filter(Boolean) || [];

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
            src={userInfo?.profilePhoto || Avatar}
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
        <div className="mb-3 -mt-2">
          <h2 className="mt-1 text-black text-2xl font-semibold text-center mb-0">{`${userInfo?.fullName}`}</h2>
          <h6 className="text-[#E9A309] text-lg">{`@${userInfo?.username}`}</h6>
          <p className="mt-0">{userInfo?.occupation || "No Occupation Provided"}</p>
        </div>
        <div>
          <div>
            <h5 className="mb-1">About</h5>
            <h6>{userInfo?.about || "No User bio"}</h6>
          </div>
          <div className="mt-4">
            <h5>Total Outings</h5>
            <h6>27 Outings</h6>
          </div>
          <div className="mt-4">
            <h5>{userInfo?.fullName ? "Total Posts" : "User Visits"}</h5>
            <h6>{userInfo?.fullName ? "6 Posts" : "null"}</h6>
          </div>
          <div className="mt-4">
            <h5>Average Review</h5>
            <h6>4.5 stars</h6>
          </div>
        </div>
      </Dashboard>
      <Main>
        <button className="absolute right-9 bottom-8 shadow-md rounded-full" onClick={() => setShowSupportModal(true)}>
          <ChatIcon />
        </button>
        <button className="absolute right-9 bottom-24 p-2.5 bg-[#FDEECE] rounded-full shadow-md">
          <ScanIcon />
        </button>
        <div className="d-flex justify-content-between align-items-center mb-5 mt-3">
          <Profile onClick={toggleDashboard}>
            <AccountCircleIcon />
          </Profile>
          <div className="flex justify-start items-center gap-[0.3rem]">
            <Link to="/create-event">
              <Button color="green">
                Create an Event
              </Button>
            </Link>
            <Link to="/plan-a-trip">
              <Button>Plan A Trip</Button>
            </Link>
            <button
              className="text-[#E9A309] font-semibold underline !scale-100"
              onClick={() => navigate('/settings')}
            >
              Settings{">"}
            </button>
          </div>
          <Button color="green" onClick={toggleNewLocationModal}>
            Created Events
          </Button>
        </div>
        <BoxContainer>
          {showAdvertModal && (
            <AdvertModal onClick={toggleShowAdvertModal} />
          )}
          {showLocationModal && (
            <LocationModal onClick={toggleShowLocationModal} />
          )}
          {showSupportModal && (
            <SupportModal username={userInfo?.username} onClick={() => setShowSupportModal((prev) => !prev)} />
          )}
          {newLocationModal && <NewLocation onClick={toggleNewLocationModal} />}
          {/* {showPointsModal && <PointsModal onClick={togglePointsModal} />} */}
          {
            filteredUserLikedLocations.length < 1 ?
              <p>
                No Liked Locations Yet,{" "}
                <Button onClick={() => navigate(`/business-locations`)}>
                  Add some here{" "}
                </Button>{" "}
              </p>
            : <GridContainer>
                {filteredUserLikedLocations.map((location, i) => (
                    <LocationBox
                      onClick={() => {
                        navigate(`/location/${location?._id}`);
                      }}
                      location={location}
                      key={i}
                    />
                  )
                )};
              </GridContainer>
          }
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
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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

// const Dashboard = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   align-items: center;
//   text-align: center;
//   width: 320px;
//   height: 100vh;
//   position: fixed;
//   top: 0;
//   left: 0;
//   background-color: rgb(255, 254, 252);
//   border-top: 0;
//   border-right: 2px solid transparent;
//   box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
//   padding-top: 100px;

//   z-index: 10;
//   &:nth-child(5) div {
//     margin-top: 1rem;
//   }
//   img {
//     width: 150px;
//     height: 150px;
//   }
//   h5 {
//     color: #009f57;
//     font-weight: 700;
//   }
//   svg {
//     display: none;
//   }
//   @media (max-width: 1150px) {
//     display: ${(props) => (props.showDashboard ? "block" : "none")};
//     padding-top: 100px;
//     svg {
//       display: block;
//     }
//   }
// `;

// const Main = styled.div`
//   width: 70%;
//   margin-left: 30%;
//   min-height: 100vh;
//   @media (max-width: 1150px) {
//     margin-left: 0;
//     width: 100%;
//   }
// `;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    place-items: center;
  }
`;