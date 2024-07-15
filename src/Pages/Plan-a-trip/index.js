import { Select } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import Loader from "../../components/UI/Loader";
import {
  // useGetStatesQuery,
  useLazyGetCityQuery,
  useLazyGetLandmarksQuery,
  useLazyGetLgaQuery,
} from "../../redux/Api/geoApi";
import {
  useGetCategoriesQuery,
  useLazyPlanATripQuery,
  useGetStatesQuery,
  useGetBudgetsQuery,
} from "../../redux/Api/locationApi";
import classes from "./Trip.module.css";
import Progress from "../../components/UI/Progress";

// import Loader from "../../components/UI/Loader";
// import { Select } from "antd";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const PlanTrip = () => {
  const navigate = useNavigate();
  const { data } = useGetStatesQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [getCity, { data: city }] = useLazyGetCityQuery();
  // const [getLga, { data: lga }] = useLazyGetLgaQuery();
  const [planTrip, { isLoading }] = useLazyPlanATripQuery();
  const {data: budgets} = useGetBudgetsQuery();


  const [queryData, setQueryData] = useState({
    state: "",
    city: "",
    category: [],
    lga: "",
    landmarks: "",
    budget: "",
    subcategory: [],
  });
  const [subData, setSubData] = useState([]);
  const [lga, setLga] = useState([]);
  const [cities, setCities] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/locations", { state: queryData });
  };

  return (
    <div className=" ">
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit} className={classes.trip}>
        <div className="flex justify-between items-center">
          <div className="w-2/3">
            <h1 className="text-3xl font-extrabold mb-2">
              Plan Your desired Trip with Travaye
            </h1>
            <h5 className="text-lg">
              Follow the Steps below to plan your trip in next to no time
            </h5>
          </div>
          <Progress step={1} />
        </div>
        <div className="pt-4">
          <h4 className="mt-3 mb-2">Step 1</h4>
          <p>Please Fill in Your City / Address Details </p>
          <div className="mt-2 flex flex-wrap md:flex-nowrap md:flex-row gap-3 md:gap-5">
            <Select
              placeholder="State"
              onSelect={(value, obj) => {
                // getLga({ state: value.toUpperCase() });
                // getCity({ state: value.toUpperCase() });
                // getLandMarks({ state: value.toUpperCase() });
                setQueryData((prev) => ({
                  ...prev,
                  state: value,
                  city: "",
                  lga: "",
                }));
                setCities(obj.cities.map((city) => ({value:city, label: city})));
                setLga(obj.lgas.map((d) => ({value: d, label: d})));
              }}
              showSearch
              className="!w-[250px]"
              options={data?.map((d, index) => ({value: d.state, label: d.state, index, cities: d.cities, lgas: d.lgas}))}
            />
            <Select
              placeholder="City"
              showSearch
              onSelect={(value) => {
                setQueryData((prev) => ({ ...prev, city: value }));
              }}
              // value={queryData.city}
              className="!w-[250px]"
              options={cities}
            />
            <Select
              placeholder="Local Government Area"
              showSearch
              onSelect={(value) => {
                setQueryData((prev) => ({ ...prev, lga: value }));
              }}
              // value={queryData.lga}
              className="!w-[250px]"
              options={lga}
            />
            {/* <Select
              placeholder="Landmark Areas"
              showSearch
              onSelect={(value) => {
                setQueryData((prev) => ({ ...prev, landmarks: value }));
              }}
              // value={queryData.lga}
              className="!w-[250px]"
              options={landmarks}
            /> */}
          </div>
        </div>
        <div className="mt-3">
          <h4 className="mb-2">Step 2</h4>
          <p className="mb-2">Please Select a Category of Outing Venues</p>
          <div className="mt-2 flex flex-wrap md:flex-nowrap md:flex-row gap-3 md:gap-5">
            <Select
              placeholder="Category"
              showSearch
              mode="multiple"
              onSelect={(value) => {
                setSubData([]);
                // setQueryData((prev) => ({ ...prev, category: value }));
                setSubData(
                  categories.find((cat) => cat.value === value)?.sub || []
                );
              }}
              onChange={(value) => {
                setSubData([]);
                setQueryData((prev) => ({ ...prev, category: value }));
                // setSubData(
                //   categories.find(
                //     (cat) =>
                //       cat.value[value?.length - 1] === value[value?.length - 1]
                //   )?.sub || []
                // );
              }}
              // className="w-full md:w-[50%]"
              className="!w-[250px]"
              options={categories}
            />
            <Select
              placeholder="Sub Category"
              mode="multiple"
              showSearch
              onChange={(value) => {
                setQueryData((prev) => ({
                  ...prev,
                  subcategory: value,
                }));
              }}
              // className="w-full md:w-[50%]"
              className="!w-[250px]"
              options={subData}
            />
          </div>
        </div>
        <div className="mt-3">
          <h4>Step 3</h4>
          <p className="mb-2">Please Select a budget for your outing.</p>
          <Select
            placeholder="Select Your Budget "
            className="!w-[250px]"
            options={budgets?.map(b => ({value: b._id, label: b.label}))}
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
    </div>
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
