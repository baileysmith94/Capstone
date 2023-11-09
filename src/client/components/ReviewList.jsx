import { useState, useEffect } from "react";
import { fetchReviews } from "../API";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

export default function ReviewList() {
  const { restaurantId } = useParams();
  console.log(restaurantId);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getReviewList() {
      const response = await fetchReviews(restaurantId);
      if (response.success) {
        setReviews(response.data.reviews); //not sure what this should be
      } else {
        setError(error.message);
      }
    }
    getReviewList();
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      {/* {player && <PlayerCard player={player} />} */}
      {restaurant && <ReviewCard />}
    </>
  );
}