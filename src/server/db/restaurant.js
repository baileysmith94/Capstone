const db = require('./client');


const createRestaurant = async ({ name, address, phone_number, type }) => {
  try {
    const { rows: [restaurant] } = await db.query(`
      INSERT INTO restaurants(name, address, phone_number, type)
      VALUES($1, $2, $3, $4)
      RETURNING *`, [name, address, phone_number, type]);

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

module.exports = {
  createRestaurant,
  getRestaurantById,
};
