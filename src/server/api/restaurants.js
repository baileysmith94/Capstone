const express = require('express')
const restaurantsRouter = express.Router();

const { 
    getRestaurantById,
    getAllRestaurants, 
    getReviewsByRestaurantId
} = require('../db');

restaurantsRouter.get('/', async( req, res, next) => {
    try {
        const restaurants = await getAllRestaurants();

        res.send({
            restaurants
        });
    } catch ({name, type}) {
        next({name, type})
    }
});

restaurantsRouter.get('/:id', async( req, res, next) => {
    try {
        const restaurant = await getRestaurantById(req.params.id);
        console.log("restaurant", restaurant)
        res.send({
            restaurant
        });
    } catch (error) {
        next(error)
    }
});

restaurantsRouter.get('/restaurants/:id', async (req, res, next) => {
    try {
      const restaurant = await getRestaurantById(req.params.id);
      res.send({ restaurant });
    } catch (error) {
      next(error);
    }
});

restaurantsRouter.get('/restaurants/:restaurantId/reviews', async (req, res, next) => {
    try {
      const restaurantId = req.params.restaurantId;
      const reviews = await getReviewsByRestaurantId(restaurantId);
      res.json({ reviews });
    } catch (error) {
      next(error);
    }
});

module.exports = restaurantsRouter;