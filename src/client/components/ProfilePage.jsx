import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfilePage = () => {
  // state variables to store user data & reviews
  const [userData, setUserData] = useState({});
  const [userReviews, setUserReviews] = useState([]);


  // useEffect hook fetches user data and mounts it to the component
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

          // Check if userData.reviews is an array before setting userReviews. Reviews are contained in the user body thats coming from the server. We also must get information about the restaurant, see line 35
          const reviewsResponse = Array.isArray(userData.reviews)
            ? await Promise.all(
                userData.reviews.map(async (review) => {
                  const restaurantResponse = await fetch(
                    `http://localhost:3000/api/restaurants/${review.restaurant_id}`
                  );
                  const restaurantData = await restaurantResponse.json();
                  console.log("Restaurant Data:", restaurantData);
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
              {/* Add other user data fields - like admin if theyre an admin. */}
            </div>
          )}
        </div>
      </div>

      {/* Reviews Card */}
      <div className="card mt-4">
        <div className="card-body all-reviews">
          <h5 className="card-title mb-3" style={{ color: "white" }}>
            My Reviews
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
                  {/* Adds a line separator for all reviews except the last one */}
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
