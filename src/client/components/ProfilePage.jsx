import React, { useState, useEffect } from 'react';

function ProfilePage() {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Get the token from local storage
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
    } else {
      setErrorMessage('Please create an account to view the profile.');
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Error fetching user data:', response.statusText);
        setErrorMessage('Error fetching user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      setErrorMessage('Error fetching user data');
    }
  };

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        userData && (
          <div>
            <p>Name: {userData.user.name}</p>
            <p>Email: {userData.user.email}</p>
            {/* Other user data */}
          </div>
        )
      )}
    </div>
  );
}

export default ProfilePage;
