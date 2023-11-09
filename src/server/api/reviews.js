const express = require('express')
const reviewsRouter = express.Router();
const { 
    getAllReviews, 
    getReviewById, 
    createReview,
    updateReview, 
    destroyReview
} = require('../db');


reviewsRouter.get('/reviews', async( req, res, next) => {
    try {
        const reviews = await getAllReviews();

        res.send({
            reviews
        });
    } catch ({name, type}) {
        next({name, type})
    }
});

reviewsRouter.post('/create_review', requireUser, async (req, res, next) => {
    const {user_id, restaurant_id, rating, review_text, type = "", image_url } = req.body;
  
    const reviewData = {};
  
    try {
      reviewData.user_id = user_id;
      reviewData.restaurant_id = restaurant_id;
      reviewData.rating = rating;
      reviewData.review_text = review_text;
      reviewData.type = type;
      reviewData.image_url = image_url;
  
      const review = await createReview(reviewData);
  
      if (review) {
        res.send(review);
      } else {
        next({
          name: 'PostCreationError',
          message: 'There was an error creating your post. Please try again.'
        })
      }
    } catch (error) {
      next(error);
    }
  });

reviewsRouter.get('/:id', async( req, res, next) => {
    try {
        const review = await getReviewById(req.params.id);

        res.send({
            review
        });
    } catch (error) {
        next(error)
    }
});

reviewsRouter.patch('/:review_id', requireUser, async (req, res, next) => {
    const { user_id, restaurant_id } = req.params;
    const { rating, review_text, type, image_url, comment } = req.body;
  
    const updateFields = {};
  
    if (rating && rating.length > 0) {
      updateFields.rating= rating.trim().split(/\s+/);
    }
  
    if (review_text) {
      updateFields.review_text = review_text;
    }
  
    if (type) {
      updateFields.type = type;
    }

    if (image_url) {
      updateFields.image_url = image_url;
    }

    if (comment) {
      updateFields.comment = comment;
    }
  
    try {
      const originalReview = await getReviewById(reviewId);
  
      if (originalReview.user_id === req.user_id) {
        const updatedReview = await updateReview(restaurant_id, updateFields);
        res.send({ post: updatedReview })
      } else {
        next({
          name: 'UnauthorizedUserError',
          message: 'You cannot update a post that is not yours'
        })
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });
  
  reviewsRouter.delete('/:postId', requireUser, async (req, res, next) => {
    try{
      const {reviewId, user_id} = req.params;
      const reviewToUpdate = await getReviewById(reviewId);
      if(!reviewToUpdate) {
        next({
          name: 'NotFound',
          message: `No post by ID ${reviewId}`
        })
        // reviewToUpdate.user_id?? would this be admin? Since admin is only allowed to delete
      } else if (req.user_id !== reviewToUpdate.user_id || !is_admin) {
        res.status(403); 
        next({
          name: "WrongUserError",
          message: "You must be the same user who created this routine to perform this action"
        });
      } else {
        const deletedReview = await destroyReview(reviewId)
        res.send({success: true, ...deletedReview})
      }
    } catch (error) {
      next(error)
    }
  });

module.exports = reviewsRouter;