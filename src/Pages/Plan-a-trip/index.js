import { Select } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import Loader from "../../components/UI/Loader";
import {
  useGetStatesQuery,
  useLazyGetCityQuery,
  useLazyGetLandmarksQuery,
  useLazyGetLgaQuery,
} from "../../redux/Api/geoApi";
import {
  useGetCategoriesQuery,
  useLazyPlanATripQuery,
} from "../../redux/Api/locationApi";
import classes from "./Trip.module.css";
// import Loader from "../../components/UI/Loader";
// import { Select } from "antd";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const PlanTrip = () => {
  const navigate = useNavigate();
  const { data } = useGetStatesQuery();
  const { data: categoriess } = useGetCategoriesQuery();
  const [getCity, { data: city }] = useLazyGetCityQuery();
  const [getLga, { data: lga }] = useLazyGetLgaQuery();
  const [getLandMarks, { data: landmarks }] = useLazyGetLandmarksQuery();
  const [planTrip, { isLoading }] = useLazyPlanATripQuery();
  const [queryData, setQueryData] = useState({
    state: "",
    city: "",
    category: "",
    lga: "",
    landmarks: "",
    budget: "",
    subcategory: "",
  });
  const [subData, setSubData] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/locations", { state: queryData });
  };
  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit} className={classes.trip}>
        <h1 className="text-center text-[2rem] font-extrabold mb-2">
          Plan Your desired Trip with Travaye
        </h1>
        <h5 className="text-center">
          Follow the Steps below to plan your trip in next to no time
        </h5>
        <div className="pt-4">
          <h4 className="mt-3 mb-2">Step 1</h4>
          <p>Please Fill in Your City / Address Details </p>
          <div className="mt-2 flex flex-wrap md:flex-nowrap md:flex-row gap-3 md:gap-5">
            <Select
              placeholder="State"
              onSelect={(value) => {
                getLga({ state: value.toUpperCase() });
                getCity({ state: value.toUpperCase() });
                getLandMarks({ state: value.toUpperCase() });
                setQueryData((prev) => ({
                  ...prev,
                  state: value,
                  city: "",
                  lga: "",
                }));
              }}
              // value={queryData.state}
              showSearch
              className="!w-full"
              options={data}
            />
            <Select
              placeholder="City"
              showSearch
              onSelect={(value) => {
                setQueryData((prev) => ({ ...prev, city: value }));
              }}
              // value={queryData.city}
              className="!w-full"
              options={city}
            />
            <Select
              placeholder="Local Government Area"
              showSearch
              onSelect={(value) => {
                setQueryData((prev) => ({ ...prev, lga: value }));
              }}
              // value={queryData.lga}
              className="!w-full"
              options={lga}
            />
            <Select
              placeholder="Landmark Areas"
              showSearch
              onSelect={(value) => {
                setQueryData((prev) => ({ ...prev, landmarks: value }));
              }}
              // value={queryData.lga}
              className="!w-full"
              options={landmarks}
            />
          </div>
        </div>
        <div className="mt-3">
          <h4 className="mb-2">Step 2</h4>
          <p className="mb-2">Please Select a Category of Outing Venues</p>
          <ul>
            {categoriess?.map((category, i) => {
              return (
                <li key={i}>
                  <input
                    type="radio"
                    value={category?.value}
                    id={category?.value}
                    name="category"
                    onChange={(e) => {
                      setSubData([]);
                      setQueryData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }));
                      setSubData(categoriess[i]?.sub);
                    }}
                  />
                  <label htmlFor={category?.value}>{category?.value}</label>
                </li>
              );
            })}
          </ul>
          <>
            {subData?.length > 0 && <p>Select Sub-Category</p>}
            <ul>
              {subData?.map((e, i) => (
                <li key={i}>
                  <input
                    type="radio"
                    value={e?.name}
                    id={e?.name}
                    name="subcategory"
                    onChange={(e) => {
                      setQueryData((prev) => ({
                        ...prev,
                        subcategory: e.target.value,
                      }));
                    }}
                  />
                  <label htmlFor={e?.name}>{e?.name}</label>
                </li>
              ))}
            </ul>
          </>
        </div>
        <div className="mt-3">
          <h4>Step 3</h4>
          <p className="mb-2">Please Select a budget for your outing.</p>
          <Select
            placeholder="Select Your Budget "
            className="!w-[250px]"
            options={[
              { value: "free", label: "free" },
              { value: "free - 5k", label: "free - 5k" },
              { value: "5k - 10k", label: "5k - 10k" },
              { value: "10k - 20k", label: "10k - 20k" },
            ]}
            onSelect={(value) => {
              setQueryData((prev) => ({ ...prev, budget: value }));
            }}
          />
        </div>
        <ButtonContainer>
          <Button type="submit" color="green">
            Continue
          </Button>
        </ButtonContainer>
      </form>
    </>
  );
};
export default PlanTrip;
const ButtonContainer = styled.div`
  button {
    margin-left: auto;
    border-radius: 10px;
    @media (max-width: 767px) {
      margin-left: 0;
    }
  }
`;
const States = [
  "State",
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nassarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const categories = [
  "Special Events",
  "Food & Drinks",
  "Entertainment Venues",
  "Parks & Relaxation Spots",
  "History & Arts",
  "Wildlife Attractions",
  "Sports & Recreation Centres",
  "Historical/Tourist Attractions",
];

const Budgets = [
  "Select Budget",
  "free",
  "freee - 5k",
  "5k - 10k",
  "10k - 20k",
];
