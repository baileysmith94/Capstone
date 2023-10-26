const express = require('express')
const reviewsRouter = express.Router();
const { 
    getAllReviews, 
    getReviewById, 
    createReview
} = require('../db');


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

reviewsRouter.post('/create_review', requireUser, async (req, res, next) => {
    const {user_id, restaurant_id, rating, review_text = "" } = req.body;
  
    const postData = {};
  
    try {
      postData.user_id = req.user_id;
      postData.restaurant_id = restaurant_id;
      postData.rating = rating;
      postData.review_text = review_text
  
      const post = await createPost(postData);
  
      if (post) {
        res.send(post);
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

module.exports = reviewsRouter;