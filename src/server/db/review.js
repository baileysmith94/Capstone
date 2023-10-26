const db = require('./client'); 

const getAllReviews = async () => {
  try {
    const { rows } = await db.query(`
    SELECT * FROM reviews
    `);
    return rows
  } catch (err) {
    throw err;
  }
}

const createReview = async ({ user_id, restaurant_id, rating, review_text }) => {
  try {
    const { rows: [review] } = await db.query(`
      INSERT INTO reviews(user_id, restaurant_id, rating, review_text)
      VALUES($1, $2, $3, $4)
      RETURNING *`, [user_id, restaurant_id, rating, review_text]);

    return review;
  } catch (err) {
    throw err;
  }
}


const getReviewById = async (reviewId) => {
  try {
    const { rows: [review] } = await db.query(`
      SELECT * 
      FROM reviews
      WHERE id = $1;`, [reviewId]);

    return review;
  } catch (err) {
    throw err;
  }
}



module.exports = {
  getAllReviews,
  createReview,
  getReviewById,
};
