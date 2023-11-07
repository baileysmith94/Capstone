import React, { useState, useEffect } from "react";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [searchParam, setSearchParam] = useState("");

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
        console.log('Received data:', data);
        setReviews(data.reviews);
      } else {
        console.error('Failed to fetch reviews. Status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const restaurantToDisplay = searchParam
    ? restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchParam)
      )
    : restaurants;

  return (
    <>
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

      <div className="restaurant-list">
        {restaurantToDisplay.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-item">
            <h3>{restaurant.name}</h3>
            <p>{restaurant.address}</p>
            <img
              src={restaurant.image_url}
              alt={restaurant.name}
              className="restaurant-image"
            />
            <button onClick={() => {
              if (selectedRestaurant && selectedRestaurant.id === restaurant.id) {
                setSelectedRestaurant(null); // Toggle to hide reviews if the button is clicked again
                setReviews([]); // Clear the reviews
              } else {
                setSelectedRestaurant(restaurant);
                fetchReviews(restaurant.id);
              }
            }}>
              {selectedRestaurant && selectedRestaurant.id === restaurant.id ? "Hide Reviews" : "Reviews"}
            </button>
            {selectedRestaurant && selectedRestaurant.id === restaurant.id && (
              <div>
                <h4>Reviews for {restaurant.name}</h4>
                {reviews.length > 0 ? (
                  <ul>
                    {reviews.map((review) => (
                      <li key={review.id}>
                        <p>Rating: {review.rating}</p>
                        <p>{review.review_text}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No reviews available for this restaurant.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default RestaurantList;
