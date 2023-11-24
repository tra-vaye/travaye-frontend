import { Box, Rating, Typography } from "@mui/material";
import { Input, Modal, Select, notification } from "antd";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  useGetStatesQuery,
  useLazyGetCityQuery,
  useLazyGetLandmarksQuery,
  useLazyGetLgaQuery,
} from "../../../redux/Api/geoApi";
import {
  useCreateLocationMutation,
  useGetCategoriesQuery,
} from "../../../redux/Api/locationApi";
import { Button } from "../Buttons";
import Loader from "../Loader";
import { ArrowCloud } from "../svgs/svgs";
const { TextArea } = Input;
const initialValues = {
  locationName: "",
  locationAddress: "",
  locationDescription: "",
  locationState: "",
  locationCity: "",
  locationLGA: "",
  locationLandmark: "",
  locationCategory: "",
  locationSubCategory: "",
  pictures: [],
  locationRating: 0,
  locationAddedBy: sessionStorage.getItem("user_id"),
};
const NewLocation = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const userType = useSelector((state) => state.auth.userType);
  const [createLocation, { isLoading, isError, isSuccess, error }] =
    useCreateLocationMutation();
  const [getCity, { data: cities }] = useLazyGetCityQuery();
  const { data } = useGetStatesQuery();
  const [getLandMarks, { data: landmarks }] = useLazyGetLandmarksQuery();
  const [getLga, { data: lga }] = useLazyGetLgaQuery();

  // const user = useSelector((state) => state.authuser);
  const [rating, setRating] = useState(2);
  const { data: categories, isLoading: isFetchingCategories } =
    useGetCategoriesQuery();
  const [subCat, setSubCat] = useState([]);
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: error?.data?.error,
        duration: 3,
        placement: "bottomRight",
      });
    }
    if (isSuccess) {
      notification.success({
        message: "Location Created Successfully",
        duration: 3,
        placement: "bottomRight",
      });
      const handleRefresh = () => {
        // Reload the entire page
        window.location.reload();
      };

      handleRefresh();
      setValues(initialValues);
    }
  }, [isError, error, isSuccess, userType, navigate, open, setOpen]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    values.pictures.forEach((file) => {
      formData.append("pictures", file);
    });
    await createLocation(formData);
  };
  return (
    <>
      {" "}
      {isLoading && <Loader />}
      <Modal
        open={open}
        footer={null}
        centered
        maskClosable={true}
        onCancel={() => setOpen(false)}
      >
        <form onSubmit={handleFormSubmit}>
          <h3>Post a New Location</h3>
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={true}
            onDrop={(acceptedFiles) => {
              // seValue("pictures", [...values.pictures, ...acceptedFiles]);
              setValues((prev) => ({
                ...prev,
                pictures: [...values.pictures, ...acceptedFiles],
              }));
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <Container>
                <section {...getRootProps()}>
                  <input {...getInputProps()} />
                  {values.pictures.length === 0 ? (
                    <div>
                      <i>{ArrowCloud}</i>
                      <p>Drag and Drop Pictures here to Upload</p>
                    </div>
                  ) : (
                    values.pictures.map((file, index) => (
                      <FlexBetween key={index}>
                        <Typography sx={{ marginRight: "5px" }}>
                          {file.name}
                        </Typography>
                      </FlexBetween>
                    ))
                  )}
                </section>
              </Container>
            )}
          </Dropzone>
          <div className="d-flex justify-content-center my-3">
            <Typography component="legend">Experience rating</Typography>
            <Rating
              name="simple-controlled"
              value={values.locationRating}
              onChange={(event, newValue) => {
                console.log(newValue);
                setRating(newValue);
                setValues((prev) => ({ ...prev, locationRating: newValue }));
              }}
            />
          </div>
          <InputContainer>
            <div className="d-flex justify-content-between gap-4 mb-4">
              <Input
                placeholder="Name"
                name="locationName"
                value={values.locationName}
                required
                onChange={(e) => {
                  setValues((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />

              <Input
                placeholder="Address"
                name="locationAddress"
                value={values.locationAddress}
                required
                onChange={(e) => {
                  setValues((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="flex gap-4 justify-between mb-4">
              <Select
                className="!w-full"
                placeholder="Location Category"
                onSelect={(value, Record) => {
                  setSubCat("");

                  setSubCat(Record?.sub);
                  setValues((prev) => ({
                    ...prev,
                    locationCategory: value,
                  }));
                }}
                options={categories}
              />

              <Select
                className="!w-full"
                placeholder="
                Sub-Category"
                onSelect={(value) => {
                  setValues((prev) => ({
                    ...prev,
                    locationSubCategory: value,
                  }));
                }}
                options={subCat}
              />
            </div>
            <div className="flex justify-between gap-4 mb-4">
              <Select
                className="!w-[50%]"
                placeholder="Location State"
                onSelect={(value) => {
                  console.log("clicked");
                  console.log(value);

                  getLga({ state: value.toUpperCase() });
                  getCity({ state: value.toUpperCase() });
                  getLandMarks({ state: value.toUpperCase() });
                  setValues((prev) => ({
                    ...prev,
                    locationState: value,
                  }));
                }}
                // showSearch
                options={data}
              />
              <Select
                className="!w-[50%]"
                placeholder="Location City"
                onSelect={(value) => {
                  console.log("clicked");
                  console.log(value);
                  setValues((prev) => ({
                    ...prev,
                    locationCity: value,
                  }));
                }}
                // showSearch
                options={cities}
              />
            </div>
            <div className="flex justify-between gap-4 mb-4">
              <Select
                className="!w-[50%]"
                placeholder="Location LGA"
                onSelect={(value) => {
                  console.log("clicked");
                  console.log(value);
                  setValues((prev) => ({
                    ...prev,
                    locationLGA: value,
                  }));
                }}
                // showSearch
                options={lga}
              />
              <Select
                className="!w-[50%]"
                placeholder="Location Landmarks"
                onSelect={(value) => {
                  console.log("clicked");
                  console.log(value);
                  setValues((prev) => ({
                    ...prev,
                    locationLandmark: value,
                  }));
                }}
                // showSearch
                options={landmarks}
              />
            </div>
            <div className="flex justify-between gap-4 mb-4">
              <Input
                placeholder="Phone Number"
                className="w-[50%]"
                name="locationContact"
                value={values.locationContact}
                required
                onChange={(e) => {
                  setValues((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </div>
            <TextArea
              placeholder="Please Give a Short Description of your Experience"
              rows="6"
              name="locationDescription"
              value={values.locationDescription}
              required
              onChange={(e) => {
                setValues((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
              }}
            ></TextArea>
            <Button color="green" type="submit">
              Post
            </Button>
          </InputContainer>
        </form>
      </Modal>
    </>
  );
};

export default NewLocation;

const Container = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  background: #fff;
  box-shadow: 4px 4px 32px 2px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  height: 20vh;
  z-index: 1000200000;
  padding: 15px;
  margin-top: 5%;
  p {
    text-align: center;
  }

  section {
    width: 100%;
    border: 3px solid #d9d9d9;
    border-radius: 8px;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 5%;
    }
  }
`;

const InputContainer = styled.div`
  * {
  }

  button {
    margin: 5px auto;
    width: 80px;
  }
`;

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
// input {
//   border: 3px solid #d9d9d9;
//   border-radius: 6px;
//   outline: none;
//   width: 45%;
//   padding: 5px;
// }

// textarea {
//   width: 100%;
//   border: 3px solid #d9d9d9;
//   border-radius: 6px;
//   padding: 5px;
// }
// &::placeholder {
//   color: #d9d9d9;
//   font-weight: 600;
// }
