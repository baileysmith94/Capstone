import {getReviewById, destroyReview, updateReview} from "..API/reviews.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateReviewForm from "./myReviewForm";
// import { searchParam } from "react-router-dom/dist/dom";

export default function myReviews ({id}) {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [editError, setEditError] = useState(null);
    const [deletionError, setDeletionError] = useState(null);
    const [searchParam, setSearchParam] = useState("");
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (token) {
            getReviewById(reviews, token)
            .then((data) => {
                setReviews(data);
            })
            .catch((err) => {
                setError(err.message)
            });
        }
    }, [reviews])

    const handleEditReview = async (reviewId) =>{
        if (token) {
            try {
                await updateReview(reviewId, token);
                const editedReviews = reviews.filter(
                    (review) =>review._id !== reviewId
                );
                setReviews(editedReviews);
            } catch (error) {
                setEditError("Error updating review. Please try again.");
            }
        }
    }

    const handleDeleteReview = async (reviewId) =>{
        if (token) {
            try {
                await destroyReview(reviewId, token);
                const updatedReviews = reviews.filter(
                    (review) =>review._id !== reviewId
                );
                setReviews(updatedReviews);
            } catch (error) {
                setDeletionError("Error deleting review. Please try again.");
            }
        }
    }

    const reviewsToDisplay = searchParam
    ? reviews.filter((reviews) => 
    reviews.name.toLowerCase().includes(searchParam))
    :reviews

    return (
        <>
        <div>
         <label>
           Search:{" "}
          <input type="text" 
             placeholder="search"
           onChange={(e) => setSearchParam(e.target.value.toLowerCase())}/>
         </label>
        </div>
        <CreateReviewForm reviews={reviews} setReviews={setReviews}/>
        {error && <p>{error}</p>}
        {reviewsToDisplay.map((review) =>{
                return<>
                <div id="review">
                    <h2 key={review.id}>{restaurant.name}</h2>
                    <h3>Rating:{restaurant.rating}</h3>
                    <p className="review_text">{review_text}</p>
                    {/* image url */}
                    {review.user_id === token &&(
                        <button onClick={() => handleEditReview(review._id)}>Edit Review</button>
                    )}
                    {editError && <p>{editError}</p>}
                    { isAdmin || review.user_id === token &&(
                        <button onClick={() => handleDeleteReview(review._id)}>Delete Review</button>
                    )}
                    {deletionError && <p>{deletionError}</p>}
                    
                    <button>Comment</button>
                    {/* link to comments, what is the link? */}
                    {/* <Link to={`/send-message/${review.user_id.username}`}>Comment on this</Link> */}
                </div>
                </>
            })}

        </>
    )
}