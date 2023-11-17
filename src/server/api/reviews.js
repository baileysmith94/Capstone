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

// reviewsRouter.post('/', requireUser, async (req, res, next) => {
//   try {
//     const { user_id, restaurant_id, rating, review_text, type = "", image_url } = req.body;
//     const reviewData = {};

//     // Get the user ID from the decoded token
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     const userIdFromToken = decodedToken.user.id;

//     // Ensure that the user making the request is the same as the one in the token
//     if (userIdFromToken !== user_id) {
//       return res.status(401).json({ error: "Unauthorized user" });
//     }

//     reviewData.user_id = user_id;
//     reviewData.restaurant_id = restaurant_id;
//     reviewData.rating = rating;
//     reviewData.review_text = review_text;
//     reviewData.type = type;
//     reviewData.image_url = image_url;

//     const createdReview = await createReview(reviewData);

//     if (createdReview) {
//       res.send(createdReview);
//     } else {
//       next({
//         name: 'PostCreationError',
//         message: 'There was an error creating your review. Please try again.'
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

reviewsRouter.post('/', requireUser, async (req, res, next) => {
  try {
    // Log the request body to check the received data
    console.log('Request Body:', req.body);
    console.log('User Object:', req.user);

    const { restaurant_id, rating, review_text } = req.body;

    const reviewData = {
      user_id: req.user.id,
      restaurant_id,
      rating,
      review_text,
      // Add other review data - we might need image
    };

    // Log the extracted data to check if user_id and restaurant_id are present
    console.log('Extracted Data:', reviewData);

    const createdReview = await createReview(reviewData);

    if (createdReview) {
      res.status(201).send(createdReview);
    } else {
      next({
        name: 'PostCreationError',
        message: 'There was an error creating your review. Please try again.'
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
  
  reviewsRouter.delete('/:postId', requireUser, async (req, res, next) => {
    try{
      const {reviewId} = req.params;
      const reviewToUpdate = await getReviewById(reviewId);
      if(!reviewToUpdate) {
        next({
          name: 'NotFound',
          message: `No post by ID ${reviewId}`
        })
        
      } else if (req.user_id !== reviewToUpdate.user_id) {
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