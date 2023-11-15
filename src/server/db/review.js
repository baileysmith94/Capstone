const db = require('./client'); 
const { getRestaurantById } = require('./restaurant');

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

const createReview = async ({ user_id, restaurant_id, rating, review_text, image_url, comment }, token) => {
  try {
    const { rows: [review] } = await db.query(`
      INSERT INTO reviews(user_id, restaurant_id, rating, review_text, image_url, comment)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *`, [user_id, restaurant_id, rating, review_text, image_url, comment]);

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

const getReviewsByRestaurantId = async (restaurantId) => {
  try {
    const { rows } = await db.query(`
      SELECT 
        reviews.*, 
        users.name as user_name, 
        restaurants.name as restaurant_name
      FROM reviews
      JOIN users ON reviews.user_id = users.id
      LEFT JOIN restaurants ON reviews.restaurant_id = restaurants.id
      WHERE reviews.restaurant_id = $1;
    `, [restaurantId]);

    return rows.map((row) => ({
      ...row,
      restaurant_name: row.restaurant_name
    }));
  } catch (error) {
    throw error;
  }
};


//DELETE MAYbe
const getReviewsByUserId = async (userId) => {
  try {
    const { rows } = await db.query(`
      SELECT * 
      FROM reviews
      WHERE user_id = $1;
    `, [userId]);

    return rows;
  } catch (err) {
    throw err;
  }
}

async function updateReviewById(review_id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields).map(
      (key, index) => `"${key}"=$${index + 1}`
  ).join(', ');

  // return early if this is called without fields
  if (setString.length === 0) {
      return;
  }

  try {
      const {rows: [review]}  = await db.query(`
      UPDATE review
      SET ${setString}
      WHERE id=${review_id}
      RETURNING *;
      `, Object.values(fields));

      return review;
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
  getReviewsByRestaurantId,
  getReviewsByUserId,
  updateReviewById, 
  destroyReview
};

// const updateReview = async (reviewId) => {
//   const {rating, review_text, type, image_url} = fields; 
//     delete fields.rating;
//     delete fields.review_text;
//     delete fields.type;
//     delete fields.image_url;

//   // build the set string
//   const setString = Object.keys(fields).map(
//     (key, index) => `"${ key }"=$${ index + 1 }`
//   ).join(', ');

//   try{
//     if (setString.length > 0) {
//       await client.query(`
//       UPDATE reviews
//       SET ${ setString } 
//       WHERE id= ${ reviewId }
//       RETURNING *;
//       `, Object.values(fields));
//     }

//     if (rating === undefined){
//       return await getReviewById(reviewId);
//     }
//     if (review_text === undefined){
//       return await getReviewById(reviewId);
//     }
//     if (type === undefined){
//       return await getReviewById(reviewId);
//     }
//     if (image_url === undefined){
//       return await getReviewById(reviewId);
//     }
  
//     return await getReviewById(reviewId);
//   } catch (error) {
//     throw error;
//   }
// }
