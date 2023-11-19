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

const getReviewByUserAndRestaurant = async (userId, restaurantId) => {
  try {
    const { rows } = await db.query(`
      SELECT * 
      FROM reviews
      WHERE user_id = $1 AND restaurant_id = $2;
    `, [userId, restaurantId]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};

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

async function updateReviewById(id, fields = {}) {
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
      UPDATE reviews
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
      `, Object.values(fields));
      return review;
  } catch (error) {
      throw error;
  }
}

// Assume you have a function in your reviews controller or service to get reviews by user ID and restaurant ID
const getUserReviewByRestaurantId = async (userId, restaurantId) => {
  try {
    const response = await fetch(`/api/reviews/user/${userId}/restaurant/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userReview = await response.json();
      return userReview;
    } else {
      console.error("Failed to get user review for restaurant");
      return null;
    }
  } catch (error) {
    console.error("Error getting user review for restaurant:", error);
    return null;
  }
};

const destroyReview = async (reviewId) => {
  try {
    const { rows } = await db.query(`
      DELETE FROM reviews 
      WHERE id = $1
      RETURNING *;
    `, [reviewId]);

    return rows[0];
  } catch (error) {
    throw error;
  }
};
// async function destroyReview(id) {
//   try {
//     await client.query(`
//     DELETE FROM reviews
//     WHERE "reviewId" = $1;
//     `, [id]);
//     const {rows: [review]} = await client.query(`
//       DELETE FROM reviews 
//       WHERE id = $1
//       RETURNING *
//     `, [id]);
//     return review;
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
  getAllReviews,
  createReview,
  getReviewById,
  getReviewsByRestaurantId,
  getReviewsByUserId,
  updateReviewById, 
  destroyReview,
  getReviewByUserAndRestaurant,
  getUserReviewByRestaurantId
};
