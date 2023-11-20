const express = require('express')
const restaurantsRouter = express.Router();
const { isAdmin } = require('./utils');

const { 
    getRestaurantById,
    getAllRestaurants, 
    getAllRestaurantsWithAverageRating,
    getReviewsByRestaurantId,
    deleteRestaurantById,
    createRestaurant,
    updateRestaurantById
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

restaurantsRouter.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const restaurantId = req.params.id;
    
    // Optionally, you can check if the restaurant has reviews and handle them accordingly
    
    const deletedRestaurant = await deleteRestaurantById(restaurantId);
    res.json({
      success: true,
      message: 'Restaurant deleted successfully',
      deletedRestaurant,
    });
  } catch (error) {
    console.error('Error in delete restaurant route:', error);
    next(error);
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

restaurantsRouter.post('/create_restaurant', isAdmin, async (req, res, next) => {
  try {
    console.log("User making the request:", req.user);
    
    const newRestaurant = await createRestaurant(req.body, req.user.id);
    res.send(newRestaurant);
  } catch (error) {
    console.error("Error in create_restaurant route:", error);
    next(error);
  }
});

restaurantsRouter.patch('/:id', isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedRestaurant = await updateRestaurantById(id, req.body);

    if (updatedRestaurant) {
      res.status(200).json({ success: true, restaurant: updatedRestaurant });
    } else {
      res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
  } catch (error) {
    console.error('Error in patch restaurant route:', error);
    next(error);
  }
});




module.exports = restaurantsRouter;