/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../redux/Slices/authSlice";
import { useGetMeQuery } from "../redux/Api/authApi";
import Loader from "../components/UI/Loader";

const RequireAuth = () => {
  const { isSuccess, isLoading } = useGetMeQuery();

  return isLoading ? <Loader /> : isSuccess ? <Outlet /> : null;
};

export default RequireAuth;
