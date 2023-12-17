import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "../../components/UI/Loader";
import LocationBox from "../../components/UI/Location/LocationBox";
import { BackDrop } from "../../components/UI/Modal/Modal";
import { useGetLocationsQuery } from "../../redux/Api/locationApi";
import { useGetCategoriesQuery } from "../../redux/Api/locationApi";
import { useGetStatesQuery } from "../../redux/Api/geoApi";
import { Select, Input, Rate } from "antd";

const categories = [
  "All",
  "Special Events",
  "Food & Drinks",
  "Entertainment Venues",
  "Parks & Relaxation Spots",
  "History & Arts",
  "Wildlife Attractions",
  "Sports & Recreation Centres",
  "Historical/Tourist Attractions",
];

const filters = ["All", "Abuja", "Ibadan", "Lagos"];

const Locations = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [locations, setLocations] = useState([]);
  const [subData, setSubData] = useState([]);
  const [selectedCategories, updateSelectedCategories] = useState([]);
  const [selectedFilters, updateSelectedFilters] = useState([]);
  const { data: locationCategories } = useGetCategoriesQuery();
  const { data: states } = useGetStatesQuery();

  // Categories and locationCity are queries for the backend and they are in array formats
  // I am joining every element in the array using .join() to make the request query a single query in a request to avoid server overload
  // and making replacing spaces with hyphens and making them lowercase

  const { data, isError, error, isLoading } = useGetLocationsQuery({
    page: 1,
    count: 10,
    categories: selectedCategories
      .map((category) => category.toLowerCase().replace(/\s+/g, "-"))
      .join(","),
    locationCity: selectedFilters.join(","),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setLocations(data?.data);
    }
    if (isError) {
      notification.error({
        message: error?.error,
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [data, error?.error, isError]);

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  return (
    <Container>
      {showSidebar && (
        <BackDrop onClick={toggleSidebar} showSidebar={showSidebar} />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <Heading>
              <h4>Businesses and Locations</h4>
              <p className="mt-2">Recent Searches</p>
              <MenuOpenIcon onClick={toggleSidebar} />
            </Heading>
            <FilterButtonContainer>
              {filters.map((filter, i) => {
                return (
                  <FilterButton
                    key={i}
                    active={selectedFilters.includes(filter)}
                    onClick={() => {
                      if (filter !== "All") {
                        if (selectedFilters.includes(filter)) {
                          updateSelectedFilters((prevState) => {
                            return prevState.filter(
                              (value) => value !== filter
                            );
                          });
                        } else {
                          updateSelectedFilters((prevState) => {
                            const newArray = prevState.filter(
                              (value) => value !== "All"
                            );
                            return [...newArray, filter];
                          });
                        }
                      } else {
                        updateSelectedFilters(["All"]);
                      }
                      console.log(selectedFilters);
                    }}
                  >
                    {filter}
                  </FilterButton>
                );
              })}
            </FilterButtonContainer>
            <div className="mt-5">
              <div>
                <h6 style={{ color: "#e9a009" }}>Locations</h6>
                <GridContainer>
                  {locations?.map((location, i) => {
                    return (
                      <LocationBox
                        search={true}
                        location={location}
                        key={i}
                        onClick={() => {
                          navigate(`/location/${location?._id}`);
                        }}
                      />
                    );
                  })}
                </GridContainer>
              </div>
            </div>
          </div>
          <SideBar showSidebar={showSidebar}>
            <h6>Categories</h6>
            <ul>
              {categories.map((category, i) => {
                return (
                  <CategoryListItem
                    key={i}
                    active={selectedCategories.includes(category)}
                    onClick={() => {
                      if (category !== "All") {
                        if (selectedCategories.includes(category)) {
                          updateSelectedCategories((prevState) => {
                            return prevState.filter(
                              (value) => value !== category
                            );
                          });
                        } else {
                          updateSelectedCategories((prevState) => {
                            const newArray = prevState.filter(
                              (value) => value !== "All"
                            );
                            return [...newArray, category];
                          });
                        }
                      } else {
                        updateSelectedCategories(["All"]);
                      }
                      setShowSidebar(false);
                    }}
                  >
                    {category}
                  </CategoryListItem>
                );
              })}
            </ul>
            <div></div>
            <h6>Filter By:</h6>
            <span className="text-[#009F57]">Category</span>
            <div className="mt-2 flex flex-wrap md:flex-nowrap md:flex-row gap-3 md:gap-5">
              <Select
                placeholder="Category"
                showSearch
                onSelect={(value) => {
                  setSubData([]);
                  // setQueryData((prev) => ({ ...prev, category: value }));
                  setSubData(
                    locationCategories.find((cat) => cat.value === value)
                      ?.sub || []
                  );
                }}
                // className="w-full md:w-[50%]"
                className="!w-[250px]"
                options={locationCategories}
              />
              <Select
                placeholder="Sub Category"
                showSearch
                onSelect={(value) => {
                  // setQueryData((prev) => ({
                  //   ...prev,
                  //   subcategory: value,
                  // }));
                }}
                // className="w-full md:w-[50%]"
                className="!w-[250px]"
                options={subData}
              />
            </div>
            <span className="text-[#009F57]">City</span>
            <Select
              placeholder="City"
              showSearch
              onSelect={(value) => {
                // setQueryData((prev) => ({ ...prev, city: value }));
              }}
              // value={queryData.city}
              className="!w-[200px]"
              options={states}
            />
            <span className="text-[#009F57]">Budget</span>
            <div className="mt-2 flex gap-3">
              <span>
                <label>From</label>
                <Input />
              </span>
              <span>
                <label>To</label>
                <Input />
              </span>
            </div>
            <span className="text-[#009F57]">Rating</span>
            <Rate value={0} />
          </SideBar>
        </>
      )}
    </Container>
  );
};

export default Locations;

const Container = styled.div`
  position: relative;
  z-index: 30;
  padding: 2% 5%;
  display: flex;
  p {
    font-weight: 600;
    font-size: 16px;
    color: #9d9d9d;
  }

  h4 {
    font-weight: 600;
    font-size: 26px;
    color: #009f57;
  }

  ul {
    padding-inline-start: 0;
    list-style-type: none;
  }
`;

const Heading = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  svg {
    display: none;
    position: absolute;
    right: 2%;
    transform: translateY(20px);
    cursor: pointer;
    color: #009f57;
    @media (max-width: 840px) {
      display: block;
    }
  }
  @media (max-width: 840px) {
    flex-direction: column;
  }
`;

const CategoryListItem = styled.li`
  cursor: pointer;
  margin-bottom: 10px;
  color: ${(props) => (props.active ? "#e9a009" : "black")};
  white-space: nowrap;
`;

const SideBar = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  background: #ffffff;
  box-shadow: -4px 0px 20px rgba(0, 0, 0, 0.08);
  width: 290px;
  height: 100%;
  padding: 3%;
  padding-top: 140px;
  z-index: 20;
  overflow-y: scroll;
  h6 {
    margin-bottom: 20px;
    font-weight: 700;
  }
  @media (max-width: 840px) {
    display: none;
    display: ${(props) => props.showSidebar && "block"};
    z-index: 300;
  }
`;

const FilterButton = styled.button`
  background: #ffffff;
  border: 2px solid ${(props) => (props.active ? "#009f57" : "#f0f0f0")};
  border-radius: 15px;
  color: ${(props) => (props.active ? "white" : "#9d9d9d")};
  font-weight: 600;
  padding: 4px 12px;
  font-size: 14px;
  width: 100px;

  background-color: ${(props) => props.active && "#009f57"};
  @media (min-width: 520px) {
    margin: 10px;
  }
`;

const FilterButtonContainer = styled.div`
  display: flex;

  @media (max-width: 520px) {
    display: grid;
    gap: 10px;
    place-items: center;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  @media (max-width: 1260px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1030px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 840px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 730px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    place-items: center;
  }
`;
