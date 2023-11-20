import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import StarIcon from '@mui/icons-material/Star';

const LeaveReviewModal = ({ userId, restaurantId, onReviewSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showAlreadyReviewedMessage, setShowAlreadyReviewedMessage] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    const checkUserReview = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`/api/reviews/user/${userId}/restaurant/${restaurantId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userReview = await response.json();
          setHasReviewed(userReview !== null);
        } else {
          console.error("Failed to check user review status");
        }
      } catch (error) {
        console.error("Error checking user review status:", error);
      }
    };

    checkUserReview();
  }, [userId, restaurantId]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = async () => {
    try {
      // checks if the user has already reviewed the restaurant
      if (hasReviewed) {
        // displays an alert or handle the case where the user has already reviewed
        setShowAlreadyReviewedMessage(true);
        return;
      }

      const reviewData = {
        user_id: userId,
        restaurant_id: restaurantId,
        rating,
        review_text: reviewText,
      };

      const token = localStorage.getItem("token");

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        const createdReview = await response.json();
        console.log("Review submitted successfully:", createdReview);

        setShowSuccessMessage(true);
        setShowLoginMessage(false);

        // call the onReviewSubmit prop to handle the submission.
        if (onReviewSubmit) {
          onReviewSubmit(createdReview);
        }

        handleClose();
      } else {
        console.error("Failed to submit review. Status:", response.status);

        if (response.status === 400) {
          setShowAlreadyReviewedMessage(true);
        } else if (response.status === 500) {
          setShowSuccessMessage(false);
          setShowLoginMessage(true);
        } else {
          setShowSuccessMessage(false);
          setShowLoginMessage(false);
        }
      }
    } catch (error) {
      console.error("Error submitting review:", error);

      // show login message if user is not logged in
      if (error.status === 500) {
        setShowSuccessMessage(false);
        setShowLoginMessage(true);
      } else {
        setShowSuccessMessage(false);
        setShowLoginMessage(false);
      }
    }
  };

  return (
    <>
      <Button
        variant="danger"
        size="lg"
        className="me-2"
        onClick={handleShow}
      >
        Leave a Review
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Leave a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <div>
                {Array.from({ length: Math.round(rating) }, (_, index) => (
                  <StarIcon key={index} />
                ))}
              </div>
              <Form.Control
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formReviewText">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="btn btn-danger"
          >
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Message */}
      <Alert
        variant="success"
        show={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
        dismissible
      >
        Review created successfully!
      </Alert>

      {/* Login Message */}
      <Alert
        variant="warning"
        show={showLoginMessage}
        onClose={() => setShowLoginMessage(false)}
        dismissible
      >
        You need to log in to leave a review.
      </Alert>

      {/* Already Reviewed Message */}
      <Alert
        variant="warning"
        show={showAlreadyReviewedMessage}
        onClose={() => setShowAlreadyReviewedMessage(false)}
        dismissible
      >
        You have already reviewed this restaurant.
      </Alert>
    </>
  );
};

export default LeaveReviewModal;
