import Modal from "./Modal";

const NewLocation = (props) => {
  return (
    <Modal onClick={props.onClick}>
      <h3>Post a New Location</h3>
    </Modal>
  );
};

export default NewLocation;
