import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ViewComments = ({ reviewId, userData }) => {
  const [userComments, setUserComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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

  const handleDelete = (commentId) => {
    setCommentToDelete(commentId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/comments/${commentToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`Error deleting comment: ${response.statusText}`);
      } else {
        setUserComments((prevComments) => prevComments.filter((comment) => comment.id !== commentToDelete));
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };

  const cancelDelete = () => {
    setCommentToDelete(null);
    setShowDeleteModal(false);
  };

  const handleEdit = async (commentId) => {
    setEditCommentId(commentId);
    setShowEditModal(true);

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

        setShowEditModal(false);
      }
    } catch (error) {
      console.error('Error updating comment:', error.message);
    }
  };

  const cancelEdit = () => {
    setEditCommentId(null);
    setShowEditModal(false);
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
                    onClick={() => handleDelete(comment.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='card-text'>No comments yet!</p>
        )}

        {/* Bootstrap Modal for Editing Comment */}
        <Modal show={showEditModal} onHide={cancelEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              value={editCommentText}
              onChange={(e) => setEditCommentText(e.target.value)}
              className='form-control'
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Bootstrap Modal for Deleting Comment */}
        <Modal show={showDeleteModal} onHide={cancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this comment?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDelete}>
              Close
            </Button>
            <Button variant="primary" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ViewComments;
