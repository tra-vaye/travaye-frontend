import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import { Card, StarContainer } from "../AddedLocations";
import MaryLandImg from "../../assets/maryland-mall.png";
import { FourStars } from "../../components/UI/svgs/svgs";

const Locations = () => {
  return (
    <Container>
      <div className="d-flex justify-content-between mt-5 align-items-center ">
        <h3>Locations</h3>
        <Button>View Added Locations</Button>
      </div>
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
            <StarContainer className="d-flex  align-items-center col-md-3">
              <i>{FourStars}</i>
            </StarContainer>

            <div className="d-flex col-md-3 align-items-center">
              <p className="me-3">#500</p>
              <Button color="green">Add Location</Button>
              <Button>Preview</Button>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default Locations;

const Container = styled.div`
  h4 {
    text-align: center;
    font-weight: 700;
    font-size: 25px;
    color: #009f57;
  }
  p {
    font-weight: 700;
    display: inline-block;
    font-size: 15px;
    color: #000000;
  }
  h6 {
    font-weight: 600;
    font-size: 16px;
    color: #e9a309;
  }

  padding: 0 7%;
  h3 {
    color: #009f57;
    font-weight: 700;
  }
  button {
    transform: scale(0.9);
  }
`;
