import { Router } from "express";
import bcrypt from 'bcryptjs';
import { authenticateToken } from "../middleware/jwt.js";
import jwt from 'jsonwebtoken';
import { pool } from "../databases/database.js";
import multer from 'multer';

const parseForm = multer().none();

const authRouter = Router();

// /auth/me Route to verify user

// authRouter.get('/me', authenticateToken, async (req, res) => {
//     try {
//       const { id } = req.user; // Assuming JWT payload contains `id`
//       const [user] = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [id]);
  
//       if (!user || user.length === 0) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       console.log(user[0]);
//       res.json(user[0]); // Respond with user details
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

authRouter.get('/me', authenticateToken, async (req, res) => {
  try {
    console.log('Request User:', req.user); // Log the user from the JWT
    const { id } = req.user;

    if (!id) {
      return res.status(400).json({ message: 'Invalid user ID in token' });
    }

    const { rows:users } = await pool.query(
      'SELECT id, username, email FROM users WHERE id = $1',
      [id]
    );

    console.log('Database Query Result: ', users); // Log the database query result

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(users[0]); // Respond with user details
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST /login route
authRouter.post('/login',parseForm, async (req, res) => {
  console.log(`Request Body: ${JSON.stringify(req.body)}`);
  const { email_username, password } = req.body;

  if (!email_username || !password) {
    return res.status(400).send("Bad Request: Missing email_username or password.");
  }

  try {
    const { rows: users } = await pool.query(
        'SELECT * FROM users WHERE username = $1 OR email = $2',
        [email_username, email_username]
    );

    // console.log(users);

    if (users.length === 0) {
      return res.status(400).send('User not found');
    }

    // let user;

    let isAuthenticated = false;
    let authenticatedUser = null;
    
    for (const user of users) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
          isAuthenticated = true;
          authenticatedUser = user;
          break;
      }
    }

    if (!isAuthenticated) {
      return res.status(400).send("Invalid password");
    }

    const token = jwt.sign(
      { id: authenticatedUser.id, username: authenticatedUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Creating refresh token 
    const refreshToken = jwt.sign(
      { id: authenticatedUser.id, username: authenticatedUser.username },
      process.env.REFRESH_TOKEN_SECRET, 
      { expiresIn: '3d' }   // 3 Days
    );

    // Assigning refresh token in http-only cookie 
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None', secure: true,
        maxAge: 3 * 24 * 60 * 60 * 1000   // 3 Days
    });
  
    res.json({ token, username: authenticatedUser.username });
  } catch (error) {
    console.error('Error Logging in:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });;
  }
});

// POST /refresh route
authRouter.post('/refresh', (req, res) => {
  if (req.cookies?.jwt) {
    // Destructuring refreshToken from cookie
    const refreshToken = req.cookies.jwt;

    // Verifying refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedUser) => {
      if (err) {
        // Wrong Refesh Token
        return res.status(406).json({ message: 'Unauthorized' });
      }
      else {
        // Correct token we send a new access token
        const accessToken = jwt.sign(      
          { id: decodedUser.id, username: decodedUser.username },
          process.env.JWT_SECRET,
          { expiresIn: '1h' });
        return res.json({ accessToken });
      }
    })
  } else {
      return res.status(406).json({ message: 'Unauthorized' });
  }
})

// POST  /signup route
authRouter.post('/signup',parseForm, async (req, res) => {
  console.log(`Signup request: ${JSON.stringify(req.body)}`);
  const { email, username, password } = req.body;
    
  try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into database
      await pool.query(
          'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
          [username, email, hashedPassword]
      );

      res.status(201).send('User created successfully');
      } catch (error) {
        if (error.code === '23505') {
          res.status(400).send('Email is already in use');
      } else {
        console.error('Error Signing Up:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });;
      }
  }

})

export {authRouter};