import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import { CloudUpload } from "../../components/UI/svgs/svgs";
import { useGetMeQuery } from "../../redux/Api/authApi";

const Register = () => {
  const [businessInfo, setBusinessInfo] = useState({
    businessName: "",
    businessCategory: "",
    businessEmail: "",
    address: "",
    businessTelephone: "",
    locationPictures: [],
  });

  const userType = useSelector((state) => state.auth.userType);
  const {
    data: businessData,
    isSuccess,
    isLoading,
    refetch,
  } = useGetMeQuery({ userType });

  useEffect(() => {
    if (isSuccess) {
      setBusinessInfo(businessData?.user);
    }
  }, [isSuccess, businessData?.user]);

  const handleChange = (field, value) => {
    setBusinessInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
    console.log(businessInfo);
  };

  const handleFileDrop = (acceptedFiles, field) => {
    console.log(acceptedFiles);
    setBusinessInfo((prevInfo) => ({
      ...prevInfo,
      [field]: acceptedFiles,
    }));
  };
  const handleLocationImagesFileDrop = (acceptedFiles, field) => {
    console.log(acceptedFiles);
    setBusinessInfo((prevInfo) => ({
      ...prevInfo,
      [field]: [...businessInfo.locationPictures, ...acceptedFiles],
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Container>
      <h4>Complete Registration</h4>
      <h6>
        Please Complete Your Registration to gain full access to your Travaye
        Business Page
      </h6>
      <form onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-6">
            <div>
              <label htmlFor="name">
                Business Name <span>*</span>
              </label>
              <input
                id="name"
                value={businessInfo?.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category">
                Business Category <span>*</span>
              </label>
              <select
                id="category"
                value={businessInfo?.businessCategory}
                onChange={(e) =>
                  handleChange("businessCategory", e.target.value)
                }
              >
                {categories.map((category, i) => (
                  <option
                    value={category}
                    key={i}
                    hidden={category === "Please select a category"}
                    disabled={category === "Please select a category"}
                    selected={category === "Please select a category"}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="email">
                Business Email <span>*</span>
              </label>
              <input
                id="email"
                type="email"
                value={businessInfo?.businessEmail}
                onChange={(e) => handleChange("businessEmail", e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <label htmlFor="address">
                Business Address <span>*</span>
              </label>
              <input
                id="address"
                value={businessInfo?.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone">
                Business Telephone <span>*</span>
              </label>
              <input
                id="phone"
                type="number"
                value={businessInfo?.businessTelephone}
                onChange={(e) =>
                  handleChange("businessTelephone", e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <h4>Upload Documents</h4>
            <h6>
              Please ensure to upload clear, concise and correct documents.
            </h6>
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) =>
                handleFileDrop(acceptedFiles, "cacRegistrationProof")
              }
            >
              {({ getRootProps, getInputProps }) => (
                <section {...getRootProps()}>
                  <input {...getInputProps()} />
                  <FileUpload>
                    CAC Registration Proof <i>{CloudUpload}</i>
                  </FileUpload>
                </section>
              )}
            </Dropzone>
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) =>
                handleFileDrop(acceptedFiles, "proofOfAddress")
              }
            >
              {({ getRootProps, getInputProps }) => (
                <section {...getRootProps()}>
                  <input {...getInputProps()} />
                  <FileUpload>
                    Proof Of Address (e.g Utility Bill) <i>{CloudUpload}</i>
                  </FileUpload>
                </section>
              )}
            </Dropzone>
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={true}
              onDrop={(acceptedFiles) =>
                handleLocationImagesFileDrop(acceptedFiles, "locationPictures")
              }
            >
              {({ getRootProps, getInputProps }) => (
                <section {...getRootProps()}>
                  <input {...getInputProps()} />
                  <FileUpload>
                    Pictures of Location <i>{CloudUpload}</i>
                  </FileUpload>
                </section>
              )}
            </Dropzone>
          </div>
          <div>
            <Button color="green" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  padding: 2% 5%;

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
  select {
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
`;

const FileUpload = styled.div`
  display: block;
  width: 100%;
  background: #ffffff;
  text-align: center;
  color: #e9a309;
  border: 2px solid rgba(0, 159, 87, 0.25);
  border-radius: 5px;
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 4px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const categories = [
  "Please select a category",
  "Special Events",
  "Food & Drinks",
  "Entertainment Venues",
  "Parks & Relaxation Spots",
  "History & Arts",
  "Wildlife Attractions",
  "Sports & Recreation Centres",
  "Historical/Tourist Attractions",
];
