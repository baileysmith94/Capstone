import { useEffect, useState } from "react";

export default function CommentForm(reviewId) {
  const token = localStorage.getItem("token");
  const [comment, setComment] = useState("");
  const review_id = reviewId.reviewId.reviewId
  const [userData, setUserData] = useState({})
  
  console.log("Token", token);
  console.log("user data", userData);
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
          setUserData(data)
        } else {
          console.log(error, "Failed to fetch used data")
        }
      } catch (error) {
          console.log(error)
        }};

    useEffect(()=>{
      fetchUser();
    }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    
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
