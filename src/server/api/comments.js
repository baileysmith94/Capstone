const express = require('express')
const commentRouter = express.Router();
const { requireUser } = require('./utils')

const {
    getAllComments,
    getCommentsByReviewId,
    getCommentsByUserId,
    deleteComment,
    createComment,
    updateCommentbyId
} = require('../db');

commentRouter.get(`/`, async( req, res, next) => {
    try {
        const comments = await getAllComments();
        res.send({
            comments
        });
    } catch (error) {
        next(error)
    }
});


commentRouter.get('/:review_id', async( req, res, next) => {
    try {
        const comments = await getCommentsByReviewId(req.params.review_id);
        res.json({
            comments
        });
    } catch (error) {
        next(error)
    }
});


commentRouter.post('/', async  (req, res, next) => {
    console.log("POSTING TO COMMENTS ROUTE!!!")
    
    try {  
        const {user_id, review_id, comment} = req.body;
        const createdComment = await createComment({user_id, review_id, comment});
        console.log(createComment)
        if(createdComment) {
            res.send(createdComment)
        } else {
            next({
                message: `failed to create comment`
            })
        }

    } catch (err) {
        console.log(err)
    }
});

commentRouter.delete('/:id', async (req, res, next) => {
    try {
        const destroyComment = await deleteComment(req.params.id);
        console.log("Attempt to delete the comment:")
        if(destroyComment) {
            res.send(destroyComment)
        } else {
            next({
                message: `failed to delete comment`
            })
        }
    } catch (err) {
        throw err
    }
});

commentRouter.patch(`/:id`, async (req, res, next) => {
    try {
        const comment = await updateCommentbyId(req.params.id, req.body);
        res.send(comment);
    } catch (error) {
        next(error);
    }
});


module.exports = commentRouter