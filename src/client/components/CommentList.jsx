import React, { useState, useEffect, useId } from "react";
import DeleteButton from "./deleteComments";
import EditButton from "./editComment";
import "bootstrap/dist/css/bootstrap.min.css";
//pull down the review id

export default function CommentBox(reviewId, userData) {
  const [comments, setComments] = useState([]);
  console.log(reviewId.userId, reviewId.userData)
 

  async function fetchComments(reviewId) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/comments/${reviewId.reviewId.reviewId}`
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(`COMMENT DATA:`, data);
        setComments(data.comments);
      } else {
        console.error("Failed to fetch comments. Status:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchComments(reviewId);
  }, []);
  return (
    <>
      <div>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comments) => (
              <li key={comments.id}>
                <p>
                  {comments.name} says: {comments.comment}
                  {reviewId.userData == reviewId.userId && 
                  <DeleteButton commentId={comments.id} userData={userData} userId={reviewId.userId}/>}
                  {reviewId.userData == reviewId.userId && 
                  <EditButton commentId={comments.id} userData={userData}/>}
                </p>
                
              </li>
            ))}
          </ul>
        ) : (
          <p>There are no comments yet</p>
        )}
      </div>
    </>
  );
}
// render the container for the comments
// then map the data to a list (temporary... probably)
