import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import RestaurantList from "./components/RestaurantList";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./style.css";
import UserList from "./components/UserList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="navbar"> </div>
      <NavBar />
      <Routes>
        {/* <Route path = '/' element={<Home />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/users" element={<UserList />} />
        {/* <Route path = '/' element={<ReviewList />} /> */}
        {/* <Route path = '/' element={<Profile />} /> */}
        <Route path="/" element={<Footer />} />
        <Route path="/" element={<Footer />} />
      </Routes>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
