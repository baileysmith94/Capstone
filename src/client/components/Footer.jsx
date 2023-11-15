import React from 'react';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

function Footer() {
  const isLoggedIn = localStorage.token; // Check if the user is logged in

  const logout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    window.location = '/';
  };

  return (
    <div>
      {isLoggedIn && (
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            width: 'auto',
            backgroundColor: 'transparent',
            padding: '10px',
            textAlign: 'start',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <MeetingRoomIcon
            style={{ cursor: 'pointer', color: '#b50000', fontSize: '2rem' }}
            onClick={logout}
          />
        </div>
      )}
    </div>
  );
}

export default Footer;
