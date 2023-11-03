import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
   <div className="navbar"> <nav>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
        <li>
          <Link to="/restaurants">Restaurants</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
}

export default NavBar;
