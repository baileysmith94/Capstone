import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const token = localStorage.getItem('token');

  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <Link to="/restaurants">Restaurants</Link>
          </li>
          {token && (
            <li>
              <Link to="/me">Profile</Link>
            </li>
          )}
          {token ? (
            <>
              {/* OTHER ROUTES-LIKE PROFILE-WOULD GO HERE :) */}
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
