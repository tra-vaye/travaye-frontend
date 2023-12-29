import Map from "../../components/Map/map";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full">
      <MdKeyboardBackspace
        onClick={() => navigate(-1)}
        className="text-[30px] w-[30px] h-[30px] cursor-pointer"
      />
      <Map />
    </div>
  );
};

export default Index;
