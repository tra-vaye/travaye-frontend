import CloseIcon from "@mui/icons-material/Close";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../../assets/user-avatar.png";
import { Button } from "../../components/UI/Buttons";
import LocationBox from "../../components/UI/Location/LocationBox";
import LocationModal from "../../components/UI/Modal/LocationModal";
import NewLocation from "../../components/UI/Modal/NewLocation";
import PointsModal from "../../components/UI/Modal/PointsModal";
import { useGetMeQuery } from "../../redux/Api/authApi";
import { useGetLocationsQuery } from "../../redux/Api/locationApi";

const BusinessProfile = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [newLocationModal, setNewLocationModal] = useState(false);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const userType = useSelector((state) => state.auth.userType);
  const navigate = useNavigate();
  const toggleShowLocationModal = () => {
    setShowLocationModal((prevState) => !prevState);
  };
  const toggleNewLocationModal = () => {
    setNewLocationModal((prevState) => !prevState);
  };

  const togglePointsModal = () => {
    setShowPointsModal((prevState) => !prevState);
  };
  const [firstVisit, setFirstVisit] = useState(true);

  const toggleDashboard = () => {
    setShowDashboard((prevState) => !prevState);
  };
  const [locations, setLocations] = useState([]);
  const location = useLocation();
  const { data, isError, error, isSuccess } = useGetLocationsQuery(1, 10);

  const {
    data: userData,
    isSuccess: userSuccess,
    refetch: refetchUserData,
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
  }, [data, error?.error, isError, isSuccess]);
  useEffect(() => {
    // Fetch data again when the page is revisited
    refetchUserData();
  }, [location.pathname, refetchUserData]);
  useEffect(() => {
    if (userSuccess) {
      setUserInfo(userData?.user);
      if (userData?.user?.businessVerified === "verified") {
        navigate(`/${userType}`);
      } else if (userData?.user?.businessVerified === "pending") {
        notification.warning({
          message: " Business Verification Pending",
          duration: 3,
          placement: "bottomRight",
        });
        navigate(`/${userType}`);
        refetchUserData();
      } else if (userData?.user?.businessVerified === "false") {
        notification.error({
          message: " Business not Verified ",
          duration: 3,
          placement: "bottomRight",
        });
        refetchUserData();

        // Navigate to the verification page
        navigate("/register");
      }
    }
  }, [userSuccess, userData?.user, navigate, userType, refetchUserData]);

  // const userLikedLocations = userData?.user?.likedLocations?.map(
  //   (likedLocationName) =>
  //     locations?.find((location) => location.locationName === likedLocationName)
  // );

  // const userId = sessionStorage.getItem("user_id");
  // const userLocations = locations?.filter((location) => {
  //   return location.locationAddedBy === userId;
  // });

  // let content;

  // if (userLocations?.length < 1) {
  //   content = <p>No Location Added Yet</p>;
  // } else {
  //   content = userLocations?.map((location, i) => {
  //     return <LocationBox location={location} key={i} />;
  //   });
  // }

  return (
    <Container>
      <Dashboard showDashboard={showDashboard}>
        <Profile close={true}>
          <CloseIcon onClick={toggleDashboard} />
        </Profile>

        <img src={Avatar} alt="avatar" />
        <div>
          <h5 className="mt-5">{userInfo?.businessName}</h5>
          <h6 className="mt-1" usernamame={true}>
            {`${userInfo?.businessEmail}`}
          </h6>
          <h6 className="mt-1">{`${userInfo?.businessCategory}`}</h6>
        </div>
        <div>
          <div>
            <h5 className="mt-1 px-1">
              {userInfo?.address ? userInfo?.address : "No Address Provided"}
            </h5>
            <p className="mt-1">
              {userInfo?.occupation
                ? userInfo?.occupation
                : "  No Occupation Provided"}
            </p>
          </div>
          {!userInfo?.businessName && (
            <div className="mt-1">
              <h5>Total Outings</h5>
              <p>27 Outings</p>
            </div>
          )}
          <div className="mt-1">
            <h5>{userInfo?.fullName ? "Total Posts" : "User Visits"}</h5>
            <p>{userInfo?.fullName ? "6 Posts" : "null"}</p>
          </div>
          <div className="mt-1">
            <h5>Average Review</h5>
            <p>4.5 stars</p>
          </div>
        </div>
      </Dashboard>
      <Main>
        <div className="">
          <div>
            <H3 color="#009f57" fontSize="30" fontWeight="700">
              Your Profile
            </H3>
          </div>
          {/* Check the length of businessLocationImages array */}
          {userInfo?.businessLocationImages &&
            userInfo?.businessLocationImages.length > 0 && (
              <div className="grid grid-cols-3 grid-rows-2 gap-4 h-auto p-3">
                {userInfo?.businessLocationImages.length === 1 ? (
                  // If there is only one image, render a single image
                  <img
                    src={userInfo?.businessLocationImages[0]}
                    alt="Location"
                    class="col-span-2 object-contain w-[100%]"
                  />
                ) : (
                  // If there are more than one images, render a grid of three images
                  userInfo?.businessLocationImages
                    .slice(0, 3)
                    .map((image, index) => (
                      <img
                        class={`${
                          index === 0
                            ? `col-start-1 col-end-3 `
                            : `col-start-3 col-end-4 row-start-2 w-full`
                        } object-contain`}
                        key={index}
                        src={image}
                        alt={`Location ${index + 1}`}
                      />
                    ))
                )}
              </div>
            )}

          <div>
            {" "}
            <Button color="green" onClick={toggleNewLocationModal}>
              Post New Location
            </Button>
          </div>
        </div>
        <BoxContainer>
          {showLocationModal && (
            <LocationModal onClick={toggleShowLocationModal} />
          )}
          <NewLocation open={newLocationModal} setOpen={setNewLocationModal} />
        </BoxContainer>
      </Main>
    </Container>
  );
};

export default BusinessProfile;

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

  height: calc(100vh - 95px);
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
  width: 30%;
  height: 100%;

  overflow-y: hidden;
  background-color: rgb(255, 254, 252);
  border-top: 0;
  border-right: 2px solid transparent;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
  padding-top: 70px;
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
const H3 = styled.h3`
  color: ${(props) => props.color};
  font-weight: ${(props) => `${props.fontWeight}`};
  font-size: ${(props) => `${props.fontSize}px`};
`;
const Main = styled.div`
  width: 100%;
  min-height: auto;
  margin-left: 0;
  padding: 20px 40px;
  overflow: scroll;

  @media (max-width: 1150px) {
    margin-left: 0;
    width: 100%;
  }
`;
