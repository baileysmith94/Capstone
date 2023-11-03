import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Login from './components/Login';
import SignUp from './components/SignUp';
import RestaurantList from './components/RestaurantList';
import { Routes, Route} from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './style.css';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="navbar"> </div>
        <NavBar />
      <Routes>
        {/* <Route path = '/' element={<Home />} /> */}
        <Route path = '/' element={<Login />} />
        <Route path = '/signup' element={<SignUp />} />
        <Route path = '/restaurants' element={<RestaurantList />} />
        {/* <Route path = '/' element={<UserList />} /> */}
        {/* <Route path = '/' element={<ReviewList />} /> */}
        {/* <Route path = '/' element={<Profile />} /> */}
        <Route path = '/' element={<Footer />} />
      </Routes>
      <div className='footer'>
        <Footer />
      </div>
    </>
  );
}

export default App;
