import styled from "styled-components";

const LocationBox = (props) => {
  return (
    <Box onClick={props.onClick} search={props.search}>
      <img
        src={props.location.locationImagePath[0]}
        alt="location"
        className="img-fluid"
      />
      <h6>{props.location.locationName}</h6>
      <div className="d-flex justify-content-between">
        <p>{props.location.locationAddress}</p>
      </div>
    </Box>
  );
};

export default LocationBox;

const Box = styled.div`
  width: 230px;
  padding: 10px;
  margin-bottom: 25px;
  display: inline-block;
  background-color: rgb(255, 254, 252);
  border-radius: 15px;
  width: ${(props) => props.search && "200px"};
  box-shadow: ${(props) =>
    props.search && "0px 8px 16px rgba(0, 159, 87, 0.12)"};
  transform: scale(0.9);
  cursor: pointer;
  h6 {
    font-weight: bold;
    margin-top: 0.4rem;
  }
  div {
    color: #9d9d9d;
  }
  span {
    color: #009f57;
    font-weight: 700;
  }
  svg {
    transform: scale(0.8);
    transform: translateY(-0.1em) scale(0.8);
  }
  p {
    white-space: nowrap;
  }
`;
