import styled from "styled-components";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { Button } from "../../components/UI/Buttons";
import { useState } from "react";
import { useGetStatesQuery, useLazyGetLgaQuery } from "../../redux/Api/geoApi";
import { useGetBudgetsQuery, useGetCategoriesQuery } from "../../redux/Api/locationApi";
import { FileUpload } from "../Business/Register";
import { Box, Typography } from "@mui/material";
import { CloudUpload } from "../../components/UI/svgs/svgs";
// import { ArrowCloud } from "../../components/UI/svgs/svgs";

const Flex = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	gap: '1px',
	flexWrap: 'wrap',
});

const CreateEvent = () => {
  const [advertForm, setAdvertForm] = useState({
    eventName: '',
    eventAddress: '',
    eventDescription: '',
    advertImages: [],
    advertState: '',
    advertLGA: '',
    advertBudget: '',
    advertCategory: '',
    advertPlan: ''
  });

  const { data: states } = useGetStatesQuery();
  const { data: budgets } = useGetBudgetsQuery();
  const [getLga, { data: lgas }] = useLazyGetLgaQuery();
  const { data: categories } = useGetCategoriesQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(advertForm);
  }

  const handleChange = (field, value) => {
    setAdvertForm((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const handleLocationImagesFileDrop = (acceptedFiles, field) => {
    // console.log(acceptedFiles);
    setAdvertForm((prevInfo) => ({
      ...prevInfo,
      [field]: [...advertForm.advertImages, ...acceptedFiles],
    }));
  };

  return (
    <Style>
      <h2>Create an event (Advert)</h2>
      <p className="">
        Follow the Steps below to create an event in next to no time.
      </p>
      <form className="grid grid-cols-6 gap-10 mt-8" onSubmit={handleSubmit}>
        <FormControl className="col-span-3">
          <h5>Step 1</h5>
          <label>Please upload a picture of your event</label>
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) =>
              handleLocationImagesFileDrop(acceptedFiles, "advertImages")
            }
          >
            {({ getRootProps, getInputProps }) => (
              <section {...getRootProps()}>
                <input {...getInputProps()} />
                <FileUpload className="!my-0 !p-0 !px-3">
                  {advertForm.advertImages.length === 0 ? (
                    `Upload Event Pictures`
                  ) : (
                    <div className="flex gap-3 flex-wrap">
                      {advertForm.advertImages.map(
                        (file, index) => (
                          <Flex key={index}>
                            <Typography sx={{ marginRight: "1px", display: "inline-block" }}>
                              {file.name}{index !== advertForm.advertImages.length-1 && " , "}
                            </Typography>
                          </Flex>
                        )
                      )}
                    </div>
                  )}
                  <i>{CloudUpload}</i>
                </FileUpload>
                <span className="text-right !block cursor-pointer">+ Add a new picture</span>
              </section>
            )}
          </Dropzone>
        </FormControl>
        <FormControl className="col-span-3">
          <h5>Step 2</h5>
          <label>Select a Location</label>
          <div className="grid grid-cols-2 gap-4">
            <Select
              placeholder="State"
              options={states}
              showSearch
              onSelect={(value) => {
                getLga({ state: value.toUpperCase() });
                handleChange("advertState", value)
              }}
            />
            <Select
              placeholder="LGA"
              options={lgas}
              showSearch
              onSelect={(value) => handleChange("advertLGA", value)}
              // value={advertForm.advertLGA}
            />
          </div>
        </FormControl>
        <FormControl className="col-span-2">
          <h5>Step 3</h5>
          <label>Please select a price range</label>
          <Select
            placeholder="Select Range"
            options={budgets}
            onSelect={(value) => handleChange("advertBudget", value)}
          />
        </FormControl>
        <FormControl className="col-span-2">
          <h5>Step 4</h5>
          <label>Please select a Category of Special Events</label>
          <Select
            placeholder="Select Category"
            options={categories}
            onSelect={(value) => handleChange("advertCategory", value)}
          />
        </FormControl>
        <FormControl className="col-span-2">
          <h5>Step 5</h5>
          <label>Select an Advert Plan</label>
          <Select
            placeholder="Advert Plan"
            onSelect={(value) => handleChange("advertPlan", value)}
            // value={advertForm.advertPlan}
            className="text-[#9d9d9d]"
          />
        </FormControl>
        <FormControl className="col-span-6">
          <h4 className="text-2xl text-[#009F57] font-bold mb-4">Extra Information</h4>  
          <section className="flex gap-4">
            <div className="flex-1">
              <h5>Event Name</h5>
              <label>Please enter a name for the event</label>
              <input value={advertForm.eventName} onChange={(e) => handleChange("eventName", e.target.value)} placeholder="Enter name" type="text" />
            </div>
            <div className="flex-1">
              <h5>Event Address</h5>
              <label>Please enter an exact address for your event</label>
              <input value={advertForm.eventAddress} onChange={(e) => handleChange("eventAddress", e.target.value)} placeholder="Enter address" type="text" />
            </div>
            <div className="flex-1">
              <h5>About Event</h5>
              <label>Please describe the event in a few words</label>
              <textarea rows="3" placeholder="Enter description" value={advertForm.eventDescription} onChange={(e) => handleChange("eventDescription", e.target.value)} />
            </div>
          </section>
        </FormControl>
        <div className="col-span-6 flex">
          <button type="submit" className="ml-auto py-2.5 px-16 rounded-xl border-none bg-[#009F57] text-[#F0F0F0] font-semibold text-xl">Post</button>
        </div>
      </form>
    </Style>
  );
};

export default CreateEvent;

const Style = styled.div`
  margin-top: 20px;

  padding: 20px 5%;
  line-height: 32px;
  letter-spacing: 0em;

  span, label {
    color: #e9a309;
  }
  h2 {
    color: #009f57;
    font-weight: 700;
    font-size: 25px;
  }
  h3 {
    color: #009f57;
    font-weight: 700;
    font-size: 20px;
  }
  p {
    font-size: 15px;
  }
`;

const FormControl = styled.div`
  display: flex;
  flex-direction: column;

  h5 {
    font-size: 20px;
    line-height: 32px;
    font-weight: 700;
    color: #0c0c0c;
  }

  label {
		display: block;
		font-size: 14px;
    /* line-height: 24px; */
    color: black;
    font-weight: 400;
    white-space: nowrap;
	}
	
  input, select, textarea {
		display: block;
		width: 100%;
		background: #ffffff;
		border: 2px solid #CCFFE8;
		border-radius: 5px;
    color: #9D9D9D;
		padding: 4px 10px;
    outline: none;
	}
  span.ant-select-selection-item {
    color: #9D9D9D;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 50px;
  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const TopGrid = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 525px) {
    flex-direction: column;
    span {
      color: #009f57;
    }
  }
`;
