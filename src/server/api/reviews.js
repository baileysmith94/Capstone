const express = require('express')
const reviewsRouter = express.Router();
const { 
    getAllReviews, 
    getReviewById, 
    getReviewsByUserId,
    createReview,
    updateReviewById, 
    destroyReview
} = require('../db');
const { requireUser, requiredNotSent } = require('./utils')


reviewsRouter.get('/', async( req, res, next) => {
    try {
        const reviews = await getAllReviews();

        res.send({
            reviews
        });
    } catch ({name, type}) {
        next({name, type})
    }
});

reviewsRouter.post('/',requireUser, async (req, res, next) => {
    try {
      const {user_id, restaurant_id, rating, review_text, type = "", image_url } = req.body;
      const reviewData = {};

      reviewData.user_id = user_id;
      reviewData.restaurant_id = restaurant_id;
      reviewData.rating = rating;
      reviewData.review_text = review_text;
      reviewData.type = type;
      reviewData.image_url = image_url;
  
      const createdReview = await createReview(reviewData);
  
      if (createdReview) {
        res.send(createdReview);
      } else {
        next({
          name: 'PostCreationError',
          message: 'There was an error creating your review. Please try again.'
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

reviewsRouter.get('/user/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userReviews = await getReviewsByUserId(userId);

    res.send({
      userReviews,
    });
  } catch (error) {
    next(error);
  }
});


reviewsRouter.patch('/:id', requireUser, async (req, res, next) => {
    try {
     const {user_id, is_admin} = req.params;
     const { rating, review_text, type, image_url, comment } = req.body;

     const review = await updateReviewById(req.params.review_id, req.body);
  
      if (review.user_id === req.user_id || is_admin) {
        res.send(review)
      } else {
        next({
          name: 'UnauthorizedUserError',
          message: 'You cannot update a post that is not yours'
        })
      }
    } catch (error) {
      next(error);
    }
  });
  
  reviewsRouter.delete('/:postId', requireUser, async (req, res, next) => {
    try{
      const {reviewId, is_admin} = req.params;
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
          message: "You must be the same user who created this review, or an admin, to perform this action"
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