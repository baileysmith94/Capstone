const db = require('./client');


const createRestaurant = async ({ name, address, phone_number, type, image_url }) => {
  try {
    const { rows: [restaurant] } = await db.query(`
      INSERT INTO restaurants(name, address, phone_number, type, image_url)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *`, [name, address, phone_number, type, image_url]);

    return restaurant;
  } catch (err) {
    throw err;
  }
}

const getRestaurantById = async (restaurantId) => {
  try {
    const { rows: [restaurant] } = await db.query(`
      SELECT * 
      FROM restaurants
      WHERE id = $1;`, [restaurantId]);

    return restaurant;
  } catch (err) {
    throw err;
  }
}

const getAllRestaurantsWithAverageRating = async () => {
  const restaurantsWithRating = await db.query(`
    SELECT r.*, ROUND(AVG(re.rating)) as average_rating
    FROM restaurants r
    LEFT JOIN reviews re ON r.id = re.restaurant_id
    GROUP BY r.id
  `);

  return restaurantsWithRating.rows;
};

const getAllRestaurants = async () => {
  try {
    const { rows } = await db.query(`
    SELECT * FROM restaurants
    `);
    return rows
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createRestaurant,
  getRestaurantById,
  getAllRestaurants,
  getAllRestaurantsWithAverageRating
};
