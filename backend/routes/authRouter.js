import { Router } from "express";
import bcrypt from 'bcryptjs';
import { pool } from "../databases/database.js";
import { authenticateRequest, authWeb } from "../middleware/authMiddleware.js";
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { createKey, getKey } from "../middleware/TheAuthAPIInit.js";

const parseForm = multer().none();

const authRouter = Router();

// /auth/me Route to verify user

authRouter.get('/me', authenticateRequest, async (req, res) => {
  try {
    console.log('Request User:', req.user); // Log the user from the JWT
    const { email } = req.user;

    if (!email) {
      return res.status(400).json({ message: 'Invalid user email in token' });
    }

    const { rows:users } = await pool.query(
      'SELECT id, username, email FROM users WHERE email = $1',
      [email]
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
authRouter.post('/login', authWeb, parseForm, async (req, res) => {
  console.log(`Request Body: ${JSON.stringify(req.body)}`);
  const { email_username, password } = req.body;

  if (!email_username || !password) {
    return res.status(400).json({success: false, message: "Bad Request: Missing email_username or password."});
  }

  try {
    // Check if user exists in DB
    const { rows: users } = await pool.query(
        'SELECT * FROM users WHERE username = $1 OR email = $2',
        [email_username, email_username]
    );

    // console.log(users);

    if (users.length === 0) {
      return res.status(400).json({success: false, message:'User not found'});
    }

    let isAuthenticated = false;
    let authenticatedUser = null;
    
    // Compare Passwords
    for (const user of users) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
          isAuthenticated = true;
          authenticatedUser = user;
          break;
      }
    }

    if (!isAuthenticated) {
      return res.status(400).json({success: false, message:"Invalid password"});
    }

    // Create API Key (For desktop app)
    const apiKey = await getKey(authenticatedUser.username);

    // Sign JWT
    const token = jwt.sign(
      { email: authenticatedUser.email, username: authenticatedUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Creating refresh token 
    const refreshToken = jwt.sign(
      { email: authenticatedUser.email, username: authenticatedUser.username },
      process.env.REFRESH_TOKEN_SECRET, 
      { expiresIn: '3d' }   // 3 Days
    );

    // Assigning refresh token in http-only cookie 
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None', secure: true,
        maxAge: 3 * 24 * 60 * 60 * 1000   // 3 Days
    });
  
    res.json({ token, key: apiKey, username: authenticatedUser.username });
  } catch (error) {
    console.error('Error Logging in:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });;
  }
});

// POST /refresh route
authRouter.post('/refresh', authWeb, (req, res) => {
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
          { email: decodedUser.email, username: decodedUser.username },
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
authRouter.post('/signup', authWeb, parseForm, async (req, res) => {
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

      const apiKey = await createKey({ email, username });

      res.status(201).json({message:'User created successfully', key:apiKey});
      } catch (error) {
        if (error.code === '23505') {
          res.status(400).json({success: false, message:'Email is already in use'});
      } else {
        console.error('Error Signing Up:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });;
      }
  }

})

export {authRouter};