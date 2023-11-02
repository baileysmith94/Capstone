const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const volleyball = require('volleyball')
const { getAllRestaurants, getRestaurantById, getUserById, getAllReviews, getReviewById, getReviewsByRestaurantId } = require('../db');
apiRouter.use(volleyball)

// TO BE COMPLETED - set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } 
  else if (auth.startsWith(prefix)) {
    // TODO - Get JUST the token out of 'auth'
    const token = auth.slice(prefix.length);
    
    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      // TODO - Call 'jwt.verify()' to see if the token is valid. If it is, use it to get the user's 'id'. Look up the user with their 'id' and set 'req.user'
      if (parsedToken) {
        req.user = await getUserById(parsedToken);
        next();
      } else {
        next({
          name:'AuthorizationHeaderError',
          message: 'Authorization token malformed',
        });
      }

    } catch (error) {
      next(error);
    }
  } 
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user);
  }

  next();
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

apiRouter.use((err, req, res, next) => {
    res.status(500).send(err)
  })

  apiRouter.get('/restaurants', async (req, res, next) => {
    try {
      const restaurants = await getAllRestaurants();
      res.send({ restaurants });
    } catch (error) {
      next(error);
    }
  });
  
  apiRouter.get('/restaurants/:id', async (req, res, next) => {
    try {
      const restaurant = await getRestaurantById(req.params.id);
      res.send({ restaurant });
    } catch (error) {
      next(error);
    }
  });

  apiRouter.get('/restaurants/:restaurantId/reviews', async (req, res, next) => {
    try {
      const restaurantId = req.params.restaurantId;
      const reviews = await getReviewsByRestaurantId(restaurantId);
      res.json({ reviews });
    } catch (error) {
      next(error);
    }
  });
  

  apiRouter.get('/reviews', async (req, res, next) => {
    try {
        const reviews = await getAllReviews();
        res.send({ reviews });
    } catch (error) {
        next(error);
    }
});

apiRouter.get('/reviews/:id', async (req, res, next) => {
    try {
        const review = await getReviewById(req.params.id);
        res.send({ review });
    } catch (error) {
        next(error);
    }
});


module.exports = apiRouter;