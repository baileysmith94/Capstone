import React from 'react';

function Footer() {
  const isLoggedIn = localStorage.token; // Check if the user is logged in

  const logout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    window.location = '/';
  };

  return (
    <div className='login-status'>
      {isLoggedIn ? (
        <div className='log-out-button'>
          <p>You are logged in</p>
          <button onClick={logout}>Log Out?</button>
        </div>
      ) : (
        <a href="/login">Please login to make a review</a>
      )}
    </div>
  );
}

export default Footer;
