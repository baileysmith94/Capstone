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
          <li>
            <Link to="/profile">profile</Link>
          </li>
          {token ? (
            <>
              {/* OTHER ROUTES-LIKE PROFILE-WOULD GO HERE :) */}
            </>
          ) : (
            <>
              <li>
                {/* these routes go away when you are logged in */}
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
