import Header from "./components/Layout/Header/Header";
import SideNav from "./components/Layout/SIdeNav";
import Home from "./Pages/Home/Home";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import UserProfile from "./Pages/UserProfile";
import Contact from "./Pages/Contact";
import PlanTrip from "./Pages/Plan-a-trip";
import LocationDetails from "./Pages/LocationDetails";
import AddedLocations from "./Pages/AddedLocations";
import Register from "./Pages/Business/Register";

function App() {
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav((prevState) => !prevState);
  };

  return (
    <>
      <Header onToggleSideNav={toggleSideNav} showSideNav={showSideNav} />
      {showSideNav && <SideNav />}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/plan-a-trip" element={<PlanTrip />} />
        <Route path="/location" element={<LocationDetails />} />
        <Route path="/added" element={<AddedLocations />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
