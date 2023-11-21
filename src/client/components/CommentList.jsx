import React, { useState, useEffect } from "react";
import DeleteButton from "./deleteComments";
import EditButton from "./editComment";
import "bootstrap/dist/css/bootstrap.min.css";
//pull down the review id

export default function CommentBox(reviewId) {
  const [comments, setComments] = useState([]);
  console.log(`the review ID is `, reviewId.reviewId)
  console.log(`HERES YA COMMENTS`, comments);
  // get the comments that relate to the review's reviewid

  async function fetchComments(reviewId) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/comments/${reviewId.reviewId.reviewId}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(`COMMENT DATA:`, data);
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
                  <DeleteButton commentId={comments.id}/>
                  <EditButton commentId={comments.id}/>
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
