import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch user data
        const userDataResponse = await fetch('http://localhost:3000/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (userDataResponse.ok) {
          const userData = await userDataResponse.json();
          setUserData(userData);

          // Check if userData.reviews is an array before setting userReviews
          const reviewsResponse = Array.isArray(userData.reviews)
            ? userData.reviews
            : [];

          setUserReviews(reviewsResponse);
        } else {
          // Handle error fetching user data
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='profile-page container'>
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
          {userReviews.length > 0 ? (
            userReviews.map((review) => (
              <div key={review.id}>
                <p className='card-text'>
                  <strong>Review:</strong> {review.review_text}
                </p>
                <p className='card-text'>
                  <strong>Rating:</strong> {review.rating}
                </p>
                {review.restaurant_id && (
                  <p className='card-text'>
                    <strong>Restaurant Name:</strong> {review.restaurant_name}
                  </p>
                )}
                {/* Add other review data fields as needed */}
              </div>
            ))
          ) : (
            <p className='card-text'>
              {userReviews === null
                ? 'Error fetching reviews. Please try again later.'
                : 'No reviews yet.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
