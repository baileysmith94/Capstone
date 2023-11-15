const express = require('express')
const restaurantsRouter = express.Router();

const { 
    getRestaurantById,
    getAllRestaurants, 
    getAllRestaurantsWithAverageRating,
    getReviewsByRestaurantId,
    createRestaurant
} = require('../db');

restaurantsRouter.get('/', async (req, res, next) => {
    try {
      const restaurants = await getAllRestaurantsWithAverageRating();
  
      res.send({
        restaurants,
      });
    } catch ({ name, type }) {
      next({ name, type });
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



restaurantsRouter.get('/:restaurantId/reviews', async (req, res, next) => {
    try {
      const restaurantId = req.params.restaurantId;
      const reviews = await getReviewsByRestaurantId(restaurantId);
      res.json({ reviews });
    } catch (error) {
      next(error);
    }
});

restaurantsRouter.post('/create_restaurant', async (req, res, next) => {
    try {
        const newRestaurant = await createRestaurant(req.body, req.user.id);
        res.send(newRestaurant);
    } catch (error) {
        next(error);
    }
})

module.exports = restaurantsRouter;