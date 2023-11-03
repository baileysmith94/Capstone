import React, { useState, useEffect } from "react";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [searchParam, setSearchParam] = useState("")

  // Function to handle the "Reviews" button click - this might need to go in a seperate component... im not sure yet 
  function handleShowReviews(restaurant) {
    console.log("Restaurant ID:", restaurant.id); // Log the restaurant ID just to make sure its working
    setSelectedRestaurant(restaurant);
    fetchReviews(restaurant.id); // Fetch and set reviews for the selected restaurant
  }

  useEffect(() => {
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

    fetchRestaurants();
  }, []);

  const restaurantToDisplay = searchParam
  ? restaurants.filter((restaurants) =>
  restaurants.name.toLowerCase().includes (searchParam))
  : restaurants;

  async function fetchReviews(restaurantId) {
    try {
      const response = await fetch(`/api/reviews/${restaurantId}`);
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

  return (
    <>
    <div className="search-bar">
         <label>
           Search:{" "}
          <input type="text" 
             placeholder="search"
           onChange={(e) => setSearchParam(e.target.value.toLowerCase())}/>
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
          <button onClick={() => handleShowReviews(restaurant)}>Reviews</button>
          {selectedRestaurant && selectedRestaurant.id === restaurant.id && (
            <div>
              <h4>Reviews for {restaurant.name}</h4>
              {reviews !== undefined && reviews.length > 0 ? (
                <ul>
                  {reviews.map((review) => (
                    <li key={review.id}>
                      <p>Rating: {review.rating}</p>
                      <p>{review.review_text}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Loading reviews...</p>
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
