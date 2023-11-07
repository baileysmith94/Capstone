const express = require('express')
const commentRouter = express.Router();

const {
    getAllComments,
    getCommentsByRestaurantId,
    getCommentsByUserId,
    deleteComment
} = require('../db');

commentRouter.get(`/comments`, async( req, res, next) => {
    try {
        const comments = await getAllComments();

        res.send({
            comments
        });
    } catch ({name, type}) {
        next({name, type})
    }
});

commentRouter.get('/:user_id', async( req, res, next) => {
    try {
        const comments = await getCommentsByUserId(req.params.user_id);

        res.send({
            comments
        });
    } catch (error) {
        next(error)
    }
});
commentRouter.get('/:restaurant_id', async( req, res, next) => {
    try {
        const comments = await getCommentsByRestaurantId(req.params.restaurant_id);

        res.send({
            comments
        });
    } catch (error) {
        next(error)
    }
});

module.exports = commentRouter