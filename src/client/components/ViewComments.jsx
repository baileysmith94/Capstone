import React, { useEffect, useState } from 'react';

const ViewComments = () => {
  const [userComments, setUserComments] = useState([]);
  const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
  const userId = 1; // Replace with your actual logic to get the user ID

  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        if (!token || !userId) {
          // If the token or userId is not available, do not make the API call
          return;
        }

        const response = await fetch(`http://localhost:3000/api/comments/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching user comments: ${response.statusText}`);
        }

        const { comments } = await response.json();
        setUserComments(comments);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserComments();
  }, [token, userId]); // Dependency array includes token and userId

  return (
    <div>
      <h2>Your Comments</h2>
      {userComments && userComments.length > 0 ? (
        <ul>
          {userComments.map((comment) => (
            <li key={comment.id}>{comment.comment}</li>
          ))}
        </ul>
      ) : (
        <p>No comments found.</p>
      )}
    </div>
  );
};

export default ViewComments;
