import { Button } from "../../components/UI/Buttons";
import styled from "styled-components";
import MaryLandImg from "../../assets/maryland-mall.png";
import { FourStars, Bin } from "../../components/UI/svgs/svgs";
import { useEffect, useState } from "react";
import { Rate } from "antd";
import Progress from "../../components/UI/Progress";

const AddedLocations = () => {
  const [locations, setLocations] = useState(
    JSON.parse(localStorage.getItem("location"))
  );
  useEffect(() => {
    setLocations(JSON.parse(localStorage.getItem("location")));
  }, [JSON.stringify(localStorage.getItem("location"))]);

  console.log(locations);
  return (
    <Container>
      <div className="flex justify-between items-end mb-24">
        <h4>My Added Locations</h4>
        <Progress step={3} />
      </div>
      <div className="">
        {locations?.map((e) => (
          <Card>
            <div className="row">
              <div className="flex justify-between items-center">
                <img
                  src={e?.businessLocationImages[0]}
                  alt=""
                  className="img-fluid"
                />
                <div>
                  <p>{e?.businessName}</p>
                  <h5>{e?.businessAddress}</h5>
                  <h6>{e?.businessCategory}</h6>
                </div>
                <Rate value={e?.rating} />
                <div className="d-flex col-md-3 justify-content-between align-items-center ">
                  <b>#{e?.businessPriceRangeFrom}</b>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      const newLocations = locations.filter(
                        (loc) => loc?.businessName !== e?.businessName
                      );
                      localStorage.setItem(
                        "location",
                        JSON.stringify(newLocations)
                      );
                      setLocations(newLocations);
                    }}
                  >
                    {Bin}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <footer className="row fixed left-0 right-0 w-screen border-red-600 border bottom-0 bg-white px-[5%] py-[2%] shadow-md">
        <div className="col-md-3">
          <Title>Total Added Locations</Title>
          <Value>{locations?.length} Locations</Value>
        </div>
        <div className="col-md-3">
          <Title>Total Outing Categories</Title>
          <Value>
            {
              locations?.reduce((acc, e) => {
                if (acc.includes(e?.businessCategory)) {
                  return acc;
                } else {
                  return [...acc, e?.businessCategory];
                }
              }, []).length
            }{" "}
            Outing Categories
          </Value>
        </div>
        <div className="col-md-3">
          <Title>Total Budget Cost</Title>
          <Value>#{locations?.reduce((acc, e)  => {
            return acc + e.businessPriceRangeFrom
          }, 0)}</Value>
        </div>
        <div className="col-md-3">
          <Button onClick={() => window.print()}>Finish Selection</Button>
        </div>
      </footer>
    </Container>
  );
};
export default AddedLocations;

const Container = styled.div`
  padding: 5%;
  position: relative;
  h4 {
    text-align: center;
    font-weight: 700;
    font-size: 25px;
    color: #009f57;
  }
  p {
    font-weight: 700;
    font-size: 15px;
    color: #000000;
  }
  h6 {
    font-weight: 600;
    font-size: 16px;
    color: #e9a309;
  }
`;

export const Card = styled.div`
  background: #ffffff;
  box-shadow: 4px 8px 40px -2px rgba(0, 0, 0, 0.08);
  border-radius: 15px;
  padding: 12px;
  margin: 30px auto;

  img {
    width: 125px;
    margin-right: 20px;
    @media (max-width: 767px) {
      transform: scaleY(1.4) translateY(20px);
    }
  }
  h5 {
    font-weight: 600;
    font-size: 14px;
  }
  p,
  h5,
  h6 {
    margin-bottom: 10px;
  }
  b {
    @media (max-width: 767px) {
      transform: translateX(145px);
    }
  }
`;

export const StarContainer = styled.div`
  i {
    @media (max-width: 767px) {
      transform: translateX(130px);
    }
  }
  svg {
    transform: scale(0.8);
  }
`;
const Title = styled.h5`
  font-weight: 700;
  font-size: 22px;

  color: #009f57;
`;

const Value = styled.span`
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  color: #9d9d9d;
`;
