import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const ProfilePage = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:3000/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          // Handle error
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='profile-page container mt-5'>
      <div className='card'>
        <div className='card-body'>
          <h1 className='card-title mb-4'>Welcome, {userData?.name}!</h1>
          {userData && (
            <div>
              <p className='card-text'>
                <strong>Name:</strong> {userData.name}
              </p>
              <p className='card-text'>
                <strong>Email:</strong> {userData.email}
              </p>
              {/* Add other user data fields as needed */}
            </div>
          )}
        </div>
      </div>

      {/* Reviews Card */}
      <div className='card mt-4'>
        <div className='card-body'>
          <h5 className='card-title mb-3'>Reviews</h5>
          <p className='card-text'>
            The developers are working on displaying your reviews. Please be patient, fool!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
