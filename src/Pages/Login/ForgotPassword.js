import { notification, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import Loader from "../../components/UI/Loader";
import { useForgotPasswordMutation } from "../../redux/Api/authApi";
import { AuthFormWrapper } from "../Login";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading, error, isError, isSuccess, data }] =
    useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const handleResetPassword = (e) => {
    e.preventDefault();
    forgotPassword({ email })
      .unwrap()
      .then(() => {
        notification.success({
          message: "email verification link sent",
          duration: 3,
          placement: "bottomRight",
        });
        // navigate(`/`);
      })
      .catch((error) => {
        notification.error({
          message: error?.data?.error,
          duration: 3,
          placement: "bottomRight",
        });
      });
  };
  return (
    <Container className="d-flex justify-content-center col-md-6 offset-md-3 mt-3 text-center">
      {isLoading && <Loader />}
      <AuthFormWrapper onSubmit={handleResetPassword}>
        <h3>Forgot Password</h3>
        <p>
          Enter Email Address associated with your account and a reset email
          will be sent to you
        </p>
        <div className="flex items-stretch justify-center w-full">
          <input
            id={"email"}
            name={"email"}
            className={`mt-5 !w-[15rem]`}
            required
            type={"email"}
            placeholder={"Email Address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button color="green" type="submit">
          Reset Password
        </Button>
      </AuthFormWrapper>
    </Container>
  );
};

export default ForgotPassword;

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
