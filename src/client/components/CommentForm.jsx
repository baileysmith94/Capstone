import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CommentBox from "./CommentList";

export default function CommentForm(reviewId) {
  const token = localStorage.getItem("token");
  const [comment, setComment] = useState("");
  const review_id = reviewId.reviewId;
  const [userId, setUserId] = useState({});
  const [userData, setUserData] = useState({});
  // console.log("THe user's id is", userId)

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
          setUserId(data.id)
          // console.log("user id:", data.id)
        } else {
          console.log(error, "Failed to fetch user data")
        }
      } catch (error) {
          throw error
        }};

    
  async function handleSubmit(e) {
    // e.preventDefault();    
    try {      
      const user_id = userData.id;
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
    <CommentBox reviewId={reviewId}
     userData={userData.id}
      userId={userId}/>
      {userData.id > 0 ? 
         <form onSubmit={handleSubmit}>
          <input
            value={comment} required
            type="text"
            name="comment_text"
            placeholder="Write a Comment..."
            onChange={(e) => setComment(e.target.value)}
          />
        

        <button type="submit">Post Comment</button>
      </form> : `Sign in the leave a comment`}
    </>
  );
}
