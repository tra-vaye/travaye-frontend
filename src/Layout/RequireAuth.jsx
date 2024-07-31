/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
// import { logout } from "../redux/Slices/authSlice";
import { useGetMeQuery } from "../redux/Api/authApi";
import Loader from "../components/UI/Loader";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const userType = useSelector((state) => state.auth.userType);
  const { isSuccess, isLoading } = useGetMeQuery({ userType });

  return isLoading ? <Loader /> : isSuccess ? <Outlet /> : null;
};

export default RequireAuth;
