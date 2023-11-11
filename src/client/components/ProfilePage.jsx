import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:3000/api/users/me', {
          headers: {
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          
        }
      } catch (error) {
        console.error('Error fetching user data:');
      }
    };

    fetchUserData();
  }, []); 

  return (
    <div className='profile-page'>
      <h1>Welcome</h1>
      {userData && (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Add other user data fields as needed */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
