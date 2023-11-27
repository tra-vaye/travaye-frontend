import CloseIcon from "@mui/icons-material/Close";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { FiveStars, FourStars } from "../../components/UI/svgs/svgs";
// import classes from "";

import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../../assets/user-avatar.png";
import { Button } from "../../components/UI/Buttons";
import LocationModal from "../../components/UI/Modal/LocationModal";
import NewLocation from "../../components/UI/Modal/NewLocation";
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

  // const {
  //   data: userData,
  //   isSuccess: userSuccess,
  //   refetch: refetchUserData,
  // } = useGetMeQuery({
  //   userType: userType,
  // });
  const userData = useSelector((store) => store.auth.user);
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
    // refetchUserData();
  }, [location.pathname]);
  useEffect(() => {
    // if (userSuccess) {
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
      // refetchUserData();
    } else if (userData?.user?.businessVerified === "false") {
      notification.error({
        message: " Business not Verified ",
        duration: 3,
        placement: "bottomRight",
      });
      // refetchUserData();

      // Navigate to the verification page
      navigate("/register");
    }
    // }
  }, [userData?.user, navigate, userType]);

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
            <H3 color="#009f57" fontSize="30" fontWeight="700" className="mb-2">
              Your Profile
            </H3>
          </div>
          {/* Check the length of businessLocationImages array */}
          {userInfo?.businessLocationImages &&
            userInfo?.businessLocationImages.length > 0 && (
              <div className="md:grid md:grid-cols-3  gap-3 flex flex-wrap flex-auto h-auto">
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
                    .slice(0, 4)
                    .map((image, index) => (
                      <img
                        key={index}
                        className={`${
                          index === 0
                            ? "col-span-2 md:row-span-2"
                            : "col-span-1 w-full"
                        } object-contain rounded-lg`}
                        src={image}
                        alt={`Location ${index + 1}`}
                      />
                    ))
                )}
              </div>
            )}

          <div>
            {" "}
            <ReviewContainer className="col-md-6 px-3 my-4">
              <div className="d-flex justify-content-between mb-4 items-center mt-3">
                <ReviewH4 className="text-2xl font-bold">Reviews</ReviewH4>
                <div className="flex gap-0 md:gap-4 flex-col md:flex-row">
                  <p className="text-black font-medium">Average Rating</p>{" "}
                  <i>{FourStars}</i>
                </div>
              </div>
              <Review>
                <ReviewCard>
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
                    <ReviewUser
                    // className={classes.user}
                    >
                      <img src={Avatar} className="img-fluid  me-2" alt="pfp" />
                      <p className="mt-1" style={{ color: "#009f57" }}>
                        Kehinde Olu-Onifade
                      </p>
                    </ReviewUser>
                  </div>
                </ReviewCard>
                <ReviewCard>
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
                    <ReviewUser
                    // className={classes.user}
                    >
                      <img src={Avatar} className="img-fluid  me-2" alt="pfp" />
                      <p className="mt-1" style={{ color: "#009f57" }}>
                        Kehinde Olu-Onifade
                      </p>
                    </ReviewUser>
                  </div>
                </ReviewCard>
              </Review>
            </ReviewContainer>
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
  overflow: auto;
  ::-webkit-scrollbar {
    width: 12px; /* Set the width of the scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #9d9d9d;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: #d9d9d9;
  }
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
  height: calc(100vh - 95px);

  overflow: auto;
  background-color: rgb(255, 254, 252);
  border-top: 0;
  border-right: 2px solid transparent;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16);
  padding-top: 70px;
  z-index: 10;
  ::-webkit-scrollbar {
    width: 12px; /* Set the width of the scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #9d9d9d;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: #d9d9d9;
  }
  &:nth-child(5) div {
    margin-top: 1rem;
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
  overflow: auto;
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #9d9d9d;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: #d9d9d9;
  }

  @media (max-width: 1150px) {
    margin-left: 0;
    width: 100%;
  }
`;
const ReviewContainer = styled.div``;
const ReviewH4 = styled.h4`
  color: #009f57;
`;
const Review = styled.div`
  max-height: 50vh;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #9d9d9d;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: #d9d9d9;
  }
`;
const ReviewCard = styled.div`
  background: #ffffff;
  border: 2px solid rgba(0, 159, 87, 0.5);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  p {
    color: #9d9d9d;
    font-weight: 600;
    font-size: 15px;
    line-height: 24px;
  }
`;
const ReviewUser = styled.div`
  display: flex;
  img {
    width: 40px;
    height: 40px;
  }
`;
