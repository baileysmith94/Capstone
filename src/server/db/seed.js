const db = require("./client");
const { createUser } = require("./users");
//will we need to create a restaurant and reviews js file, like how there is a users.js file? assuming we do - aj
const { createRestaurant } = require("./restaurant");
const { createReview } = require("./review");

const users = [
  {
    name: "Emily Johnson",
    email: "emily@example.com",
    password: "securepass",
  },
  {
    name: "Liu Wei",
    email: "liu@example.com",
    password: "strongpass",
  },
  {
    name: "Isabella García",
    email: "bella@example.com",
    password: "pass1234",
  },
  {
    name: "Mohammed Ahmed",
    email: "mohammed@example.com",
    password: "mysecretpassword",
  },
  {
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
  },
];

//I added restaurants and reviews below. Do we need them/are they set up correctly? - aj

const restaurants = [
  {
    name: "Scott's Sandwiches",
    address: "123 Main St",
    phone_number: "555-123-4567",
    type: "A",
    image_url: "./images/sandwich.png"
  },
  {
    name: "Peanut Garden",
    address: "5656 Garden Lane",
    phone_number: "281-593-3210",
    type: "B",
    image_url: "./images/peanutgarden.png"
  },
  {
    name: "Wisconsin Roadhouse",
    address: "321 Get Lost Lane",
    phone_number: "303-597-7256",
    type: "C",
    image_url: "./images/wisconsin.png"
  },
  {
    name: "Taco King",
    address: "301 Gordita Street",
    phone_number: "808-901-3278",
    type: "D",
    image_url: "./images/tacoking.png"
  },

  {
    name: "Poultry Roaster",
    address: "999 Rotisserie Road",
    phone_number: "999-593-0303",
    type: "E",
    image_url: "./images/poultry.png"
  },
  {
    name: "Gorgonzola Express",
    address: "0001 Stinky Street",
    phone_number: "578-371-9456",
    type: "F",
    image_url: "./images/gorgon.png"
  },
];

const reviews = [
  {
    user_id: 1, // Replace with the actual user ID?? (or use faker?)
    restaurant_id: 2, // Replace with the actual restaurant ID?? (or use faker?)
    rating: 3,
    review_text: "Great food and service, blah blah blah",
  },
  {
    user_id: 3, // Replace with the actual user ID?? (or use faker?)
    restaurant_id: 4, // Replace with the actual restaurant ID?? (or use faker?)
    rating: 4,
    review_text: 'Great food and service!!!',

  },
  {
    user_id: 2, // Replace with the actual user ID?? (or use faker?)
    restaurant_id: 6, // Replace with the actual restaurant ID?? (or use faker?)
    rating: 2,
    review_text: "Very sticky restaurant!",
  },
  {
    user_id: 4, // Replace with the actual user ID?? (or use faker?)
    restaurant_id: 3, // Replace with the actual restaurant ID?? (or use faker?)
    rating: 5,
    review_text: "The food was wonderful, and the service was excellent",
  },
  {
    user_id: 5, // Replace with the actual user ID?? (or use faker?)
    restaurant_id: 1, // Replace with the actual restaurant ID?? (or use faker?)
    rating: 5,
    review_text: "Lovely restaurant with very nice staff",
  },
  {
    user_id: 1, // Replace with the actual user ID?? (or use faker?)
    restaurant_id: 4, // Replace with the actual restaurant ID?? (or use faker?)
    rating: 3,
    review_text: 'Not my first pick',
  },
 {
    user_id: 3, // Replace with the actual user ID?? (or use faker?)
    restaurant_id: 2, // Replace with the actual restaurant ID?? (or use faker?)
    rating: 5,
    review_text: 'Great food and service!',
  },
 {
    user_id: 2, // Replace with the actual user ID?? (or use faker?)
    restaurant_id: 5, // Replace with the actual restaurant ID?? (or use faker?)
    rating: 2,
    review_text: 'Very sticky restaurant!',
  },
 {
    user_id: 4, // Replace with the actual user ID?? (or use faker?)
    restaurant_id: 2, // Replace with the actual restaurant ID?? (or use faker?)
    rating: 5,
    review_text: 'The food was wonderful, service was phenomenal',
  },
 {
    user_id: 5, // Replace with the actual user ID?? (or use faker?)
    restaurant_id: 6, // Replace with the actual restaurant ID?? (or use faker?)
    rating: 3,
    review_text: 'Food was cold but the service was great',
  }
];

const dropTables = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS restaurants;
    DROP TABLE IF EXISTS users;`);
  } catch (err) {
    throw err;
  }
};

// users table has a primary key on the id field.
// restaurants table has a primary key on the id field.
// reviews table has a primary key on the id field.
// The user_id field in the reviews table is a foreign key that references the id field in the users table, establishing a relationship between reviews and users.
// The restaurant_id field in the reviews table is a foreign key that references the id field in the restaurants table, establishing a relationship between reviews and restaurants.

const createTables = async () => {
  try {
    await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            is_admin BOOLEAN NOT NULL DEFAULT FALSE
            
        );

        CREATE TABLE restaurants(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            phone_number VARCHAR(15),
            average_rating NUMERIC,
            type VARCHAR(255),
            image_url VARCHAR(255)
            
            
        );
   
        CREATE TABLE reviews(
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id),
            restaurant_id INT REFERENCES restaurants(id),
            rating INT NOT NULL,
            review_text TEXT,
            image_url VARCHAR(255),
            comment VARCHAR(255)
        );`);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const insertRestaurants = async () => {
  try {
    for (const restaurant of restaurants) {
      await createRestaurant(restaurant);
    }
    console.log("Restaurants data inserted successfully.");
  } catch (error) {
    console.error("Error inserting restaurant data:", error);
  }
};

const insertReviews = async () => {
  try {
    for (const review of reviews) {
      await createReview(review);
    }
    console.log("Reviews data inserted successfully.");
  } catch (error) {
    console.error("Error inserting review data:", error);
  }
};

const seedDatabse = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertRestaurants();
    await insertReviews();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabse();
