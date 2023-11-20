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
    is_admin:true, 
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
    type: "Italian",
    image_url: "./images/sandwich.png"
  },
  {
    name: "Peanut Garden",
    address: "5656 Garden Lane",
    phone_number: "281-593-3210",
    type: "American",
    image_url: "./images/peanutgarden.png"
  },
  {
    name: "Wisconsin Roadhouse",
    address: "321 Get Lost Lane",
    phone_number: "303-597-7256",
    type: "American",
    image_url: "./images/wisconsin.png"
  },
  {
    name: "Taco King",
    address: "301 Gordita Street",
    phone_number: "808-901-3278",
    type: "Mexican",
    image_url: "./images/tacoking.png"
  },

  {
    name: "Poultry Roaster",
    address: "999 Rotisserie Road",
    phone_number: "999-593-0303",
    type: "American",
    image_url: "./images/poultry.png"
  },
  {
    name: "Gorgonzola Express",
    address: "0001 Stinky Street",
    phone_number: "578-371-9456",
    type: "Italian",
    image_url: "./images/gorgon.png"
  },
  {
    name: "Poppin' Bubbles",
    address: "321 Splat Street",
    phone_number: "123-456-7890",
    type: "Tawianese",
    image_url: "./images/popbub.png"
  },
  {
    name: "Yoko's Sushi",
    address: "777 Lucky Boulevard",
    phone_number: "777-777-7777",
    type: "Japanese",
    image_url: "./images/yokosushi.png"
  },
  {
    name: "Smoothie Shack",
    address: "363 Fruit Avenue",
    phone_number: "510-765-2121",
    type: "US/California",
    image_url: "images/smoothie.png"
  },
  {
    name: "The Vegan Difference",
    address: "5445 Free Street",
    phone_number: "310-321-1245",
    type: "US/Califonia",
    image_url: "./images/TVD.png"
  },
  {
    name: "Curry in a Hurry",
    address: "108 Enlightenment Road",
    phone_number: "108-108-1081",
    type: "Indian",
    image_url: "images/curry.png"
  },
  {
    name: "Le Pigeon",
    address: "000 Route des Oiseaux",
    phone_number: "331-991-4231",
    type: "French",
    image_url: "./images/pigeon.png"
  }
];

const reviews = [
  {
    user_id: 1, 
    restaurant_id: 2, 
    rating: 3,
    review_text: "Great food and service, blah blah blah",
  },
  {
    user_id: 3, 
    restaurant_id: 4,
    rating: 4,
    review_text: 'Great food and service!!!',

  },
  {
    user_id: 2, 
    restaurant_id: 6, 
    rating: 2,
    review_text: "Very sticky restaurant!",
  },
  {
    user_id: 4, 
    restaurant_id: 3, 
    rating: 5,
    review_text: "The food was wonderful, and the service was excellent",
  },
  {
    user_id: 5, 
    restaurant_id: 1, 
    rating: 5,
    review_text: "Lovely restaurant with very nice staff",
  },
  {
    user_id: 1, 
    restaurant_id: 4,
    rating: 3,
    review_text: 'Not my first pick',
  },
 {
    user_id: 3, 
    restaurant_id: 2, 
    rating: 5,
    review_text: 'Great food and service!',
  },
 {
    user_id: 2,
    restaurant_id: 5, 
    rating: 2,
    review_text: 'Very sticky restaurant!',
  },
 {
    user_id: 4, 
    restaurant_id: 2, 
    rating: 5,
    review_text: 'The food was wonderful, service was phenomenal',
  },
 {
    user_id: 5, 
    restaurant_id: 6, 
    rating: 3,
    review_text: 'Food was cold but the service was great',
  }, 
  {
    user_id: 1, 
    restaurant_id: 12, 
    rating: 5,
    review_text: "Your tastebuds will take flight here!"
  }, 
  {
    user_id: 1, 
    restaurant_id: 11, 
    rating: 3,
    review_text: "I found a hair in my food!"
  },
  {
    user_id: 1, 
    restaurant_id: 9, 
    rating: 5,
    review_text: "very fresh!"
  },
  {
    user_id: 2, 
    restaurant_id: 8, 
    rating: 3,
    review_text: "something smells fishy here"
  },
  {
    user_id: 2, 
    restaurant_id: 10, 
    rating: 3,
    review_text: "small portions, they didn't have any chicken!"
  },
  {
    user_id: 3, 
    restaurant_id: 12, 
    rating: 4,
    review_text: "Unique restaurant where all of the wait staff are actually pigeons in tuxedos"
  },
  {
    user_id: 3, 
    restaurant_id: 10, 
    rating: 3,
    review_text: "the food was cooked well, but under-seasoned"
  },
  {
    user_id: 3, 
    restaurant_id: 8, 
    rating: 4,
    review_text: "quick and friendly service"
  },
  {
    user_id: 4, 
    restaurant_id: 7, 
    rating: 4,
    review_text: "tasty tea"
  },
  {
    user_id: 4, 
    restaurant_id: 11, 
    rating: 5,
    review_text: "Delicious combo of spices and flavors!"
  },
  {
    user_id: 5, 
    restaurant_id: 7, 
    rating: 5,
    review_text: "Great new bubble tea shoppe!"
  },
  {
    user_id: 5, 
    restaurant_id: 9, 
    rating: 5,
    review_text: "yummy and refreshing!"
  }
];

const dropTables = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS comments;
    DROP TABLE IF EXISTS reviews;
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
            CONSTRAINT valid_rating CHECK (rating >= 0 AND rating <= 5)
        );`);

        );
        CREATE TABLE comments(
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id),
          review_id INT REFERENCES reviews(id),
          comment VARCHAR(255)
        );
      `);

  } catch (err) {
    throw err;
  }
};

// Your seed script
const insertUsers = async () => {
  try {
    for (const [index, user] of users.entries()) {
      const isEmily = user.name === "Emily Johnson";
      const createdUser = await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
        is_admin: isEmily, // Set is_admin to true for Emily Johnson
      });

      console.log("User inserted:", createdUser);

      if (isEmily) {
        console.log("Making Emily an admin...");
        await db.query("UPDATE users SET is_admin = true WHERE id = $1", [createdUser.id]);
      }
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

      // Update average rating for the restaurant after each review insertion
      await updateAverageRating(review.restaurant_id);
    }
    console.log("Reviews data inserted successfully.");
  } catch (error) {
    console.error("Error inserting review data:", error);
  }
};

const updateAverageRating = async (restaurantId) => {
  try {
    const result = await db.query(`
      UPDATE restaurants
      SET average_rating = (
        SELECT AVG(rating) FROM reviews
        WHERE restaurant_id = $1
      )
      WHERE id = $1
    `, [restaurantId]);
  } catch (error) {
    console.error("Error updating average rating:", error);
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
