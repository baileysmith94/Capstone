import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NewRestaurantForm from "./NewRestaurantForm";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import RestaurantList from "./RestaurantList"; // Make sure to import the RestaurantList component

const ProfilePage = () => {
  // state variables to store user data, reviews, and restaurants
  const [userData, setUserData] = useState({});
  const [userReviews, setUserReviews] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // useEffect hook fetches user data, reviews, and restaurants
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

          // Fetch user reviews
          const reviewsResponse = Array.isArray(userData.reviews)
            ? await Promise.all(
                userData.reviews.map(async (review) => {
                  const restaurantResponse = await fetch(
                    `http://localhost:3000/api/restaurants/${review.restaurant_id}`
                  );
                  const restaurantData = await restaurantResponse.json();
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
          setUserReviews(reviewsResponse);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchAllRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/restaurants");
        if (response.ok) {
          const data = await response.json();
          setRestaurants(data.restaurants);
        } else {
          console.error("Failed to fetch restaurants");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchUserData();
    fetchAllRestaurants();
  }, []);

  // Function to handle restaurant deletion
  const handleDeleteRestaurant = async (restaurantId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/restaurants/${restaurantId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Update the list of restaurants after deletion
        const updatedRestaurants = restaurants.filter(
          (restaurant) => restaurant.id !== restaurantId
        );
        setRestaurants(updatedRestaurants);
      } else {
        console.error("Failed to delete restaurant");
      }
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  return (
    <div className="profile-page container">
      <div className="card mb-3">
        <div className="card-body">
          <h1 className="card-title mb-4 fade-in">Welcome, {userData?.name}!</h1>
          {userData && (
            <div>
              <p className="card-text">
                <strong>Email:</strong> {userData.email}
              </p>
              {/* Add other user data fields - like admin if they're an admin. */}
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
              <div key={review.id} className="card mb-3">
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
                  <p className='card-text' style={{ color: "white" }}>
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

      {/* Restaurant List Card */}
      {userData && Object.keys(userData).length > 0 && userData.is_admin && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title mb-3" style={{ color: "white" }}>
              All Restaurants
            </h5>

            <RestaurantList userData={userData} limit={10} />
          </div>
        </div>
      )}

      {/* Render the list only if the user is an admin */}
      {userData && Object.keys(userData).length > 0 && userData.is_admin && (
        <ul className="list-group">
          {restaurants.map((restaurant) => (
            <li key={restaurant.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <span>{restaurant.name}</span>
                {/* Render delete icon only for admin users */}
                {userData.is_admin && (
                  <span>
                    <MeetingRoomIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => setDeleteConfirmation(restaurant.id)}
                    />
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        show={deleteConfirmation !== null}
        onHide={() => setDeleteConfirmation(null)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this restaurant?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setDeleteConfirmation(null)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteRestaurant(deleteConfirmation);
              setDeleteConfirmation(null);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Render the NewRestaurantForm only if the user is an admin */}
      {userData && Object.keys(userData).length > 0 && userData.is_admin && (
        <div className="card mt-3">
          <NewRestaurantForm />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
