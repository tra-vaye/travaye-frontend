import CloseIcon from "@mui/icons-material/Close";
import { Image, notification, Spin } from "antd";
import { useEffect, useState } from "react";
import { FiveStars, FourStars } from "../../components/UI/svgs/svgs";
// import classes from "";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../../assets/user-avatar.png";
import { Button } from "../../components/UI/Buttons";
import LocationModal from "../../components/UI/Modal/LocationModal";
import NewLocation from "../../components/UI/Modal/NewLocation";
import { useGetLocationsQuery } from "../../redux/Api/locationApi";
import { useGetMeQuery, useUpdateProfilePhotoMutation } from "../../redux/Api/authApi";
import { IoIosCamera } from "react-icons/io";

const BusinessProfile = () => {
  const [updateProfile, { isLoading }] = useUpdateProfilePhotoMutation();
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
  const [firstVisit, setFirstVisit] = useState(true);

  const toggleDashboard = () => {
    setShowDashboard((prevState) => !prevState);
  };
  const [selectedCategories, updateSelectedCategories] = useState([]);
  const [selectedFilters, updateSelectedFilters] = useState([]);
  const [locations, setLocations] = useState([]);
  const location = useLocation();
  const { data, isError, error, isSuccess } = useGetLocationsQuery({
    page: 1,
    count: 10,
    categories: selectedCategories
      .map((category) => category.toLowerCase().replace(/\s+/g, "-"))
      .join(","),
    locationCity: selectedFilters.join(","),
  });
  const [userData, setuserData] = useState({});
  const {
    data: businessData
    // isSuccess:,
    // isLoading,
    // refetch,
  } = useGetMeQuery({ userType });

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
  }, [data, error, isError, isSuccess, locations]);

  useEffect(() => {
    console.log(businessData);
    setuserData(businessData.user);
    if (userData) {
      if (userData?.businessVerified === "verified") {
        navigate(`/${userType}`);
      } else if (userData?.businessVerified === "pending") {
        notification.warning({
          message: " Business Verification Pending",
          duration: 3,
          placement: "bottomRight",
        });
        navigate(`/${userType}`);
        // refetchUserData();
      } else if (userData?.businessVerified === "false") {
        notification.error({
          message: " Business not Verified ",
          duration: 3,
          placement: "bottomRight",
        });
        // refetchUserData();

        // Navigate to the verification page
        // navigate("/register");
      }
    }
  }, [userData, navigate, userType]);

  const userLikedLocations = userData?.user?.likedLocations?.map((likedLocationName) =>
    locations?.find((location) => location.locationName === likedLocationName)
  );

  const userId = sessionStorage.getItem("user_id");
  const userLocations = locations?.filter((location) => {
    return location.locationAddedBy === userId;
  });

  // let allReviews = [];
  // locations?.map((location) => {
  //   if (location.locationAddedBy === userData._id) {
  //     allReviews = [...allReviews, ...location?.reviews];
  //   }
  // });

  return (
    <Container>
      <Dashboard showDashboard={showDashboard}>
        <Profile close={true}>
          <CloseIcon onClick={toggleDashboard} />
        </Profile>
        <div className="relative">
          {isLoading && <Spin className="absolute bottom-[50%] left-[50%]" />}
          <img
            className="rounded-full"
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
          <h4 className="mt-3">{userData?.businessName}</h4>
          <h6 className="mt-2 text-[#E9A309] text-lg">{userData?.businessEmail}</h6>
          <h6 className="mt-1">{`${userData?.businessCategory
            ?.split("-")
            ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}`}</h6>
        </div>
        <div>
          <div>
            <h5 className="mt-1 px-1">{userData?.address}</h5>
            <p className="mt-1">
              {userData?.occupation
                ? userData?.occupation
                : "  No Occupation Provided"}
            </p>
          </div>
          {!userData?.businessName && (
            <div className="mt-1">
              <h5>Total Outings</h5>
              <p>27 Outings</p>
            </div>
          )}
          <div className="mt-1">
            <h5>{userData?.fullName ? "Total Posts" : "User Visits"}</h5>
            <p>{userData?.fullName ? "6 Posts" : "null"}</p>
          </div>
          <div className="mt-1">
            <h5>Average Review</h5>
            <p>4.5 stars</p>
          </div>
        </div>
      </Dashboard>
      <Main>
        <div className="">
          <Profile onClick={toggleDashboard}>
            <AccountCircleIcon />
          </Profile>
          <div className="flex items-center justify-between">
            <H3 color="#009f57" fontSize="30" fontWeight="700" className="mb-2">
              Your Profile
            </H3>
            <button
              className="text-[#E9A309] font-semibold underline !scale-100"
              onClick={() => navigate('/settings')}
            >
              Settings{">"}
            </button>
          </div>
          {/* Check the length of businessLocationImages array */}
          {userData?.businessLocationImages &&
            userData?.businessLocationImages?.length > 0 && (
              <div className="md:grid md:grid-cols-3  gap-3 flex flex-wrap flex-auto h-auto">
                {userData?.businessLocationImages?.length === 1 ? (
                  // If there is only one image, render a single image
                  <Image
                    src={userData?.businessLocationImages[0]}
                    alt="Location"
                    class="col-span-2 object-contain w-[100%]"
                  />
                ) : (
                  // If there are more than one images, render a grid of three images
                  userData?.businessLocationImages
                    .slice(0, 3)
                    .map((image, index) => (
                      <div
                        className={`${
                          index === 0
                            ? "col-span-2 md:row-span-2"
                            : "col-span-1 w-full"
                        } object-cover rounded-lg`}
                      >
                        <Image
                          key={index}
                          src={image}
                          alt={`Location ${index + 1}`}
                        />
                      </div>
                    ))
                )}
              </div>
            )}

          <div>
            {" "}
            <ReviewContainer
              className={`${
                userType !== "user" ? `w-full` : `px-3`
              } col-md-6  my-4 `}
            >
              <div className="d-flex justify-content-between mb-4 items-center mt-3">
                <ReviewH4 className="text-2xl font-bold">Reviews</ReviewH4>
                <div className="flex gap-2 md:gap-4 flex-col md:flex-row">
                  <p className="text-black font-medium">Average Rating</p>{" "}
                  <i>{FourStars}</i>
                </div>
              </div>
              <Review className={`flex flex-wrap gap-4 flex-1`}>
                {userData?.reviews?.length > 0 ? (
                  userData?.reviews?.map((review, i) => {
                    return (
                      <ReviewCard className="flex-[1_0_30%]" key={i}>
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <ReviewUser>
                              <img
                                src={Avatar}
                                className="img-fluid "
                                alt="pfp"
                              />
                              <p className="" style={{ color: "#009f57" }}>
                                {review?.reviewerFullname}
                              </p>
                            </ReviewUser>
                            <i>{FiveStars}</i>
                          </div>

                          <p>{review?.reviewDescription}</p>
                        </div>
                        <div>
                          <div className="flex flex-wrap gap rounded-lg overflow-hidden mt-3 flex-container">
                            <Image.PreviewGroup
                              preview={{
                                onChange: (current, prev) =>
                                  console.log(
                                    `current index: ${current}, prev index: ${prev}`
                                  ),
                              }}
                            >
                              {review?.reviewImagePaths?.map((image, key) => {
                                return (
                                  <div className={`flex-[1_0_30%] `}>
                                    <Image
                                      src={image}
                                      width={"100%"}
                                      height={150}
                                      className=" object-cover"
                                    />
                                  </div>
                                );
                              })}
                            </Image.PreviewGroup>
                          </div>
                        </div>
                      </ReviewCard>
                    );
                  })
                ) : (
                  <p>No reviews yet</p>
                )}
              </Review>
            </ReviewContainer>
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
    width: 10px; /* Set the width of the scrollbar */
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

  h4 {
    color: #9D9D9D;
    font-weight: 700;
    font-size: 24px;
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
  display: flex;
  overflow-y: auto;
  padding-right: 15px;
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
  gap: 1rem;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
  }
`;
