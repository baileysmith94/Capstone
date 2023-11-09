import React, {useState} from "react";
import DropDownPicker from 'react-native-dropdown-picker';
// npm install react-native-dropdown-picker

export default function CreateReviewForm(token, {reviews, setReviews}) {
    const [user_id, setUser_id] = useState("");
    const [restaurant_id, setRestaurant_id] = useState("");
    const [rating, setRating] = useState("");
    const [review_text, setReview_text] = useState("");
    const [image_url, setImage_url]= useState(null);
    const [error, setError] = useState(null);
    const [noSuccess, setNoSuccess] =useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: "Scott's Sandwiches", value: "Scott's Sandwiches"},
      {label: 'Peanut Garden', value: 'Peanut Garden'},
      {label: 'Wisconsin Roadhouse', value: 'Wisconsin Roadhouse'},
      {label: 'Taco King', value: 'Taco King'},
      {label: 'Poultry Roaster', value: 'Poultry Roaster'},
      {label: 'Gorgonzola Express', value: 'Gorgonzola Express'}
    ]);

    const createReview = async()=>{
      try{
        const response = await fetch(`http://localhost:3000/api/users/create_review`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              review: {
                rating: rating, 
                review_text: review_text, 
                image_url: image_url
              }
            })
        });
        const result = await response.json();
        if(result.success) {

          const newReviewList = [...reviews, result.data.newReview];
          setReviews(newReviewList)
          setUser_id(user_id);
          setRating("");
          setReview_text("");
          setImage_url(null);
        }
        return result;
      }catch (error) {
        setError(result.error.message);
        setNoSuccess("You must log in to leave a review")
      }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        createReview();
    }

    return (
        <>
        <h2>New Review</h2>
        <form onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          {noSuccess && <p>{noSuccess}</p>}
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onClick={(e) => setRestaurant_id(e.target.value)}
          />
          <input
            value={rating}
            type="int"
            name="rating"
            placeholder="Rating"
            onChange={(e) => setRating(e.target.value)}
          /><br/>
          <input
            value={review_text}
            type="text"
            name="review_text"
            placeholder="Please tell us about your expirience"
            onChange={(e) => setReview_text(e.target.value)}
          /><br/>
          <input
            value={image_url}
            type="img"
            name="image_url"
            placeholder="Upload a picture"
            onChange={(e) => setImage_url(e.target.value)}
          /><br/>
          <button>Submit</button>
        </form>
        <div>
              <h4>Review for {restaurant_id.name}</h4>
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
                // <p>Click here to see your other reviews</p>
                

              )}
            </div>
        </>
      );

};