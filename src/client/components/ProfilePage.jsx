import React, { useState, useEffect } from 'react';

function ProfilePage() {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    //get the token from local
    const storedToken = localStorage.getItem("token");

    if (storedToken) {

      setToken(storedToken);
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
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  return (
    <div className='profile-page'>
      <h2>User Profile</h2>
      {userData && (
        <div>
          <p>Name: {userData.user.name}</p>
          <p>Email: {userData.user.email}</p>
          {/* Other user data */}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
