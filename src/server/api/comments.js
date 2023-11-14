const express = require('express')
const commentRouter = express.Router();
const { requireUser } = require('./utils')

const {
    getAllComments,
    getCommentsByReviewId,
    getCommentsByUserId,
    deleteComment,
    createComment
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

// commentRouter.get('/:user_id', async( req, res, next) => {
//     try {
//         const comments = await getCommentsByUserId(req.params.user_id);

//         res.send({
//             comments
//         });
//     } catch (error) {
//         next(error)
//     }
// });
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

// post /api/comments. create a new comment
// commentRouter.post('/createdComment', requireUser, async (req, res, next) => {
//     try {
//         const comment = req.body;
//         const { id: userId } = req.user;
//         const newComment = await createComment({userId, reviewId, comment});
//         if(newComment) {
//             res.send(newComment);
//             console.log("The new comment is:", newComment)
//         }else {
//             console.log("failed to create comment")
//             next({
//               name: 'FailedToCreate',
//               message: 'There was an error creating your comment'
//             })
//         }
//         }
//      catch (error) {console.log(error)
        
//     next(error);}
// });
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



module.exports = commentRouter