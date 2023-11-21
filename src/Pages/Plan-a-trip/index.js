import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import classes from "./Trip.module.css";
import {
  useGetStatesQuery,
  useLazyGetCityQuery,
  useLazyGetLgaQuery,
} from "../../redux/Api/geoApi";
import { useGetCategoriesQuery } from "../../redux/Api/locationApi";
import Loader from "../../components/UI/Loader";
import { Select } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PlanTrip = () => {
  const navigate = useNavigate();
  const { data } = useGetStatesQuery();
  const { data: categoriess, isLoading: isFetchingCat } =
    useGetCategoriesQuery();
  const [getCity, { data: city }] = useLazyGetCityQuery();
  const [getLga, { data: lga }] = useLazyGetLgaQuery();
  const [queryData, setQueryData] = useState({
    state: "",
    city: "",
    category: "",
    lga: "",
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
      {isFetchingCat ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className={classes.trip}>
          <h4 className="text-center">Plan Your desired Trip with Travaye</h4>
          <h5 className="text-center">
            Follow the Steps below to plan your trip in next to no time
          </h5>
          <div>
            <h4 className="mt-3">Step 1</h4>
            <p>Please Fill in Your City / Address Details </p>
            <div className="flex gap-5">
              <Select
                onSelect={(value) => {
                  getLga({ state: value });
                  getCity({ state: value });
                  setQueryData((prev) => ({
                    ...prev,
                    state: value,
                    city: "",
                    lga: "",
                  }));
                }}
                value={queryData.state}
                showSearch
                className="!w-full"
                options={data}
              />
              <Select
                showSearch
                onSelect={(value) => {
                  setQueryData((prev) => ({ ...prev, city: value }));
                }}
                value={queryData.city}
                className="!w-full"
                options={city}
              />
              <Select
                showSearch
                onSelect={(value) => {
                  setQueryData((prev) => ({ ...prev, lga: value }));
                }}
                value={queryData.lga}
                className="!w-full"
                options={lga}
              />
            </div>
          </div>
          <div>
            <h4>Step 2</h4>
            <p>Please Select a Category of Outing Venues</p>
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
            <p>Please Select a budget for your outing.</p>
            <Select
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
      )}
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
