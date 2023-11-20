import { useEffect, useState } from "react";
import CommentBox from "./CommentList";

export default function CommentForm(reviewId) {
  const token = localStorage.getItem("token");
  const [comment, setComment] = useState("");
  const review_id = reviewId.reviewId
  const [userData, setUserData] = useState({})
  console.log("REVIEW ID", review_id)
  // console.log("Token", token);
  // console.log("user data", userData);
  useEffect(()=>{
    fetchUser();
  }, [])

  async function fetchUser() {
    try {
      
      const userDataResponse = await fetch("http://localhost:3000/api/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        
        });
        if (userDataResponse.ok){
          const data = await userDataResponse.json();
          // console.log("User Data:", data)
          setUserData(data)
        } else {
          console.log(error, "Failed to fetch user data")
        }
      } catch (error) {
          console.log(error)
        }};

    
  async function handleSubmit(e) {
    // e.preventDefault();    
    try {      
      const user_id = userData.id;
      // console.log("User ID", user_id)
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
    <><CommentBox reviewId={reviewId}/>
      <form onSubmit={handleSubmit}>

          <input
            value={comment} required
            type="text"
            name="comment_text"
            placeholder="Write a Comment..."
            onChange={(e) => setComment(e.target.value)}
          />
        

        <button type="submit">Post Comment</button>
      </form>
    </>
  );
}
