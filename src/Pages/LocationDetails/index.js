import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Maryland from "../../assets/mm-ticket-prices.png";
import Avatar from "../../assets/user-avatar.png";
import { AltButton, Button } from "../../components/UI/Buttons";
import Loader from "../../components/UI/Loader";
import {
  ArrowCloud,
  FiveStars,
  FourStars,
} from "../../components/UI/svgs/svgs";
import {
  useAddLocationToLikedLocationsMutation,
  useGetLocationByIdQuery,
} from "../../redux/Api/locationApi";
import classes from "./LocationDetails.module.css";

import { Input, notification } from "antd";
import Dropzone from "react-dropzone";
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
  locationContact: "",
};
const LocationDetails = () => {
  const [values, setValues] = useState(initialValues);

  const { id } = useParams();
  const [location, setLocation] = useState({});
  const [addLocationToLikedLocations] =
    useAddLocationToLikedLocationsMutation();

  const { data, isError, error, isLoading } = useGetLocationByIdQuery({ id });
  useEffect(() => {
    if (data) {
      setLocation(data);
    }
    if (isError) {
      notification.error({
        message: error?.error,
        duration: 3,
        placement: "bottomRight",
      });
    }
  }, [data, error?.error, isError]);

  const handleAddClick = () => {
    if (location?.locationName) {
      addLocationToLikedLocations({ locationName: location.locationName })
        .unwrap()
        .then((res) =>
          notification.success({
            message: "Liked",
            duration: 3,
            placement: "bottomRight",
          })
        )
        .catch((err) => {
          notification.error({
            message: err.data.error,
            duration: 3,
            placement: "bottomRight",
          });
        });
    } else {
      // Handle the case where location?.locationName is undefined
      console.error("Location name is undefined");
    }
  };
  return (
    <div className={classes.location}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="row">
            <div className="col-md-6">
              <figure>
                <img
                  src={
                    location.locationImagePath
                      ? location.locationImagePath[0]
                      : Maryland
                  }
                  alt="poster"
                />
                <figcaption>
                  Please scroll/swipe to see additional images
                </figcaption>
              </figure>
            </div>
            <div className={`col-md-6 ${classes.details}`}>
              <div>
                <h4>{location.locationName}</h4>
                <h6>{location.locationAddress}</h6>
              </div>

              <p className="my-3">{location.locationDescription}</p>

              <div className="d-flex mb-3">
                <Button color="green" location={true} onClick={handleAddClick}>
                  Like location
                </Button>
                <Button location={true}>View on Google Maps</Button>
              </div>
            </div>
          </div>
          <div
            className={`${classes.reviewContainer} 
            row mt-5 px-4 py-3`}
          >
            <div className="col-md-6">
              <form className="gap-4">
                <div className="flex flex-col gap-3 bg-white py-2 px-4 rounded-xl border-brandGreen border-[1px]">
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
                  <TextArea
                    rows="6"
                    required
                    className="mt-3"
                    placeholder="Share your experience here...."
                  ></TextArea>
                  <AltButton location={true} className="mb-4">
                    Post Experience
                  </AltButton>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-between">
                <h4>Reviews</h4>
                <div>
                  Average Rating <i>{FourStars}</i>
                </div>
              </div>
              <ul className={classes.reviews}>
                <li>
                  <div>
                    <div className="d-flex justify-content-between">
                      <h5>
                        <b>Awesome Sound Experience!!!</b>
                      </h5>
                      <i>{FiveStars}</i>
                    </div>

                    <p>
                      Awesome Sound Experience!!! Best Cinema Experience I have
                      experienced in my life. Sound was so amazing and the 3d
                      viewing was ecstatic. Fantastic Popcorns as well!
                    </p>
                    <div className={classes.user}>
                      <img src={Avatar} className="img-fluid  me-2" alt="pfp" />
                      <p className="mt-1" style={{ color: "#009f57" }}>
                        Kehinde Olu-Onifade
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div>
                    <div className="d-flex justify-content-between">
                      <h5>
                        <b>Awesome Sound Experience!!!</b>
                      </h5>
                      <i>{FiveStars}</i>
                    </div>

                    <p>
                      Awesome Sound Experience!!! Best Cinema Experience I have
                      experienced in my life. Sound was so amazing and the 3d
                      viewing was ecstatic. Fantastic Popcorns as well!
                    </p>
                    <div className={classes.user}>
                      <img src={Avatar} className="img-fluid  me-2" alt="pfp" />
                      <p className="mt-1" style={{ color: "#009f57" }}>
                        Kehinde Olu-Onifade
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationDetails;
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
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
