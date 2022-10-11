import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import SideNav from "./components/Layout/SIdeNav";
import Home from "./Pages/Home/Home";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";

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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
