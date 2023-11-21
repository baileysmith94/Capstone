import React, { useEffect, useState } from 'react';

const ViewComments = () => {
  const [userComments, setUserComments] = useState([]);
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        if (!token) {
          
          return;
        }

        console.log('Token:', token);

        const decodedToken = decodeToken(token);
        console.log('Decoded Token:', decodedToken);

        if (decodedToken && decodedToken.id) {
          setUserId(decodedToken.id);
        }

        if (userId) {
          
          const response = await fetch(`http://localhost:3000/api/comments/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            console.error(`Error fetching user comments: ${response.statusText}`);
          } else {
            const data = await response.json();
            console.log('API Response:', data);
            setUserComments(data.comments);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserComments();
  }, [token, userId]); 

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  return (
    <div className='card mt-3'>
      <div className='card-body'>
        <h2 className='card-title'>My Comments</h2>
        {userComments && userComments.length > 0 ? (
          <ul className='list-group'>
            {userComments.map((comment) => (
              <li key={comment.id} className='list-group-item'>
                {comment.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className='card-text'>No comments yet!</p>
        )}
      </div>
    </div>
  );
};


export default ViewComments;
