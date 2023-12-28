import styled from "styled-components";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { Button } from "../../components/UI/Buttons";
import { ArrowCloud } from "../../components/UI/svgs/svgs";

const CreateEvent = () => {
  return (
    <Style>
      <h2>Create an event (Advert)</h2>
      <p className="text-center">
        Follow the Steps below to create an event in next to no time.
      </p>
      <StepOneContainer>
        <div>
          <h3>Step 1</h3>

          <TopGrid>
            <p>Upload a picture of your event</p>
            <span>+ Add a new picture</span>
          </TopGrid>
          <UploadContainer>
            <span>Upoad event pictures </span>
            <i>{ArrowCloud}</i>
          </UploadContainer>
        </div>
      </StepOneContainer>
      {/* newblock */}
      <div className=" mt-2">
        <h3>Step 2</h3>
        <p>Select a Location</p>
        <OptionsBox>
          <Select
            placeholder="State"
            // onSelect={(value) => {
            //   getLga({ state: value.toUpperCase() });
            //   getCity({ state: value.toUpperCase() });
            //   getLandMarks({ state: value.toUpperCase() });
            //   setQueryData((prev) => ({
            //     ...prev,
            //     state: value,
            //     city: "",
            //     lga: "",
            //   }));
            // }}
            // value={queryData.state}
            showSearch
            className="!w-[250px] mt-3"
          />
          <Select
            placeholder="City"
            showSearch
            // onSelect={(value) => {
            //   setQueryData((prev) => ({ ...prev, city: value }));
            // }}
            // value={queryData.city}
            className="!w-[250px] mt-3"
          />
          <Select
            placeholder="Local Government Area"
            // showSearch
            // onSelect={(value) => {
            //   setQueryData((prev) => ({ ...prev, lga: value }));
            // }}
            // value={queryData.lga}
            className="!w-[250px] mt-3"
          />
        </OptionsBox>
      </div>
      {/* newblock */}
      <OptionsBox>
        <div>
          <h3>Step 3</h3>
          <p>Select a price range</p>
          <Select
            placeholder="Select Your Budget "
            className="!w-[250px] mt-3"
            options={[
              { value: "free", label: "free" },
              { value: "free - 5k", label: "free - 5k" },
              { value: "5k - 10k", label: "5k - 10k" },
              { value: "10k - 20k", label: "10k - 20k" },
            ]}
            // onSelect={(value) => {
            //   setQueryData((prev) => ({ ...prev, budget: value }));
            // }}
          />
        </div>
        <div>
          <h3>Step 4</h3>
          <p>Select a Category of Special Events</p>
          <Select
            placeholder="Local Government Area"
            // showSearch
            // onSelect={(value) => {
            //   setQueryData((prev) => ({ ...prev, lga: value }));
            // }}
            // value={queryData.lga}
            className="!w-[250px] mt-3"
          />
        </div>
        <div>
          <h3>Step 5</h3>
          <p>Select an Advert Plan</p>
          <Select
            placeholder="Local Government Area"
            // showSearch
            // onSelect={(value) => {
            //   setQueryData((prev) => ({ ...prev, lga: value }));
            // }}
            // value={queryData.lga}
            className="!w-[250px] mt-3"
          />
        </div>
      </OptionsBox>
      <ButtonContainer>
        <Button color="green">Make Payment</Button>
      </ButtonContainer>
    </Style>
  );
};

export default CreateEvent;

const Style = styled.div`
  margin-top: 20px;

  padding: 20px 5%;
  line-height: 32px;
  letter-spacing: 0em;
  /* @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  } */
  span {
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

const StepOneContainer = styled.div`
  margin-top: 30px;

  span {
    cursor: pointer;
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

const OptionsBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* gap: 370px; */
  gap: 20%;
  margin-bottom: 20px;
  @media (max-width: 1340px) {
    gap: 17%;
  }
  @media (max-width: 1170px) {
    gap: 12%;
  }
  @media (max-width: 1040px) {
    gap: 9%;
  }
  @media (max-width: 960px) {
    gap: 5%;
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const UploadContainer = styled.div`
  border: 1px solid rgba(0, 159, 87, 0.25);
  color: #e9a009;
  width: 300px;
  padding: 5px;
  border-radius: 5px;
  display: flex;

  justify-content: space-between;

  svg {
    transform: scale(0.4);
  }
  /* transform: scale(0.9) translateX(-20px); */
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
