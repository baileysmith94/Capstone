import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const token = localStorage.getItem('token');

  return (
    <div className="nav-bar">
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
            {/* routes below will disappear when a user logs in */}
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
