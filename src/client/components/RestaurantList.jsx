import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

function RestaurantList({ showSearchBar = true, limit }) {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchRestaurants() {
    try {
      const response = await fetch("/api/restaurants");
      if (response.ok) {
        const data = await response.json();
        setRestaurants(data.restaurants);
      } else {
        console.error("Failed to fetch restaurants");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function fetchReviews(restaurantId) {
    try {
      const response = await fetch(`/api/restaurants/${restaurantId}/reviews`);
      if (response.ok) {
        const data = await response.json();
        console.log("Received data:", data);
        setReviews(data.reviews);
      } else {
        console.error("Failed to fetch reviews. Status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const restaurantToDisplay = searchParam
    ? restaurants
        .filter((restaurant) =>
          restaurant.name.toLowerCase().includes(searchParam)
        )
        .slice(0, limit)
    : restaurants.slice(0, limit);

  return (
    <>
      {showSearchBar && (
        <div className="search-bar">
          <label>
            Search:{" "}
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
            />
          </label>
        </div>
      )}

      <div className="restaurant-list">
        {restaurantToDisplay.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-item">
            <h3>{restaurant.name}</h3>
            <p>{restaurant.address}</p>
            <p>Average Rating: {restaurant.average_rating}</p>
            <img
              src={restaurant.image_url}
              alt={restaurant.name}
              className="restaurant-image"
            />
            <button
              onClick={() => {
                if (
                  selectedRestaurant &&
                  selectedRestaurant.id === restaurant.id
                ) {
                  setSelectedRestaurant(null);
                  setReviews([]);
                  setIsModalOpen(false);
                } else {
                  setSelectedRestaurant(restaurant);
                  fetchReviews(restaurant.id);
                  setIsModalOpen(true);
                }
              }}
            >
              {selectedRestaurant && selectedRestaurant.id === restaurant.id
                ? "Hide Reviews"
                : "Reviews"}
            </button>
          </div>
        ))}
      </div>

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Reviews for {selectedRestaurant && selectedRestaurant.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reviews.length > 0 ? (
            <ul className="list-group reviews">
              {reviews.map((review) => (
                <li key={review.id} className="list-group-item">
                  <div className="mb-1">
                    <strong>Author:</strong> {review.user_name}
                  </div>
                  <div className="mb-1">
                    <strong>Rating:</strong> {review.rating}
                  </div>
                  <div>{review.review_text}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available for this restaurant.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RestaurantList;
