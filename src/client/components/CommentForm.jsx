import { useState } from "react";

export default function CommentForm(reviewId) {
  const [comment, setComment] = useState("");
  const review_id = reviewId.reviewId.reviewId
  

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      
      const user_id = 1;
      console.log(review_id);
      console.log(user_id);
      console.log(comment);
      const response = await fetch(`http://localhost:3000/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          
           user_id,
             review_id,
            comment,
          
        }),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        console.log("failed to fetch", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          {" "}
          <input
            value={comment}
            placeholder="Write a Comment..."
            onChange={(e) => setComment(e.target.value)}
          />
        </label>

        <button type="submit">Post Comment</button>
      </form>
    </>
  );
}
