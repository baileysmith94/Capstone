import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'bootstrap/js/dist/modal';

const ViewComments = ({ reviewId, userData }) => {
  const [userComments, setUserComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        if (!token) {
          return;
        }

        const decodedToken = decodeToken(token);

        if (decodedToken && decodedToken.id) {
          const userId = decodedToken.id;
          const response = await fetch(`http://localhost:3000/api/comments/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            console.error(`Error fetching user comments: ${response.statusText}`);
          } else {
            const data = await response.json();
            setUserComments(data.comments);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserComments();
  }, [token]);

  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`Error deleting comment: ${response.statusText}`);
      } else {
        setUserComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      }
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };

  const handleEdit = async (commentId) => {
    setEditCommentId(commentId);
    const modal = new Modal(document.getElementById('editCommentModal'));
    modal.show();

    const commentToEdit = userComments.find((comment) => comment.id === commentId);
    setEditCommentText(commentToEdit.comment);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/comments/${editCommentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: editCommentText }),
      });

      if (!response.ok) {
        console.error(`Error updating comment: ${response.statusText}`);
      } else {
        setUserComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === editCommentId ? { ...comment, comment: editCommentText } : comment
          )
        );

        const modal = Modal.getInstance(document.getElementById('editCommentModal'));
        modal.hide();
      }
    } catch (error) {
      console.error('Error updating comment:', error.message);
    }
  };

  return (
    <div className='card mt-3'>
      <div className='card-body'>
        <h2 className='card-title'>My Comments</h2>
        {userComments && userComments.length > 0 ? (
          <ul className='list-group'>
            {userComments.map((comment) => (
              <li
                key={comment.id}
                className='list-group-item d-flex align-items-center justify-content-between'
              >
                {comment.comment}
                <div>
                  <EditIcon
                    onClick={() => handleEdit(comment.id)}
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                  />
                  <DeleteIcon
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this comment?')) {
                        handleDelete(comment.id);
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='card-text'>No comments yet!</p>
        )}

        {/* Bootstrap Modal - MUI was being weird... */}
        <div className='modal fade' id='editCommentModal' tabIndex='-1'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Edit Comment</h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                <textarea
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                  className='form-control'
                ></textarea>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={handleSaveEdit}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewComments;
