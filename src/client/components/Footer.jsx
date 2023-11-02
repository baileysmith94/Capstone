import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

function Footer() {
  return (
     <>
     {/* this currently isn't working right, but the footer appears */}
     <p>I am a footer</p>
    {localStorage.token ? (
        <div>
            <p>You are logged in</p>
        </div>
    ) : (
        <div>
            <p>Please log in to make a review</p>
        </div>
    )}
    </>
  );
}

export default Footer;