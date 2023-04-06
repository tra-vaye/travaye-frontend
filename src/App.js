import { Suspense, lazy, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Header from "./components/Layout/Header/Header";
import SideNav from "./components/Layout/SIdeNav";
import Loader from "./components/UI/Loader";
import { fetchLocations } from "./state";

const AddedLocations = lazy(() => {
  return import("./Pages/AddedLocations");
});

const BusinessLocations = lazy(() => {
  return import("./Pages/Business/Locations");
});

const Locations = lazy(() => {
  return import("./Pages/Locations");
});

const Register = lazy(() => {
  return import("./Pages/Business/Register");
});
const Contact = lazy(() => {
  return import("./Pages/Contact");
});

const LocationDetails = lazy(() => {
  return import("./Pages/LocationDetails");
});
const Login = lazy(() => {
  return import("./Pages/Login");
});
const PlanTrip = lazy(() => {
  return import("./Pages/Plan-a-trip");
});
const SignUp = lazy(() => {
  return import("./Pages/SignUp");
});
const Verification = lazy(() => {
  return import("./Pages/SignUp/Verification");
});
const UserProfile = lazy(() => {
  return import("./Pages/UserProfile");
});

function App() {
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav((prevState) => !prevState);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const isAuthenticated = Boolean(useSelector((state) => state.user));

  return (
    <>
      <Header onToggleSideNav={toggleSideNav} showSideNav={showSideNav} />
      {showSideNav && <SideNav onToggleSideNav={toggleSideNav} />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          {!isAuthenticated && <Route path="/login" element={<Login />} />}
          {!isAuthenticated && <Route path="/signup" element={<SignUp />} />}
          <Route
            path="/user"
            element={
              isAuthenticated ? <UserProfile /> : <Navigate to="/login" />
            }
          />
          <Route path="/contact-us" element={<Contact />} />
          <Route
            path="/plan-a-trip"
            element={isAuthenticated ? <PlanTrip /> : <Navigate to="/login" />}
          />
          <Route
            path="/location/:id"
            element={
              isAuthenticated ? <LocationDetails /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/added"
            element={
              isAuthenticated ? <AddedLocations /> : <Navigate to="/login" />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/business-locations" element={<BusinessLocations />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/verify" element={<Verification />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
