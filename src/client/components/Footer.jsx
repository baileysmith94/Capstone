import React from 'react';

function Footer() {
  const isLoggedIn = localStorage.token; // Check if the user is logged in

  const logout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    window.location = '/restaurants';
  };

  return (
    <div className='login-status'>
      {isLoggedIn ? (
        <div>
          <p>You are logged in</p>
          <button onClick={logout}>Log Out?</button>
        </div>
      ) : (
        <p>Please sign in to leave a review</p>
      )}
    </div>
  );
}

export default Footer;
