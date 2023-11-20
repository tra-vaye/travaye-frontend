import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import { CloudUpload } from "../../components/UI/svgs/svgs";
import Dropzone from "react-dropzone";

const Register = () => {
  return (
    <Container>
      <h4>Complete Registration</h4>
      <h6>
        Please Complete Your Registration to gain full access to your Travaye
        Business Page
      </h6>
      <form>
        <div className="row mt-3">
          <div className="col-md-6">
            <div>
              <label htmlFor="name">
                Business Name <span>*</span>
              </label>
              <input id="name" />
            </div>
            <div>
              <label htmlFor="category">
                Business Category <span>*</span>
                <select id="category">
                  {categories.map((category, i) => {
                    return (
                      <option
                        value={category}
                        key={i}
                        hidden={category === "Please select a category"}
                        disabled={category === "Please select a category"}
                        selected={category === "Please select a category"}
                      >
                        {category}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <div>
              <label htmlFor="email">
                Business Email <span>*</span>
              </label>
              <input id="email" type="email" />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <label htmlFor="address">
                Business Address <span>*</span>
              </label>
              <input id="address" />
            </div>
            <div>
              <label htmlFor="phone">
                Business Telephone <span>*</span>
              </label>
              <input id="phone" />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <h4>Upload Documents</h4>
            <h6>
              Please ensure to upload clear, concise and correct documents.
            </h6>
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section {...getRootProps()}>
                  <input {...getInputProps()} />
                  <FileUpload>
                    CAC Registration Proof <i>{CloudUpload}</i>
                  </FileUpload>
                </section>
              )}
            </Dropzone>
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section {...getRootProps()}>
                  <input {...getInputProps()} />
                  <FileUpload>
                    Proof Of Address (e.g Utility Bill) <i>{CloudUpload}</i>
                  </FileUpload>
                </section>
              )}
            </Dropzone>
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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
          {/* <div className="col-md-6">
            <h4>Add Card Information</h4>
            <div>
              <label htmlFor="card-name">Card Name</label>
              <input id="card-name" />
            </div>
            <div>
              <label htmlFor="card-number">Card Number</label>
              <input id="card-number" />
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <label htmlFor="card-expiry">Expiry Date</label>
                <input id="card-expiry" />
              </div>
              <div>
                <label htmlFor="cvv">Cvv</label>
                <input id="cvv" type="number" />
              </div>
            </div>
            
          </div> */}
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

    /* @media (max-width: 767px) {
      width: 90%;
    } */
  }

  h4 {
    font-weight: 600;
    font-size: 24px;
    color: #009f57;
  }
  button {
    margin-left: auto;
    border-radius: 5px;
    @media (max-width: 767px) {
      width: 100%;
    }
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
