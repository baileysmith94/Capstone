import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RestaurantList from "./RestaurantList";
import NewRestaurantForm from "./NewRestaurantForm";
import UserList from "./userlist";
import ViewComments from "./ViewComments";


const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [userReviews, setUserReviews] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [deleteRest, setDeleteRest] = useState(null);
  const [editRestaurantId, setEditRestaurantId] = useState(null);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showReviews, setShowReviews] = useState(true);
  const [editReviewId, setEditReviewId] = useState(null);
  const [editRating, setEditRating] = useState(null);
const [editText, setEditText] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userDataResponse = await fetch("http://localhost:3000/api/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (userDataResponse.ok) {
          const userData = await userDataResponse.json();
          setUserData(userData);

          if (userData.id) {
            const reviewsResponse = await fetch(`http://localhost:3000/api/reviews/user/${userData.id}`);
            if (reviewsResponse.ok) {
              const reviewsData = await reviewsResponse.json();
              const reviewsWithRestaurants = await Promise.all(
                reviewsData.userReviews.map(async (review) => {
                  try {
                    const restaurantResponse = await fetch(`http://localhost:3000/api/restaurants/${review.restaurant_id}`);
                    if (restaurantResponse.ok) {
                      const restaurantData = await restaurantResponse.json();
                      return {
                        ...review,
                        restaurant_name: restaurantData.restaurant.name || "Unknown Restaurant",
                        restaurant_image_url: restaurantData.restaurant.image_url || null,
                      };
                    } else {
                      console.error(`Failed to fetch restaurant details for review ID ${review.id}`);
                      return review; 
                    }
                  } catch (restaurantError) {
                    console.error(`Error fetching restaurant details for review ID ${review.id}:`, restaurantError);
                    return review; 
                  }
                })
              );
              setUserReviews(reviewsWithRestaurants);
            } else {
              console.error("Failed to fetch user reviews");
            }
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data and reviews:", error);
      }
    };

    const fetchAllRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/restaurants");
        if (response.ok) {
          const data = await response.json();
          setRestaurants(data.restaurants);
        } else {
          console.error("Failed to fetch restaurants");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchData();
    fetchAllRestaurants();
  }, []);

  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        const updatedReviews = userReviews.filter(
          (review) => review.id !== reviewId
        );
        setUserReviews(updatedReviews);
      } else {
        console.error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    } finally {
      setDeleteConfirmation(null); // Clear the deleteConfirmation state
    }
  };
  
  const handleDeleteRestaurant = async (restaurantId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/restaurants/${restaurantId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedRestaurants = restaurants.filter(
          (restaurant) => restaurant.id !== restaurantId
        );
        setRestaurants(updatedRestaurants);
      } else {
        console.error("Failed to delete restaurant");
      }
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
    // window.location.reload();
  };

  const handleEditRestaurant = (restaurantId) => {
    setEditRestaurantId(restaurantId);
  };

  const handleUpdateRestaurant = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/restaurants/${editRestaurantId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Restaurant updated successfully!");
        setEditRestaurantId(null);
        window.location.reload();
      } else {
        console.error("Failed to update restaurant");
      }
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  const handleCloseEditModal = () => {
    setEditRestaurantId(null);
  };

  const handleEditReview = (reviewId, initialRating, initialText) => {
    setEditReviewId(reviewId);
    setEditRating(initialRating);
    setEditText(initialText);
  };
  

  const handleUpdateReview = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/reviews/${editReviewId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Review updated successfully!");
        setEditReviewId(null);
        window.location.reload();
      } else {
        console.error("Failed to update review");
      }
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };


  return (
    <div className="profile-page container">
      <div className="card mb-3">
        <div className="card-body">
          <h1 className="card-title mb-4 fade-in">Welcome, {userData?.name}!</h1>
          {userData && (
            <div>
              {userData.is_admin && <p className="card-text">Admin Status</p>}
              <p className="card-text">
                <strong>Email:</strong> {userData.email}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body all-reviews">
          <h5 className="card-title mb-3" style={{ color: "white" }}>
            My Reviews
          </h5>

          <Button
            variant="primary"
            className="mt-2 mb-2"
            onClick={() => setShowReviews(!showReviews)}
            style={{ backgroundColor: "#b50000", borderColor: "#b50000", marginRight: '10px' }}
          >
            {showReviews ? "Hide Reviews" : "Show Reviews"}
          </Button>

          {showReviews && userReviews.length > 0 ? (
            userReviews.map((review, index) => (
              <div key={review.id} className="card mb-3">
                <div className="card-body single-review">
                <div className="d-flex justify-content-between align-items-center">
          <h3 className="card-subtitle text-muted">
            {review.restaurant_name || "Unknown Restaurant"}
          </h3>
          <div className="ms-auto"> 
            <EditIcon
              style={{ cursor: "pointer", color: "#b50000", marginRight: '10px' }}
              onClick={() => handleEditReview(review.id)}
            />
            <DeleteIcon
              style={{ cursor: "pointer", color: "#b50000" }}
              onClick={() => setDeleteConfirmation(review.id)}
            />
          </div>
        </div>

                  {review.restaurant_image_url && (
                    <div>
                      <img
                        src={review.restaurant_image_url}
                        alt="Restaurant Image"
                        className="img-fluid mb-3"
                      />
                    </div>
                  )}
                  <p className="card-text">
                    <strong>Rating:</strong> {review.rating}
                  </p>
                  <p className='card-text' style={{ color: "black" }}>
                    <strong>Review:</strong> {review.review_text}
                  </p>
                  {index < userReviews.length - 1 && <hr />}
                  <span>
                 
                    
                  </span>
                </div>
               
                {/* Modal for editing reviews */}
                <Modal
  show={editReviewId !== null}
  onHide={() => {
    setEditReviewId(null);
    setEditRating(null);
    setEditText(null);
  }}
>
  <Modal.Header closeButton>
    <Modal.Title>Edit Review</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      handleUpdateReview(data);
    }}>
      <Form.Group controlId="editFormRating">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="number"
          name="rating"
          placeholder="Enter rating"
          value={editRating || ''}
          onChange={(e) => setEditRating(Math.min(e.target.value, 5))}
          max={5}
        />
      </Form.Group>
      <Form.Group controlId="editFormText">
        <Form.Label>Review Text</Form.Label>
        <Form.Control
          as="textarea"
          name="review_text"
          placeholder="Enter review text"
          value={editText || ''}
          onChange={(e) => setEditText(e.target.value)}
        />
      </Form.Group>
      <Button variant="danger" type="submit" style={{backgroundColor:'#b50000'}}>
        Save Changes
      </Button>
    </Form>
  </Modal.Body>
</Modal>
              </div>
            ))
          ) : (
            <p className="card-text">
              {userReviews === null
                ? "Error fetching reviews. Please try again later."
                : "No reviews yet."}
            </p>
          )}
        </div>
      </div>

      {userData && Object.keys(userData).length > 0 && userData.is_admin && (
        <>
          <Button
            variant="primary"
            className="mt-3"
            onClick={() => setShowRestaurants(!showRestaurants)}
            style={{ backgroundColor: "#b50000", borderColor: "#b50000", marginRight: '10px' }}
          >
            {showRestaurants ? "Hide Restaurants" : "Show Restaurants"}
          </Button>

          <Button
            variant="primary"
            className="mt-3"
            onClick={() => setShowUsers(!showUsers)}
            style={{ backgroundColor: "#b50000", borderColor: "#b50000" }}
          >
            {showUsers ? "Hide Users" : "Show Users"}
          </Button>
        </>
      )}

      {showRestaurants && userData && Object.keys(userData).length > 0 && userData.is_admin && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title mb-3" style={{ color: "white" }}>
              All Restaurants
            </h5>
            <RestaurantList userData={userData} />
          </div>
        </div>
      )}

      {showUsers && userData && Object.keys(userData).length > 0 && userData.is_admin && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title mb-3" style={{ color: "white" }}>
              All Users
            </h5>
            <UserList />
          </div>
        </div>
      )}

      {userData && Object.keys(userData).length > 0 && userData.is_admin && (
        <ul className="list-group delete-rest">
          <h3>Edit/Delete Restaurants</h3>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <span>{restaurant.name}</span>
                {userData.is_admin && (
                  <span>
                    <EditIcon
                      style={{ cursor: "pointer", marginRight: '10px' }}
                      onClick={() => handleEditRestaurant(restaurant.id)}
                    />
                    <DeleteIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => setDeleteRest(restaurant.id)}
                    />
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

<Modal
        show={deleteRest !== null}
        onHide={() => setDeleteRest(null)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete? This cant be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setDeleteRest(null)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteRestaurant(deleteRest);
              setDeleteRest(null);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal
        show={deleteConfirmation !== null}
        onHide={() => setDeleteConfirmation(null)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete? This cant be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setDeleteConfirmation(null)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteReview(deleteConfirmation);
              setDeleteConfirmation(null);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={editRestaurantId !== null}
        onHide={handleCloseEditModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {};
            formData.forEach((value, key) => {
              data[key] = value;
            });
            handleUpdateRestaurant(data);
          }}>
           
            <Form.Group controlId="editFormName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter restaurant name" />
            </Form.Group>
            <Form.Group controlId="editFormAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" placeholder="Enter restaurant address" />
            </Form.Group>
            <Form.Group controlId="editFormType">
              <Form.Label>Type</Form.Label>
              <Form.Control type="text" name="type" placeholder="Enter restaurant type" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {userData && Object.keys(userData).length > 0 && userData.is_admin && (
        <div className="card mt-3">
          <NewRestaurantForm />
        </div>
        
      )}
      <div> <ViewComments /></div>
    </div>
    
  );
 
};

export default ProfilePage;
