import React, {useState} from "react";
import { createReview } from ".../api/reviews.js"

export default function CreateReviewForm(SHOULD ANYTHING BE PASSED IN HERE) {
    const [user_id, setUser_id] = useState("");
    const [restaurant_id, setRestaurant_id] = useState("");
    const [rating, setRating] = useState("");
    const [review_text, setReview_text] = useState("");
    const [image_url, setImage_url]= useState(null);
    const [error, setError] = useState(null);
    const [noSuccess, setNoSuccess] =useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        // is the (user_id, restaurant_id, rating, review_text, image_url)correct?
        const APIData = await createReview(user_id, restaurant_id, rating, review_text, image_url);
        if(APIData.success) {
            // need help here!
            const reviews = [];

            setRating("");
            setReview_text("");
            setImage_url(null);
        } else {
            setError(APIData.error.message);
            setNoSuccess("You must log in to leave a review")
        }
    }

    return (

      // code a drop down menu to pick from restaurants
        <>
        <h2>New Review</h2>
        <form onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          {noSuccess && <p>{noSuccess}</p>}
          {/* how to pick a restaurant to review? */}
          <input
            value={rating}
            type="int"
            name="rating"
            placeholder="Rating"
            onChange={(e) => setTitle(e.target.value)}
          /><br/>
          <input
            value={review_text}
            type="text"
            name="review_text"
            placeholder="Please tell us about your expirience"
            onChange={(e) => setDescription(e.target.value)}
          /><br/>
          <input
            value={image_url}
            type="img"
            name="image_url"
            placeholder="Upload a picture"
            onChange={(e) => setLocation(e.target.value)}
          /><br/>
          <button>Submit</button>
        </form>
        </>
      );

}