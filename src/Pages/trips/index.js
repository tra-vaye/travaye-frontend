import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const index = () => {
  return (
    <div className="grid grid-cols-1">
      <span>
        <h3 className="text-[#009F57] text-[28px] font-[800]">Locations</h3>
        <Link
          className="text-[#F0F0F0] text-[20px] font-[400] bg-[#E9A309] rounded-[5px] px-[12px] py-[20px]"
          to="added-locations"
        >
          View Added Locations
        </Link>
      </span>
      <div className="flex flex-col items-stretch gap-5]">
        <span className="shadow-sm bg-white rounded-[15px] grid grid-cols-[20%_30%_10%_15%_25%] gap-3 p-[1%]">
          <img className="w-[120px] h-[96px] rounded-[10px]" src="" />
          <span>
            <h5 className="text-[20px] font-[700]"></h5>
            <p className="text-[#9D9D9D] text-[16px] font-[600] truncate"></p>
            <p className="text-[#E9A309] text-[16px] font-[600]"></p>
          </span>
          <Rating />
          <h6 className="text-[20px] font-[600] text-black"></h6>
          <span className="flex gap-3 items-center">
            <button className="text-[#F0F0F0] text-[16px] font-[700] bg-[#009F57] rounded-[5px] px-[4px] py-[8px]">
              Add Location
            </button>
            <Link
              className="text-[#F0F0F0] text-[20px] font-[400] bg-[#E9A309] rounded-[5px] px-[4px] py-[8px]"
              to="added-locations"
            >
              View Added Locations
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
};

export default index;
