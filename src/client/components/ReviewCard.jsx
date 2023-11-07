import React, { useState, useEffect } from "react";

function ReviewCard() {
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

  return (
    <>
      
    </>
  );
}

export default ReviewCard;