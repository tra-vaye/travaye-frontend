import { notification } from "antd";
import { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/UI/Buttons";
import Loader from "../../components/UI/Loader";

import { useVerifyPaymentMutation } from "../../redux/Api/paymentApi";

const Subscribe = () => {
  const [loading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const userType = useSelector((state) => state.auth.userType);
  const businessData = useSelector((store) => store.auth.user).payload;

  const [businessInfo, setBusinessInfo] = useState({
    businessEmail: businessData.businessEmail,
  });
  const [
    verifyPayment,
    {
      isLoading: isLoadingPayment,
      isError: isPaymentError,
      isSuccess: isPaymentSuccess,
      data: paymentData,
      error: paymentError,
    },
  ] = useVerifyPaymentMutation();
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const amount = 50 * 100; // Amount in kobo (NGN 50)

  const config = {
    reference: new Date().getTime(),
    email: businessData.businessEmail,
    amount,
    publicKey,
    channels: ["card"],
    currency: "NGN",
    onSuccess: (response) => handlePaymentSuccess(response),
    onClose: () => handlePaymentClose(),
  };

  const handlePaymentSuccess = async (response) => {
    console.log("Payment successful:", response);

    setIsLoading(true);

    await verifyPayment({ reference: response.reference });
    setIsLoading(false);
    navigate(`/${userType}`);
  };

  const handlePaymentClose = () => {
    console.log("Payment closed");
    // Handle payment modal closure, e.g., show a message to the user
  };
  useEffect(() => {
    if (businessData) {
      setBusinessInfo((prevInfo) => ({ ...prevInfo, ...businessData }));
      if (businessData?.businessVerified === "verified") {
        if (businessData?.addedCard === true) {
          navigate(`/${userType}`);
        } else {
          navigate(`/subscribe`);
        }
      } else if (businessData?.businessVerified === "pending") {
        notification.warning({
          message: "Business Verification Pending",
          duration: 3,
          placement: "bottomRight",
        });
        if (businessData?.addedCard === true) {
          navigate(`/${userType}`);
        } else {
          navigate(`/subscribe`);
        }
      } else if (businessData?.businessVerified === "false") {
        notification.error({
          message: "Business not Verified",
          duration: 3,
          placement: "bottomRight",
        });
        // Navigate to the verification page
        navigate("/register");
      }
    }
  }, [businessData, navigate, userType]);

  useEffect(() => {
    if (isPaymentError) {
      notification.error({
        message: paymentError?.data?.error,
        duration: 3,
        placement: "bottomRight",
      });
    }
    if (isPaymentSuccess) {
      notification.success({
        message: paymentData.message,
        duration: 3,
        placement: "bottomRight",
      });
      window.location.href = paymentData.authorization_url;
    }
  }, [
    isPaymentSuccess,
    paymentError,
    isPaymentError,
    userType,
    navigate,
    paymentData,
  ]);
  return (
    <Container>
      {(loading || isLoadingPayment) && <Loader />}
      <h4>
        Verify you're Human, A charge of NGN 5 is going to occur on your account
      </h4>
      <h6>2 Months free, Please add your card for verification</h6>
      <div>
        <PaystackButton {...config}>
          <Button color="green" type="button">
            Add Card
          </Button>
        </PaystackButton>
      </div>
    </Container>
  );
};

export default Subscribe;

const Container = styled.div`
  padding: 2% 5%;

  span {
    color: #ff3d00;
    font-weight: 600;
    font-size: 18px;
  }
  label {
    display: block;
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 15px;
  }
  input,
  select {
    outline: none;
    display: block;
    width: 100%;
    background: #ffffff;
    border: 2px solid rgba(0, 159, 87, 0.25);
    border-radius: 5px;

    margin-bottom: 16px;
    padding: 4px 8px;
  }

  h4 {
    font-weight: 600;
    font-size: 24px;
    color: #009f57;
  }
  button {
    margin-left: auto;
    border-radius: 5px;
  }
`;

const FileUpload = styled.div`
  display: block;
  width: 100%;
  background: #ffffff;
  text-align: center;
  color: #e9a309;
  border: 2px solid rgba(0, 159, 87, 0.25);
  border-radius: 5px;
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 4px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
`;
