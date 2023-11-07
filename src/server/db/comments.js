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

const createComment = async ({ user_id, restaurant_id, comment}, token) => {
    try {
        const { rows: [comment] } = await db.query(`
        INSERT INTO comments(user_id, restaurant_id, comment)
        VALUES($1, $2, $3)
        RETURNING *`, [user_id, restaurant_id, comment]);
        return comment;
    } catch (err) {
        throw err;
    }
}
const getCommentsByRestaurantId = async (restaurantId) => {
    try {
      const { rows } = await db.query(`
        SELECT * FROM comments
        WHERE restaurant_id = $1;
      `, [restaurantId]);
  
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
    getCommentsByRestaurantId,
    getCommentsByUserId,
    deleteComment
};