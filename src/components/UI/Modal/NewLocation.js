import { Box, Typography, Rating } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as yup from "yup";
import serverUrl from "../../../server";
import { Button } from "../Buttons";
import { ArrowCloud } from "../svgs/svgs";
import Modal from "./Modal";
import { useState } from "react";
import {
  useCreateLocationMutation,
  useGetCategoriesQuery,
} from "../../../redux/Api/locationApi";
import { Select } from "antd";

const initialValues = {
  locationName: "",
  locationAddress: "",
  locationDescription: "",
  locationCity: "",
  locationCategory: "",
  locationContact: "",
  locationSubCategory: "",
  pictures: [],
};

const NewLocation = (props) => {
  const [createLocation, { isLoading }] = useCreateLocationMutation();
  const user = useSelector((state) => state.user);
  const [rating, setRating] = useState(2);
  const { data, isLoading: isFetchingCategories } = useGetCategoriesQuery();
  const [values, setValuew] = useState(initialValues);
  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    values.pictures.forEach((file) => {
      formData.append("pictures", file);
    });
    formData.append("locationAddedBy", user._id);
    createLocation(formData)
      .unwrap()
      .then((res) => {
        alert("Location Successfully added.");
        props.onClick();
        console.log(res);
        onSubmitProps.resetForm();
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to add location :( , Try again.");
      });
  };
  return (
    <Modal onClick={props.onClick}>
      <form action="" onSubmit={handleFormSubmit}>
        <h3>Post a New Location</h3>
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={true}
          onDrop={(acceptedFiles) => {
            // seValue("pictures", [...values.pictures, ...acceptedFiles]);
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
            value={rating}
            onChange={(event, newValue) => {
              console.log(newValue);
              setRating(newValue);
            }}
          />
        </div>
        <InputContainer>
          <div className="d-flex justify-content-between mb-4">
            <input
              placeholder="Name"
              name="locationName"
              value={values.locationName}
            />
            <input
              placeholder="Address"
              name="locationAddress"
              value={values.locationAddress}
            />
          </div>
          <div className="d-flex justify-content-between mb-4">
            <input
              placeholder="Category"
              name="locationCategory"
              value={values.locationCategory}
            />
            <Select />
            <input
              placeholder="Sub-Category"
              name="locationSubCategory"
              value={values.locationSubCategory}
            />
          </div>
          <div className="d-flex justify-content-between mb-4">
            <input
              placeholder="City"
              name="locationCity"
              value={values.locationCity}
            />
            <input
              placeholder="Phone Number"
              name="locationContact"
              value={values.locationContact}
            />
          </div>
          <textarea
            placeholder="Please Give a Short Description of your Experience"
            rows="6"
            name="locationDescription"
            value={values.locationDescription}
          ></textarea>
          <Button color="green" type="submit">
            Post
          </Button>
        </InputContainer>
      </form>
    </Modal>
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
    &::placeholder {
      color: #d9d9d9;
      font-weight: 600;
    }
  }
  input {
    border: 3px solid #d9d9d9;
    border-radius: 6px;
    outline: none;
    width: 45%;
    padding: 5px;
  }

  textarea {
    width: 100%;
    border: 3px solid #d9d9d9;
    border-radius: 6px;
    padding: 5px;
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
