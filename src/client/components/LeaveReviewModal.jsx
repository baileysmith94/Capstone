import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const LeaveReviewModal = ({ userId, restaurantId, onReviewSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = async () => {
    try {
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

        // Call the onReviewSubmit prop to handle the submission
        if (onReviewSubmit) {
          onReviewSubmit(createdReview);
        }

      
        handleClose();
      } else {
        console.error("Failed to submit review. Status:", response.status);

        
        if (response.status === 401) {
          setShowSuccessMessage(false);
          setShowLoginMessage(true);
        } else {
          setShowSuccessMessage(false);
          setShowLoginMessage(false);
        }
      }
    } catch (error) {
      console.error("Error submitting review:", error);

      // Show login message if user is not logged in
      if (error.status === 401) {
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
    </>
  );
};

export default LeaveReviewModal;
