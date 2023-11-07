import React, { useState, useEffect } from "react";

function ReviewCard() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);

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

  const handleClick = () => {
    if (selectedRestaurant && selectedRestaurant.id === restaurant.id) {
      setSelectedRestaurant(null); //hide reviews if the button is clicked again
      setReviews([]); // clearing reviews
    } else {
      setSelectedRestaurant(restaurant);
      fetchReviews(restaurant.id);
    }
    {selectedRestaurant && selectedRestaurant.id === restaurant.id ? "Hide Reviews" : "Reviews"}
  }

  return (
    <>
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
    </>
  );
}

export default ReviewCard;