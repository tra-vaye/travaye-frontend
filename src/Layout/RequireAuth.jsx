/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../redux/Slices/authSlice";

const RequireAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = sessionStorage.getItem("authToken");
  const [done, setDone] = useState();
  useEffect(() => {
    if (!token) {
      dispatch(logout());
      navigate("/login");
      return;
    }

    setDone(true);
    return () => {
      setDone(false);
    };
  }, [navigate, token]);

  if (!done) {
    navigate("/login");
    return null;
  }

  return <Outlet />;
};

export default RequireAuth;
