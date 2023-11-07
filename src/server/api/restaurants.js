const express = require('express')
const restaurantsRouter = express.Router();

const { 
    getRestaurantById,
    getAllRestaurants 
} = require('../db');

restaurantsRouter.get('/restaurants', async( req, res, next) => {
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

module.exports = restaurantsRouter;