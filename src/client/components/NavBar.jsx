import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

function NavBar() {
  const token = localStorage.getItem('token');
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleToggleClick = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLinkClick = () => {
    // Close the navbar when a link is clicked
    setIsNavbarOpen(false);
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the home page or login page
    window.location = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        
        <Link className="navbar-brand" to="/">
          <img src="/images/navlogo.png" alt="Logo" height="30" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleToggleClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse justify-content-end ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/restaurants" onClick={handleLinkClick}>
                Restaurants
              </Link>
            </li>
            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/me" onClick={handleLinkClick}>
                  Profile
                </Link>
              </li>
            )}
            {token ? (
              <>
                {/* OTHER ROUTES-LIKE PROFILE-WOULD GO HERE :) */}
                <li className="nav-item">
                  <MeetingRoomIcon
                    style={{ cursor: 'pointer', color: '#b50000', fontSize: '2rem', marginLeft: '1rem' }}
                    onClick={handleLogout}
                  />
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={handleLinkClick}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" onClick={handleLinkClick}>
                    SignUp
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
