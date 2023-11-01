import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

function Footer() {
  return (
     <>
    {localStorage.token ? (
        <div>
            <p>${firstName} is logged in</p>
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