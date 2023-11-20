import { notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import Loader from "../../components/UI/Loader";
import { useCodeVerifyMutation } from "../../redux/Api/authApi";
import { AuthFormWrapper } from "../Login";

const Verification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [codes, setCodes] = useState(["", "", "", ""]);
  const nonEmptyElements = codes.filter((element) => element !== "");
  // const [isLoading, setIsLoading] = useState(false);
  let buttonDisabled = Boolean(nonEmptyElements.length < 4);
  const userType = useSelector((state) => state.auth.userType);
  console.log(userType);
  const [codeVerify, { isLoading, error, isError, isSuccess, data }] =
    useCodeVerifyMutation();

  useEffect(() => {
    if (isError) {
      notification.error({
        message: error?.data?.error,
        duration: 3,
        placement: "bottomRight",
      });
    }
    // if (isSuccess) {
    //   // Handle successful verification,
    //   notification.success({
    //     message: "Email Verified Successfully",
    //     duration: 3,
    //     placement: "bottomRight",
    //   });
    //   const verifiedUserOrBusiness = data?.user;
    //   const authToken = verifiedUserOrBusiness?.token;
    //   sessionStorage.setItem("authToken", authToken);
    //   navigate(`/${userType}`);
    //   // navigate(`${userType}`);
    // }
  }, [isError, isSuccess, error, navigate, userType, data?.user]);

  const handleChange = (index, value) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
  };
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !codes[index] && index > 0) {
      const newCodes = [...codes];
      if (index > 0) {
        event.target.previousSibling.focus();
        newCodes[index - 1] = "";
        setCodes(newCodes);
      }
      event.preventDefault();
    } else if (/^[0-9]$/.test(event.key) && index < 3) {
      const newCodes = [...codes];
      newCodes[index] = event.key;
      if (index < 3) {
        event.target.nextSibling.focus();
      }
      setCodes(newCodes);
      event.preventDefault();
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const code = codes.join("");
      console.log(userType);
      const response = await codeVerify({ code, userType });

      // Handle the success case
      if (response.data?.user) {
        notification.success({
          message: "Email Verified Successfully",
          duration: 3,
          placement: "bottomRight",
        });

        // const verifiedUserOrBusiness = response.data.user;
        // const authToken = verifiedUserOrBusiness.token;
        // sessionStorage.setItem("authToken", authToken);
        navigate(`/${userType}`);
      }
    } catch (error) {
      // Handle errors (if necessary)
      console.error("Verification error:", error);
    }
  };
  return (
    <Container className="d-flex justify-content-center col-md-6 offset-md-3 mt-3 text-center">
      {isLoading && <Loader />}
      <AuthFormWrapper>
        <h3>Verify Account</h3>
        <p>
          A 4-digit verification code has been sent to your e-mail. Please enter
          the code sent to your email to verify your account.
        </p>
        <div className="d-flex justify-content-between  mt-5 mb-3">
          {codes.map((code, index) => (
            <input
              key={index}
              type="text"
              value={code}
              maxLength={1}
              className="verification-box"
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <Timer>
          Resend code in : <span>59:00</span>
        </Timer>
        <Button
          color="green"
          disabled={buttonDisabled}
          onClick={handleVerifyCode}
        >
          Verify
        </Button>
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
