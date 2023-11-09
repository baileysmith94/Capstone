import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import RestaurantList from "./components/RestaurantList";
import ReviewCard from "./components/ReviewCard";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./style.css";
import UserList from "./components/userlist";
import ProfilePage from "./components/ProfilePage";

//TO SEE IF A TOKEN IS ACTIVLY BEING USED
const token = localStorage.getItem("token");
if (token) {
  console.log("Token found:", token);
} else {
  console.log("No token found");
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <Routes>
        {/* <Route path = '/' element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurants/${restaurantId}/reviews" element={ReviewCard} />
        <Route path="/users" element={<UserList />} />
        {/* <Route path = '/' element={<ReviewList />} /> */}
        <Route path = '/profile' element={<ProfilePage />} />
        <Route path="/" element={<Footer />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
