import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import { AuthFormWrapper } from "../Login";

const Verification = () => {
  return (
    <Container className="d-flex justify-content-center col-md-6 offset-md-3 mt-3 text-center">
      <AuthFormWrapper>
        <h3>Verify Account</h3>
        <p>
          A 4-digit verification code has been sent to your e-mail. Please enter
          the code sent to your email to verify your account.
        </p>
        <div className="d-flex justify-content-between  mt-5 mb-3">
          <input /> <input /> <input /> <input />
        </div>
        <Timer>
          Resend code in : <span>59:00</span>
        </Timer>
        <Button color="green">Verify</Button>
      </AuthFormWrapper>
    </Container>
  );
};

export default Verification;

const Timer = styled.p`
  text-align: end;

  span {
    color: #e9a009;
  }
`;

const Container = styled.div`
  input {
    width: 18%;
    height: 55px;
    @media (min-width: 700px) {
      height: 60px;
      width: 16%;
    }
  }
  button {
    margin: auto;
    margin-top: 10em;
    width: 167px;
  }
  p {
    color: #9d9d9d;
  }
  h3 {
    color: #009f57;
    margin-bottom: 20px;
    font-weight: 600;
  }
`;
