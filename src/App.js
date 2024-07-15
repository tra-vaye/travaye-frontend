import { Suspense, lazy, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Header from "./components/Layout/Header/Header";
import SideNav from "./components/Layout/SIdeNav";
import Loader from "./components/UI/Loader";

import RequireAuth from "./Layout/RequireAuth";
import CreateEvent from "./Pages/CreateEvent";

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
const ForgotPassword = lazy(() => {
  return import("./Pages/Login/ForgotPassword");
});
const ResetPassword = lazy(() => {
  return import("./Pages/Login/ResetPassword");
});
const PlanTrip = lazy(() => {
  return import("./Pages/Plan-a-trip");
});
const Maps = lazy(() => {
  return import("./Pages/Maps");
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
const BusinessProfile = lazy(() => {
  return import("./Pages/BusinessProfile/BusinessProfile");
});
const BusinessSettings = lazy(() => {
  return import("./Pages/Business/Settings");
});
const UserSettings = lazy(() => {
  return import("./Pages/UserSettings/UserSettings");
});
const Subscribe = lazy(() => {
  return import("./Pages/Subscribe/Subscribe");
});
function App() {
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav((prevState) => !prevState);
  };

  const userType = sessionStorage.getItem("userType");

  return (
    <>
      <Header onToggleSideNav={toggleSideNav} showSideNav={showSideNav} />
      {showSideNav && <SideNav onToggleSideNav={toggleSideNav} />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {<Route path="/login" element={<Login />} />}
          {<Route path="/signup" element={<SignUp />} />}
          {<Route path="/forgot-password" element={<ForgotPassword />} />}
          {<Route path="/reset-password" element={<ResetPassword />} />}
          <Route path="" element={<RequireAuth />}>
            <Route path="/register" element={<Register />} />
            {/* Redirect for both the /business page */}
            {userType === "business" && (
              <Route path="/business" element={<BusinessProfile />} />
            )}
            {userType === "user" && (
              <Route path="/business" element={<Navigate to='/user' />} />
            )}

            {userType === "business" &&  (
              <Route path="/settings" element={<BusinessSettings />} />
            )}
            {userType === "user" &&  (
              <Route path="/settings" element={<UserSettings />} />
            )}

            {/* Redirect to the appropriate route if user tries to access the wrong route */}
            {userType === "user" && (
              <Route path="/user" element={<UserProfile />} />
            )}
            {userType === "business" && (
              <Route path="/user" element={<Navigate to='/business' />} />
            )}

            {userType === "business" && (
              <Route path="/subscribe" element={<Subscribe />} />
            )}
            <Route path="/plan-a-trip" element={<PlanTrip />} />
            <Route path="/verify-email" element={<Verification />} />
            <Route path="/location/:id" element={<LocationDetails />} />
            <Route path="/location/map" element={<Maps />} />
            <Route path="/added-locations" element={<AddedLocations />} />
          </Route>
          <>
          
            {/* <Route
              path="/user"
              element={
                token ? <UserProfile /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/plan-a-trip"
              element={token ? <PlanTrip /> : <Navigate to="/login" />}
            />
            <Route
              path="/location/:id"
              element={
                token ? <LocationDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/added"
              element={
                token ? <AddedLocations /> : <Navigate to="/login" />
              }
            /> */}
          </>
          <Route path="/business-locations" element={<BusinessLocations />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/verify-email" element={<Verification />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/contact-us" element={<Contact />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
