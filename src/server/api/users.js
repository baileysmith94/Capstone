const express = require('express');
const usersRouter = express.Router();
const { getAllUsers, createUser, getUser, getUserByEmail, getUserById } = require('../db');
const { JWT_SECRET = "somesecretvalue" } = process.env;
const jwt = require('jsonwebtoken');

// Authentication
// const authenticateUser = (req, res, next) => {
//     try {
        
//       const token = req.headers.authorization.split(' ')[1];
  
//       if (!token) {
//         return res.status(401).json({ error: 'Unauthorized' });
//       }
  
      
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
//       // Add the decoded user information to req.user
//       req.user = decoded;
  
//       next();
//     } catch (error) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
//   };


// usersRouter.use("/users/profile", authenticateUser);

usersRouter.get('/', async( req, res, next) => {
    try {
        const users = await getAllUsers();

        res.send({
            users
        });
    } catch ({name, message}) {
        next({name, message})
    }
});

usersRouter.post('/login', async(req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    try {
        const user = await getUser({email, password});
        if(user) {
            const token = jwt.sign({
                // changed from id: user.id
                user_id: user.id,
                email:user.email
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                message: 'Login successful!',
                token
            });
        }
        else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch(err) {
        next(err);
    }
});

// usersRouter.get("/users/profile", async (req, res) => {
//     try {
//       const userId = req.user.user_id;
//       const user = await getUserById(userId);
  
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       res.json(user);
//     } catch (error) {
//       return res.status(500).json({ error: "Unable to fetch user profile. Is there a token?" });
//     }
//   });

  usersRouter.get('/profile', async (req, res, next) => {
    const prefix = "Bearer ";
    const auth = req.header("Authorization");
  
    if (!auth) {
      // nothing to see here
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
  
      try {
        // match token w the .env phrase
        const parsedToken = jwt.verify(token, JWT_SECRET);
  
        const id = parsedToken && parsedToken.id;
        // look up user by id and now have user with token!!
        if (id) {
          req.user = await getUserById(id);
          next();
        }
      } catch (error) {
        next(error);
      }
    } else {
      next({
        name: "AuthorizationHeaderError",
        message: `Authorization token must start with ${prefix}`,
      });
    }
  });
  

usersRouter.post('/register', async(req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const _user = await getUserByEmail(email);

        if(_user) {
            next({
                name: 'UserExistsError',
                message: 'A user with that email already exists'
            });
        }

        const user = await createUser({
            name,
            email,
            password
        });

        const token = jwt.sign({
            id: user.id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: 'Sign up successful!',
            token
        });
    } catch({name, message}) {
        next({name, message})
    }
})

module.exports = usersRouter;