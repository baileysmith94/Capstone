import React, { useState } from "react";
import { createReview } from ".../api/reviews.js";
import CommentBox from "./WriteComment";

export default function CreateReviewForm(token) {
  const [user_id, setUser_id] = useState("");
  const [restaurant_id, setRestaurant_id] = useState("");
  const [rating, setRating] = useState("");
  const [review_text, setReview_text] = useState("");
  const [image_url, setImage_url] = useState(null);
  const [error, setError] = useState(null);
  const [noSuccess, setNoSuccess] = useState("");
  const [review, setReview] = useState([]);

  const createReview = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/create_review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            review: {
              rating: rating,
              review_text: review_text,
              image_url: image_url,
            },
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        // how to set user id
        // setUser_id(${user_id});
        setReview(data.review);
        setRating("");
        setReview_text("");
        setImage_url(null);
      }
      return result;
    } catch (error) {
      setError(result.error.message);
      setNoSuccess("You must log in to leave a review");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    createReview();
  }

  return (
    // code a drop down menu to pick from restaurants
    // set restaurant id as target id
    <>
      <h2>New Review</h2>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        {noSuccess && <p>{noSuccess}</p>}
        <input
          value={rating}
          type="int"
          name="rating"
          placeholder="Rating"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          value={review_text}
          type="text"
          name="review_text"
          placeholder="Please tell us about your expirience"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          value={image_url}
          type="img"
          name="image_url"
          placeholder="Upload a picture"
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <button>Submit</button>
      </form>
      <div>
        <h4>Review for {restaurant_id.name}</h4>
        {review !== undefined && review.length > 0 ? (
          <ul>
            {review.map((review) => (
              <li key={review.id}>
                <p>Rating: {review.rating}</p>
                <p>{review.review_text}</p>
                <CommentBox reviewId={review.id} />
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading reviews...</p>
        )}
      </div>
    </>
  );
}
