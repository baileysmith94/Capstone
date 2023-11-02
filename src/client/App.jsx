import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import RestaurantList from "./components/RestaurantList";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        {/* <Route path = '/' element={<Home />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/" element={<RestaurantList />} />
        <Route path="/" element={<UserList />} />
        {/* <Route path = '/' element={<ReviewList />} /> */}
        {/* <Route path = '/' element={<Profile />} /> */}
      </Routes>
      <img id="comp-img" src="./computer.png"></img>
    </div>
  );
}

export default App;
