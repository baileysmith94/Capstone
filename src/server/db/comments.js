const db = require(`./client`);

const getAllComments = async () => {
    try {
        const { rows } = await db.query(`
        SELECT * FROM comments`);
        return rows
    } catch (err) {
        throw err;
    }
}
// Create a comment func. Requires a token, with userId from logged-in user
// must find out if that is stored...
// reviewId passed down from the review 
// comment is supplied by user
// seems good
const createComment = async ({ user_id, review_id, comment}) => {
    try {
        const { rows: [ Comment ] } = await db.query(`
        INSERT INTO comments("user_id", "review_id", "comment")
        VALUES($1, $2, $3)
        RETURNING *;
        `, [user_id, review_id, comment]);
        
        return Comment;
        
    } catch (err) {
        console.error(`error in createComment`, err)
        throw err;
    }
}
const getCommentsByReviewId = async (reviewId) => {
    try {
      const { rows } = await db.query(`
        SELECT comments.review_id, comments.comment, users.name FROM comments
        INNER JOIN users ON comments.user_id=users.id
        WHERE review_id = $1;
      `, [reviewId]);
  
      return rows;
    } catch (error) {
      throw error;
    }
}
const getCommentsByUserId = async (userId) => {
    try {
      const { rows } = await db.query(`
        SELECT * FROM comments
        WHERE user_id = $1;
      `, [userId]);
  
      return rows;
    } catch (error) {
      throw error;
    }
}

const deleteComment = async (id) => {
    try {
        await client.query(`
        DELETE FROM comments
        WHERE "commentId" = $1;`, [id]);
        const {rows: [comment]} = await client.query(`
            DELETE FROM comments 
             WHERE id = $1
            RETURNING *
        `, [id]);
        return comment; 
    } catch (error) {
        throw error;
    }
};
  
module.exports = {
    getAllComments,
    createComment,
    getCommentsByReviewId,
    getCommentsByUserId,
    deleteComment
};