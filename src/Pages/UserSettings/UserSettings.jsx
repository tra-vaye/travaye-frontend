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
import { useUpdateProfilePhotoMutation } from "../../redux/Api/authApi";
import { IoIosCamera } from "react-icons/io";

const BusinessSettings = () => {
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

  const togglePointsModal = () => {
    setShowPointsModal((prevState) => !prevState);
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

  // const {
  //   data: userData,
  //   isSuccess: userSuccess,
  //   refetch: refetchUserData,
  // } = useGetMeQuery({
  //   userType: userType,
  // });
  const userData = useSelector((store) => store.auth.user).payload;
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    if (isSuccess) {
      setLocations(data?.data);
      // console.log(locations);
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
        navigate("/register");
      }
    }
  }, [userData, navigate, userType]);

  const userLikedLocations = userData?.user?.likedLocations?.map(
    (likedLocationName) =>
      locations?.find((location) => location.locationName === likedLocationName)
  );

  const userId = sessionStorage.getItem("user_id");
  const userLocations = locations?.filter((location) => {
    return location.locationAddedBy === userId;
  });

  let content;

  // if (userLocations?.length < 1) {
  //   content = <p>No Location Added Yet</p>;
  // } else {
  //   content = userLocations?.map((location, i) => {
  //     return <LocationBox location={location} key={i} />;
  //   });
  // }
  let allReviews = [];
  locations?.map((location) => {
    if (location.locationAddedBy === userData._id) {
      allReviews = [...allReviews, ...location.reviews];
    }
  });

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
          <h5 className="mt-5">{userData?.businessName}</h5>
          <h6 className="mt-1" usernamame={true}>
            {`${userData?.businessEmail}`}
          </h6>
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
        User Settings
      </Main>
    </Container>
  );
};

export default BusinessSettings;

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
