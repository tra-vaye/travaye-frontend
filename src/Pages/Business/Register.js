import { Box, Typography } from "@mui/material";
import { notification } from "antd";
import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import { CloudUpload } from "../../components/UI/svgs/svgs";
import { useGetMeQuery } from "../../redux/Api/authApi";
import { useCompleteBusinessRegistrationMutation } from "../../redux/Api/authApi";
const Flex = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1px",
  flexWrap: "wrap",
});

const Register = () => {
  const [businessInfo, setBusinessInfo] = useState({
    businessName: "",
    businessCategory: "",
    businessEmail: "",
    address: "",
    businessTelephone: "",
    businessLocationImages: [],
    cacRegistrationProof: [],
    proofOfAddress: [],
  });
  const navigate = useNavigate();
  const userType = useSelector((state) => state.auth.userType);
  const {
    data: businessData,
    isSuccess,
    isLoading,
    refetch,
  } = useGetMeQuery({ userType });
  const [
    completeBusiness,
    {
      isLoading: completeBusinessLoading,
      isSuccess: completeBusinessSuccess,
      data,
      error,
      isError,
    },
  ] = useCompleteBusinessRegistrationMutation();

  useEffect(() => {
    if (isSuccess && businessData?.user) {
      setBusinessInfo((prevInfo) => ({ ...prevInfo, ...businessData.user }));
      if (businessData?.user?.businessVerified === "verified") {
        navigate(`/${userType}`);
      } else if (businessData?.user?.businessVerified === "pending") {
        notification.warning({
          message: " Business Verification Pending",
          duration: 3,
          placement: "bottomRight",
        });
        navigate(`/${userType}`);
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
  console.log(businessInfo);

  const handleFileDrop = (acceptedFiles, field) => {
    console.log(acceptedFiles);
    setBusinessInfo((prevInfo) => ({
      ...prevInfo,
      [field]: [...acceptedFiles],
    }));
  };
  const handleLocationImagesFileDrop = (acceptedFiles, field) => {
    console.log(acceptedFiles);
    setBusinessInfo((prevInfo) => ({
      ...prevInfo,
      [field]: [...businessInfo.businessLocationImages, ...acceptedFiles],
    }));
  };

  useEffect(() => {
    if (isError) {
      notification.error({
        message: error?.data?.error,
        duration: 3,
        placement: "bottomRight",
      });
    }
    if (completeBusinessSuccess) {
      notification.success({
        message: "Business Verification Pending",
        duration: 3,
        placement: "bottomRight",
      });
      navigate(`/${userType}`);
    }
  }, [isError, error, completeBusinessSuccess, userType, navigate]);

  const handleSubmit = async (e) => {
    const formData = new FormData();
    Object.entries(businessInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });
    businessInfo.businessLocationImages.forEach((file) => {
      formData.append("businessLocationImages", file);
    });
    businessInfo.cacRegistrationProof.forEach((file) => {
      formData.append("cacRegistrationProof", file);
    });
    businessInfo.proofOfAddress.forEach((file) => {
      formData.append("proofOfAddress", file);
    });
    console.log(formData);
    e.preventDefault();
    await completeBusiness(formData);
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
                required={true}
                id="category"
                onChange={(e) =>
                  handleChange("businessCategory", e.target.value)
                }
              >
                {categories.map((category, i) => (
                  <option
                    value={category}
                    selected={i === 0 ? true : false}
                    key={i}
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
            <div>
              <label htmlFor="name">
                Price Range <span>*</span>
              </label>
              <div className="flex gap-[1rem] items-center">
                <input
                  id="name"
                  // value={businessInfo?.expiryDate}
                  onChange={(e) => handleChange("expiryDate", e.target.value)}
                  placeholder="from"
                />
                <input
                  id="name"
                  // value={businessInfo?.cvv}
                  onChange={(e) => handleChange("cvv", e.target.value)}
                  placeholder="to"
                />
              </div>
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
              <label htmlFor="address">
                Business Address <span>*</span>
              </label>
              <div className="mt-2 mb-[1rem] flex flex-wrap md:flex-nowrap md:flex-row gap-3 md:gap-5">
                <Select
                  placeholder="State"
                  onSelect={(value) => {
                    getLga({ state: value.toUpperCase() });
                    getCity({ state: value.toUpperCase() });
                    getLandMarks({ state: value.toUpperCase() });
                    // setQueryData((prev) => ({
                    //   ...prev,
                    //   state: value,
                    //   city: "",
                    //   lga: "",
                    // }));
                  }}
                  // value={queryData.state}
                  showSearch
                  className="!w-[150px]"
                  options={states}
                />
                <Select
                  placeholder="City"
                  showSearch
                  onSelect={(value) => {
                    // setQueryData((prev) => ({ ...prev, city: value }));
                  }}
                  // value={queryData.city}
                  className="!w-[150px]"
                  options={city}
                />
                <Select
                  placeholder="LGA"
                  showSearch
                  onSelect={(value) => {
                    // setQueryData((prev) => ({ ...prev, lga: value }));
                  }}
                  // value={queryData.lga}
                  className="!w-[150px]"
                  options={lga}
                />
              </div>
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
                    {businessInfo.cacRegistrationProof.length === 0 ? (
                      `CAC Registration Proof`
                    ) : (
                      <div className="flex gap-3 flex-wrap">
                        {businessInfo.cacRegistrationProof.map(
                          (file, index) => (
                            <Flex key={index}>
                              <Typography sx={{ marginRight: "1px" }}>
                                {file.name}
                              </Typography>
                            </Flex>
                          )
                        )}
                      </div>
                    )}{" "}
                    <i>{CloudUpload}</i>
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
                    {businessInfo.proofOfAddress.length === 0 ? (
                      ` Proof Of Address (e.g Utility Bill)`
                    ) : (
                      <div className="flex gap-3 flex-wrap">
                        {businessInfo.proofOfAddress.map((file, index) => (
                          <Flex key={index}>
                            <Typography sx={{ marginRight: "1px" }}>
                              {file.name}
                            </Typography>
                          </Flex>
                        ))}
                      </div>
                    )}
                    <i>{CloudUpload}</i>
                  </FileUpload>
                </section>
              )}
            </Dropzone>
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={true}
              onDrop={(acceptedFiles) =>
                handleLocationImagesFileDrop(
                  acceptedFiles,
                  "businessLocationImages"
                )
              }
            >
              {({ getRootProps, getInputProps }) => (
                <section {...getRootProps()}>
                  <input {...getInputProps()} />
                  <FileUpload>
                    {businessInfo.businessLocationImages.length === 0 ? (
                      `Pictures of Location`
                    ) : (
                      <div className="flex gap-3 flex-wrap">
                        {businessInfo.businessLocationImages.map(
                          (file, index) => (
                            <Flex key={index}>
                              <Typography sx={{ marginRight: "1px" }}>
                                {file.name}
                              </Typography>
                            </Flex>
                          )
                        )}
                      </div>
                    )}
                    <i>{CloudUpload}</i>
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
  height: auto;
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
