import { Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as yup from "yup";
import serverUrl from "../../../server";
import { Button } from "../Buttons";
import { ArrowCloud, BlankStars } from "../svgs/svgs";
import Modal from "./Modal";

const initialValues = {
  locationName: "",
  locationAddress: "",
  locationDescription: "",
  picture: "",
};

const schema = yup.object().shape({
  locationName: yup.string().required("required"),
  locationAddress: yup.string().required("required"),
  locationDescription: yup.string().required("required"),
  picture: yup.string().required("required"),
});
const NewLocation = (props) => {
  const user = useSelector((state) => state.user);

  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    formData.append("locationAddedBy", user._id);

    const newLocationResponse = await fetch(`${serverUrl}/location`, {
      method: "POST",
      body: formData,
    });
    const savedLocation = await newLocationResponse.json();
    if (newLocationResponse.ok) {
      alert("Location Successfully added.");
      props.onClick();
      console.log(savedLocation);
      onSubmitProps.resetForm();
    } else {
      alert("Failed to add location :( , Try again.");
    }
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={schema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <Modal onClick={props.onClick}>
          <form action="" onSubmit={handleSubmit}>
            <h3>Post a New Location</h3>
            <Dropzone
              onDrop={(acceptedFiles) =>
                setFieldValue("picture", acceptedFiles[0])
              }
            >
              {({ getRootProps, getInputProps }) => (
                <Container>
                  <section {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <div>
                        <i>{ArrowCloud}</i>
                        <p>Drag and Drop Pictures here to Upload</p>
                      </div>
                    ) : (
                      <Typography>{values.picture.name}</Typography>
                    )}
                  </section>
                </Container>
              )}
            </Dropzone>
            <div className="d-flex justify-content-center mt-4">
              <p>Rating: </p>
              <i>{BlankStars}</i>
            </div>
            <InputContainer>
              <div className="d-flex justify-content-between mb-4">
                <input
                  placeholder="Name"
                  name="locationName"
                  value={values.locationName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <input
                  placeholder="Address"
                  name="locationAddress"
                  value={values.locationAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <textarea
                placeholder="Please Give a Short Description of your Experience"
                rows="6"
                name="locationDescription"
                value={values.locationDescription}
                onChange={handleChange}
                onBlur={handleBlur}
              ></textarea>
              <Button color="green" type="submit">
                Post
              </Button>
            </InputContainer>
          </form>
        </Modal>
      )}
    </Formik>
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
