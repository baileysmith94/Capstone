import {getReviewById} from "..API/reviews.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateReviewForm from "./myReviewForm";
import { searchParam } from "react-router-dom/dist/dom";

export default function myReviews () {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getMyReviews() {
            const response = await getReviewById();
            if (response.success) {
                setReviews(response.data.reviews)
            } else {
                setError(response.error.message)
            }
        }
        getMyReviews();
    }, []);

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
        {reviewsToDisplay.map((review) =>{
                return<>
                <div id="review">
                    <h2 key={review.id}>{restaurant.name}</h2>
                    <h3>Rating:{restaurant.rating}</h3>
                    <p className="review_text">{review_text}</p>
                    <p></p>
                    {/* link to comments, what is the link? */}
                    {/* <Link to={`/send-message/${review.user_id.username}`}>Make a comment</Link> */}
                </div>
                </>
            })}

        </>
    )
}