import styled from "styled-components";

const LocationBox = (props) => {
  return (
    <Box
      onClick={props.onClick}
      search={props.search}
      className="flex flex-col"
    >
      <img
        src={props.location.businessLocationImages[0]}
        alt="location"
        className="img-fluid !w-[250px] h-[216px]"
      />
      <h6 className="mt-2 font-extrabold text-lg ">
        {props.location.businessName}
      </h6>
      <div className=" flex content-between flex-wrap break-words">
        <p>{props.location.businessAddress}</p>
      </div>
    </Box>
  );
};

export default LocationBox;

const Box = styled.div`
  min-width: 210px;
  padding: 10px;
  margin-bottom: 25px;
  background-color: rgb(255, 254, 252);
  border-radius: 15px;
  width: ${(props) => props.search && "190px"};
  box-shadow: ${(props) =>
    props.search && "0px 8px 16px rgba(0, 159, 87, 0.12)"};
  transform: scale(0.9);
  cursor: pointer;

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
  h6 {
    color: #009f57;
  }
`;
