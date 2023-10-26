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

const updateReview = async (reviewId) => {
  const {rating, review_text, type} = fields; 
    delete fields.rating;
    delete fields.review_text;
    delete fields.type;

  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  try{
    if (setString.length > 0) {
      await client.query(`
      UPDATE reviews
      SET ${ setString } 
      WHERE id= ${ reviewId }
      RETURNING *;
      `, Object.values(fields));
    }

    if (rating === undefined){
      return await getReviewById(reviewId);
    }
    if (review_text === undefined){
      return await getReviewById(reviewId);
    }
    if (type === undefined){
      return await getReviewById(reviewId);
    }
  
    return await getReviewById(reviewId);
  } catch (error) {
    throw error;
  }
}

async function destroyReview(id) {
  try {
    await client.query(`
    DELETE FROM reviews
    WHERE "reviewId" = $1;
    `, [id]);
    const {rows: [review]} = await client.query(`
      DELETE FROM reviews 
      WHERE id = $1
      RETURNING *
    `, [id]);
    return review;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllReviews,
  createReview,
  getReviewById,
  updateReview, 
  destroyReview
};
