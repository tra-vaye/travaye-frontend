import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AddedLocations from "./Pages/AddedLocations";
import Locations from "./Pages/Business/Locations";
import Register from "./Pages/Business/Register";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home/Home";
import LocationDetails from "./Pages/LocationDetails";
import Login from "./Pages/Login";
import PlanTrip from "./Pages/Plan-a-trip";
import SignUp from "./Pages/SignUp";
import UserProfile from "./Pages/UserProfile";
import Header from "./components/Layout/Header/Header";
import SideNav from "./components/Layout/SIdeNav";

function App() {
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav((prevState) => !prevState);
  };

  return (
    <>
      <Header onToggleSideNav={toggleSideNav} showSideNav={showSideNav} />
      {showSideNav && <SideNav onToggleSideNav={toggleSideNav} />}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/plan-a-trip" element={<PlanTrip />} />
        <Route path="/location" element={<LocationDetails />} />
        <Route path="/added" element={<AddedLocations />} />
        <Route path="/register" element={<Register />} />
        <Route path="/business-locations" element={<Locations />} />
      </Routes>
    </>
  );
}

export default App;
