import { IoIosStar } from "react-icons/io";
import styled from "styled-components";

const LocationBox = (props) => {
  // console.log(props.location);
  return (
    <Box
      onClick={props.onClick}
      search={props.search}
      className="flex flex-col"
    >
      <img
        src={props.location?.businessLocationImages?.[0] || props.location?.locationImagePath?.[0]}
        alt="location"
        className="img-fluid !w-[250px] h-[216px]"
      />
      <h6 className="mt-2 font-extrabold text-lg ">
        {props.location?.business?.businessName}
      </h6>
      <div className=" flex content-between justify-between">
        <p>{props.location?.business?.businessAddress}</p>
        <div className="flex items-center">
          <p className="!text-[#009f57] font-bold !text-xl">{props.location?.locationRating}</p>
          <IoIosStar fill="#E9A309" size={24} />
        </div>
      </div>
    </Box>
  );
};

export default LocationBox;

const Box = styled.article`
  width: 100%;
  padding: 12px;
  background-color: rgb(255, 254, 252);
  border-radius: 15px;
  box-shadow: 0px 8px 16px rgba(0, 159, 87, 0.12);
  /* transform: scale(0.9); */
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
