import Modal from "./Modal";
import React from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import { ArrowCloud, BlankStars } from "../svgs/svgs";
import { Button } from "../Buttons";

const NewLocation = (props) => {
  return (
    <Modal onClick={props.onClick}>
      <h3>Post a New Location</h3>
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <Container>
            <section {...getRootProps()}>
              <input {...getInputProps()} />
              <div>
                <i>{ArrowCloud}</i>
                <p>Drag and Drop Pictures here to Upload</p>
              </div>
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
          <input placeholder="Name" />
          <input placeholder="Address" />
        </div>

        <textarea
          placeholder="Please Give a Short Description of your Experience"
          rows="6"
        ></textarea>
        <Button color="green">Post</Button>
      </InputContainer>
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
  height: 30vh;
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
