const express = require('express')
const reviewsRouter = express.Router();
const { 
    getAllReviews, 
    getReviewById, 
    getReviewsByUserId,
    createReview,
    getReviewByUserId,
    updateReviewById, 
    destroyReview,
    getReviewByUserAndRestaurant
} = require('../db');
const { requireUser, requiredNotSent } = require('./utils');
const jwt = require('jsonwebtoken');

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

reviewsRouter.post('/', requireUser, async (req, res, next) => {
  try {
    const { restaurant_id, rating, review_text } = req.body;
    const userId = req.user.id;

    // Check if the user has already reviewed the restaurant
    const existingReview = await getReviewByUserAndRestaurant(userId, restaurant_id);

    if (existingReview) {
      return res.status(400).json({ error: 'User has already reviewed this restaurant' });
    }

    const reviewData = {
      user_id: userId,
      restaurant_id,
      rating,
      review_text,
      // Add other review data - we might need image
    };

    const createdReview = await createReview(reviewData);

    if (createdReview) {
      res.status(201).send(createdReview);
    } else {
      next({
        name: 'PostCreationError',
        message: 'There was an error creating your review. Please try again.',
      });
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
     const {user_id} = req.params;
     const { rating, review_text, type, image_url, comment } = req.body;

     const review = await updateReviewById(req.params.id, req.body);
  
      if ({rows:review}.user_id === user_id) {
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
  
  reviewsRouter.delete('/:id', requireUser, async (req, res, next) => {
    try{
      const {id} = req.params;
      // const reviewToDelete = await getReviewsByUserId(req.user.id);
      const reviewToDelete= await getReviewById(id);
      console.log("req.user.id", req.user.id)
      if(!reviewToDelete) {
        next({
          name: 'NotFound',
          message: `No routine by ID ${id}`
        })
      } else if(req.user.id !== reviewToDelete.user_id) {
        res.status(403);
        next({
          name: "WrongUserError",
          message: "You must be the same user who created this routine to perform this action"
        });
      } else {
        const deletedReview = await destroyReview(id);
        res.send({success: true, ...deletedReview});
      }
    } catch (error) {
      next(error)
    }
  });

module.exports = reviewsRouter;