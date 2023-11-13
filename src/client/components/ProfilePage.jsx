import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch user data with reviews
        const userDataResponse = await fetch(
          "http://localhost:3000/api/users/me",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (userDataResponse.ok) {
          const userData = await userDataResponse.json();
          setUserData(userData);

          // Check if userData.reviews is an array before setting userReviews
          const reviewsResponse = Array.isArray(userData.reviews)
            ? await Promise.all(
                userData.reviews.map(async (review) => {
                  const restaurantResponse = await fetch(
                    `http://localhost:3000/api/restaurants/${review.restaurant_id}`
                  );
                  const restaurantData = await restaurantResponse.json();
                  console.log("Restaurant Data:", restaurantData); // Log restaurantData
                  return {
                    ...review,
                    restaurant_name:
                      restaurantData.restaurant.name || "Unknown Restaurant",
                    restaurant_image_url:
                      restaurantData.restaurant.image_url || null,
                  };
                })
              )
            : [];
          console.log("user reviews response", reviewsResponse);

          setUserReviews(reviewsResponse);
        } else {
          // Handle error fetching user data
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-page container">
      <div className="card mb-3">
        <div className="card-body">
          <h1 className="card-title mb-4">Welcome, {userData?.name}!</h1>
          {userData && (
            <div>
              <p className="card-text">
                <strong>Email:</strong> {userData.email}
              </p>
              {/* Add other user data fields as needed */}
            </div>
          )}
        </div>
      </div>

      {/* Reviews Card */}
      <div className="card mt-4">
        <div className="card-body all-reviews">
          <h5 className="card-title mb-3" style={{ color: "white" }}>
            Reviews
          </h5>

          {userReviews.length > 0 ? (
            userReviews.map((review, index) => (
              <div key={review.id} className="card mb-3 ">
                <div className="card-body single-review">
                  <h3 className="card-subtitle mb-2 text-muted">
                    {review.restaurant_name || "Unknown Restaurant"}
                  </h3>
                  {review.restaurant_image_url && (
                    <div>
                      <img
                        src={review.restaurant_image_url}
                        alt="Restaurant Image"
                        className="img-fluid mb-3"
                      />
                    </div>
                  )}
                  <p className="card-text">
                    <strong>Rating:</strong> {review.rating}
                  </p>
                  <p className='card-text color:"white"'>
                    <strong>Review:</strong> {review.review_text}
                  </p>
                  {index < userReviews.length - 1 && <hr />}{" "}
                  {/* Add a line separator for all reviews except the last one */}
                </div>
              </div>
            ))
          ) : (
            <p className="card-text">
              {userReviews === null
                ? "Error fetching reviews. Please try again later."
                : "No reviews yet."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
