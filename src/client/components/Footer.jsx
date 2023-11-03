import React from 'react';

function Footer() {
  return (
     <>
     {/* this currently isn't working right, but the footer appears */}
    {localStorage.token ? (
        <div className='login-status'>
            <p>You are logged in</p>
        </div>
    ) : (
        <div className='login-status'>
            <p>Please log in to make a review</p>
        </div>
    )}
    </>
  );
}

export default Footer;