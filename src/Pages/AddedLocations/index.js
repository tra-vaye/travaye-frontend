import { Button } from "../../components/UI/Buttons";
import styled from "styled-components";
import MaryLandImg from "../../assets/maryland-mall.png";
import { FourStars, Bin } from "../../components/UI/svgs/svgs";

const AddedLocations = () => {
  return (
    <Container>
      <h4>My Added Locations</h4>
      <div>
        <Card>
          <div className="row">
            <div className="d-flex col-md-6">
              <img src={MaryLandImg} alt="" className="img-fluid" />
              <div>
                <p>The Maryland Mall Cinema (Genesis Cinemas)</p>
                <h5>Funtasticaland, Ikorodu-Ososun Rd, Lagos 105102, Ikeja</h5>
                <h6>Movie Theatre</h6>
              </div>
            </div>
            <div className="d-flex  align-items-center col-md-2">
              <i>{FourStars}</i>
            </div>
            <div className="d-flex col-md-4 justify-content-between align-items-center ">
              <b>#500 2movies</b>
              <i>{Bin}</i>
            </div>
          </div>
        </Card>
        <Card>
          <div className="row">
            <div className="d-flex col-md-6">
              <img src={MaryLandImg} alt="" className="img-fluid" />
              <div>
                <p>The Maryland Mall Cinema (Genesis Cinemas)</p>
                <h5>Funtasticaland, Ikorodu-Ososun Rd, Lagos 105102, Ikeja</h5>
                <h6>Movie Theatre</h6>
              </div>
            </div>
            <div className="d-flex  align-items-center col-md-2">
              <i>{FourStars}</i>
            </div>
            <div className="d-flex col-md-4 justify-content-between align-items-center ">
              <b>#500 2movies</b>
              <i>{Bin}</i>
            </div>
          </div>
        </Card>
        <Card>
          <div className="row">
            <div className="d-flex col-md-6">
              <img src={MaryLandImg} alt="" className="img-fluid" />
              <div>
                <p>The Maryland Mall Cinema (Genesis Cinemas)</p>
                <h5>Funtasticaland, Ikorodu-Ososun Rd, Lagos 105102, Ikeja</h5>
                <h6>Movie Theatre</h6>
              </div>
            </div>
            <div className="d-flex  align-items-center col-md-2">
              <i>{FourStars}</i>
            </div>
            <div className="d-flex col-md-4 justify-content-between align-items-center ">
              <b>#500 2movies</b>
              <i>{Bin}</i>
            </div>
          </div>
        </Card>{" "}
        <Card>
          <div className="row">
            <div className="d-flex col-md-6">
              <img src={MaryLandImg} alt="" className="img-fluid" />
              <div>
                <p>The Maryland Mall Cinema (Genesis Cinemas)</p>
                <h5>Funtasticaland, Ikorodu-Ososun Rd, Lagos 105102, Ikeja</h5>
                <h6>Movie Theatre</h6>
              </div>
            </div>
            <div className="d-flex  align-items-center col-md-2">
              <i>{FourStars}</i>
            </div>
            <div className="d-flex col-md-4 justify-content-between align-items-center ">
              <b>#500 2movies</b>
              <i>{Bin}</i>
            </div>
          </div>
        </Card>{" "}
        <Card>
          <div className="row">
            <div className="d-flex col-md-6">
              <img src={MaryLandImg} alt="" className="img-fluid" />
              <div>
                <p>The Maryland Mall Cinema (Genesis Cinemas)</p>
                <h5>Funtasticaland, Ikorodu-Ososun Rd, Lagos 105102, Ikeja</h5>
                <h6>Movie Theatre</h6>
              </div>
            </div>
            <div className="d-flex  align-items-center col-md-2">
              <i>{FourStars}</i>
            </div>
            <div className="d-flex col-md-4 justify-content-between align-items-center ">
              <b>#500 2movies</b>
              <i>{Bin}</i>
            </div>
          </div>
        </Card>{" "}
        <Card>
          <div className="row">
            <div className="d-flex col-md-6">
              <img src={MaryLandImg} alt="" className="img-fluid" />
              <div>
                <p>The Maryland Mall Cinema (Genesis Cinemas)</p>
                <h5>Funtasticaland, Ikorodu-Ososun Rd, Lagos 105102, Ikeja</h5>
                <h6>Movie Theatre</h6>
              </div>
            </div>
            <div className="d-flex  align-items-center col-md-2">
              <i>{FourStars}</i>
            </div>
            <div className="d-flex col-md-4 justify-content-between align-items-center ">
              <b>#500 2movies</b>
              <i>{Bin}</i>
            </div>
          </div>
        </Card>
      </div>

      <footer className="row">
        <div className="col-md-3">
          <Title>Total Added Locations</Title>
          <Value>5 Locations</Value>
        </div>
        <div className="col-md-3">
          <Title>Total Outing Categories</Title>
          <Value>4 Outing Categories</Value>
        </div>
        <div className="col-md-3">
          <Title>Total Budget Cost</Title>
          <Value>#25,000</Value>
        </div>
        <div className="col-md-3">
          <Button>Finish Selection</Button>
        </div>
      </footer>
    </Container>
  );
};
export default AddedLocations;

const Container = styled.div`
  padding: 5%;
  h4 {
    text-align: center;
    font-weight: 700;
    font-size: 25px;
    color: #009f57;
  }
  p {
    font-weight: 700;
    color: #000000;
  }
  h6 {
    font-weight: 600;
    font-size: 16px;
    line-height: 28px;
    color: #e9a309;
  }
`;

const Card = styled.div`
  background: #ffffff;
  box-shadow: 4px 8px 40px -2px rgba(0, 0, 0, 0.08);
  border-radius: 15px;
  padding: 12px;
  margin: 30px auto;
  img {
    width: 125px;
    margin-right: 20px;
  }
  h5 {
    font-weight: 600;
    font-size: 16px;
    line-height: 28px;
  }
`;

const Title = styled.h5`
  font-weight: 700;
  font-size: 22px;
  line-height: 32px;
  color: #009f57;
`;

const Value = styled.span`
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  color: #9d9d9d;
`;
