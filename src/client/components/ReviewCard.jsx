import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ReviewCard() {
  const navigate = useNavigate();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);

  // async function fetchReviews(restaurantId) {
  //   try {
  //     const response = await fetch(`/api/restaurants/${restaurantId}/reviews`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('Received data:', data);
  //       setReviews(data.reviews);
  //     } else {
  //       console.error('Failed to fetch reviews. Status:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }
  async function handleDelete() {
    try {
      const result = await deleteReview();
      console.log(result);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  // const handleClick = () => {
  //   if (selectedRestaurant && selectedRestaurant.id === restaurant.id) {
  //     setSelectedRestaurant(null); //hide reviews if the button is clicked again
  //     setReviews([]); // clearing reviews
  //   } else {
  //     setSelectedRestaurant(restaurant);
  //     fetchReviews(restaurant.id);
  //   }
  //   {selectedRestaurant && selectedRestaurant.id === restaurant.id ? "Hide Reviews" : "Reviews"}
  // }

  // <button onClick={handleClick}>Reviews</button>

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
          <button onClick={handleDelete}>Delete Player</button>
        </div>
      )}
    </>
  );
}

export default ReviewCard;