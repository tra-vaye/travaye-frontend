import { notification, Select } from "antd";
import { useEffect, useState } from "react";
// import classes from "";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetCategoriesQuery } from "../../redux/Api/locationApi";
import { useGetMeQuery } from "../../redux/Api/authApi";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { useGetStatesQuery, useLazyGetCityQuery, useLazyGetLgaQuery } from "../../redux/Api/geoApi";
import Dashboard from "../../components/Layout/BusinessSidebar";

const BusinessSettings = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const { data: states } = useGetStatesQuery();
  const [getCity, { data: city }] = useLazyGetCityQuery();
  const [getLga, { data: lga }] = useLazyGetLgaQuery();
  const userType = useSelector((state) => state.auth.userType);

  const navigate = useNavigate();
  
  const [businessInfo, setBusinessInfo] = useState({
    businessName: "",
    businessCategory: "default",
    businessAbout: "",
    businessAddress: "",
    businessLGA: "",
    businessState: "",
    businessCity: "",
    businessPriceRangeFrom: "",
    businessPriceRangeTo: "",
  });

  const {
    data: businessData,
    isSuccess,
    isLoading,
    refetch,
  } = useGetMeQuery({ userType });
  const { data: categories, isLoading: getCategoriesLoading } = useGetCategoriesQuery();

  // const {
  //   data: userData,
  //   isSuccess: userSuccess,
  //   refetch: refetchUserData,
  // } = useGetMeQuery({
  //   userType: userType,
  // });
  
  const userData = useSelector((store) => store.auth.user).payload;

  useEffect(() => {
    if (isSuccess && businessData?.user) {
      setBusinessInfo((prevInfo) => ({ ...prevInfo, ...businessData.user }));
      if (businessData?.user?.businessVerified === "verified") {
        
      } else if (businessData?.user?.businessVerified === "pending") {
        notification.warning({
          message: " Business Verification Pending",
          duration: 3,
          placement: "bottomRight",
        });
        // if (businessData?.user?.addedCard === true) {
        //   navigate(`/${userType}`);
        // } else {
        //   navigate(`/subscribe`);
        // }
        refetch();
      } else if (businessData?.user?.businessVerified === "false") {
        notification.error({
          message: " Business not Verified ",
          duration: 3,
          placement: "bottomRight",
        });
        refetch();

        // Navigate to the verification page
        navigate("/register");
      }
    }
  }, [isSuccess, businessData?.user, navigate, refetch, userType]);

  const handleChange = (field, value) => {
    setBusinessInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // setIsLoading(true);
    const formData = new FormData();
    Object.entries(businessInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log(formData);
    e.preventDefault();
    // setIsLoading(false);
  };

  return (
    <Container>
      <TogleButton showDashboard={showDashboard}>
        <BsBoxArrowInLeft size={28} fill="black" onClick={() => setShowDashboard(prev => !prev)} />
      </TogleButton>
      <Dashboard showDashboard={showDashboard} setBusinessInfo={setBusinessInfo}  />
      <Main>
        <div className="w-full flex justify-between items-center mb-4">
          <h3 className="text-2xl text-[#009F57] font-bold">Settings</h3>
          <button className="text-[#E9A309] font-semibold underline" onClick={() => window.history.back()}>Go back{">"}</button>
        </div>
        <h5 className="text-xl text-[#E9A309] font-semibold">*Edit Basic Information</h5>
        <form onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-6">
            <div>
              <label htmlFor="name">
                Business Name
              </label>
              <input
                id="name"
                value={businessInfo?.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category">
                Business Category
              </label>
              <select
                value={businessInfo.businessCategory}
                required={true}
                id="category"
                onChange={(e) => {
                  handleChange("businessCategory", e.target.value);
                }}
              >
                <option value="default" disabled>
                  Select a category
                </option>
                {categories?.map((category, i) => (
                  <option value={category.value} key={i}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="email">
                About Business
              </label>
              <textarea
                id="about"
                type="email"
                value={businessInfo?.businessAbout}
                onChange={(e) => handleChange("businessAbout", e.target.value)}
                rows={5}
                placeholder="We are a sports and rec brand dedicated to helping athletes destress after a workout session or other related activities."
              />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <label htmlFor="address">
                Business Address
              </label>
              <input
                id="address"
                value={businessInfo?.businessAddress}
                onChange={(e) =>
                  handleChange("businessAddress", e.target.value)
                }
              />
            </div>
            <div>
              <label htmlFor="address">
                Business Address
              </label>
              <div className="mt-2 mb-[1rem] flex flex-wrap gap-3 md:gap-5">
                <Select
                  placeholder="State"
                  onSelect={(value) => {
                    getLga({ state: value.toUpperCase() });
                    getCity({ state: value.toUpperCase() });
                    handleChange("businessState", value);
                  }}
                  // value={queryData.state}
                  // showSearch
                  className="flex-1"
                  options={states}
                />
                <Select
                  placeholder="City"
                  // showSearch
                  onSelect={(value) => {
                    handleChange("businessCity", value);
                  }}
                  // value={queryData.city}
                  className="flex-1"
                  options={city}
                />
                <Select
                  placeholder="LGA"
                  // showSearch
                  onSelect={(value) => {
                    handleChange("businessLGA", value);
                  }}
                  // value={queryData.lga}
                  className="flex-1"
                  options={lga}
                />
              </div>
            </div>
            <div>
              <label htmlFor="businessPriceRange">
                Price Range
              </label>
              <div className="flex gap-[1rem] items-center">
                <input
                  id="businessPriceRangeFrom"
                  // value={businessInfo?.expiryDate}
                  onChange={(e) =>
                    handleChange("businessPriceRangeFrom", e.target.value)
                  }
                  type="number"
                  min={1}
                  placeholder="from"
                />
                <input
                  id="businessPriceRangeFromTo"
                  // value={businessInfo?.cvv}
                  type="number"
                  min={1}
                  onChange={(e) =>
                    handleChange("businessPriceRangeFromTo", e.target.value)
                  }
                  placeholder="to"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <h5 className="text-xl text-[#E9A309] font-semibold py-3.5">*View Insights</h5>
      <div className="grid grid-cols-2 gap-x-9 gap-y-4">
        <InsightBox>
          <h6>Number of Likes</h6>
          <p>68</p>
        </InsightBox>
        <InsightBox>
          <h6>Number of Likes</h6>
          <p>68</p>
        </InsightBox>
        <InsightBox>
          <h6>Number of Likes</h6>
          <p>68</p>
        </InsightBox>
        <InsightBox>
          <h6>Number of Likes</h6>
          <p>68</p>
        </InsightBox>

      </div>
      </Main>
    </Container>
  );
};

export default BusinessSettings;

const TogleButton = styled.button`
  position: absolute;
  display: none;
  /* left: ${(props) => (props.showDashboard ? "21%" : "0")}; */
  top: 120px;
  z-index: 1000 !important;
  background-color: white;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transform: scale(1) rotate(${(props) => (props.showDashboard ? "" : "180")}deg) !important;
  
  @media (max-width: 1150px) {
    display: block;
    left: ${(props) => (props.showDashboard ? "22.8%" : "0")};
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
  /* button {
    transform: scale(0.7);
  } */
`;

const Main = styled.div`
  width: 100%;
  min-height: auto;
  margin-left: 0;
  padding: 20px 40px;
  overflow: auto;
  /* position: relative; */

  span {
    color: #ff3d00;
    font-weight: 600;
    font-size: 18px;
  }
  label {
    display: block;
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 15px;
  }
  input,
  select, textarea {
    outline: none;
    display: block;
    width: 100%;
    background: #ffffff;
    border: 2px solid rgba(0, 159, 87, 0.25);
    border-radius: 5px;

    margin-bottom: 16px;
    padding: 4px 8px;
  }

  h4 {
    font-weight: 600;
    font-size: 24px;
    color: #009f57;
  }
  button {
    margin-left: auto;
    border-radius: 5px;
  }

  ::-webkit-scrollbar {
    width: 12px;
    display: none;
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

const InsightBox = styled.div`
  padding: 10px 24px;
  display: flex;
  justify-content: space-between;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 0px 4px 16px 0px #009F571F;

  h6 {
    font-weight: 600;
    line-height: unset;
    color: #0c0c0c;
  }

  p {
    font-weight: 600;
    color: #009F57;
  }
`;

const ReviewContainer = styled.div``;
const ReviewH4 = styled.h4`
  color: #009f57;
`;