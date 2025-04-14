import { Router } from "express";
import bcrypt from 'bcryptjs';
import { authenticateRequest } from "../middleware/authMiddleware.js";
import jwt from 'jsonwebtoken';
import multer from 'multer';
import prisma from "../middleware/prismaInit.js";

const parseForm = multer().none();

const route = Router();

// /auth/me Route to verify user

route.get('/me', authenticateRequest, async (req, res) => {
  try {
    console.log('Request User:', req.user); // Log the user from the JWT
    const { username } = req.user;

    if (!username) {
      return res.status(400).json({ message: 'Invalid user username in token' });
    }

    // const { rows:users } = await pool.query(
    //   'SELECT id, username, email FROM users WHERE email = $1',
    //   [email]
    // );

    const user = await prisma.ob_User.findUnique({
      where: {username},
      select: {
        id: true,
        username: true,
      }
    })

    console.log('Database Query Result: ', user); // Log the database query result

    if (user === null) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Respond with user details
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST /login route
route.post('/login', parseForm, async (req, res) => {
  console.log(`Request Body: ${JSON.stringify(req.body)}`);
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({success: false, message: "Bad Request: Missing username or password."});
  }

  try {
    // Check if user exists in DB
    // const { rows: users } = await pool.query(
    //     'SELECT * FROM users WHERE username = $1 OR email = $2',
    //     [email_username, email_username]
    // );

    const user = await prisma.ob_User.findUnique({
      where: {username}
    })

    // console.log(user);

    if (user === null) {
      return res.status(400).json({success: false, message:'User not found'});
    }

    let isAuthenticated = false;
    let authenticatedUser = null;
    
    // Compare Passwords
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        isAuthenticated = true;
        authenticatedUser = user;
    }

    if (!isAuthenticated) {
      return res.status(400).json({success: false, message:"Invalid password"});
    }

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
  
    res.json({ token, username: authenticatedUser.username });
  } catch (error) {
    console.error('Error Logging in:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });;
  }
});

// POST /refresh route
route.post('/refresh', (req, res) => {
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
route.post('/signup', parseForm, async (req, res) => {
  console.log(`Signup request: ${JSON.stringify(req.body)}`);
  const { username, password } = req.body;
    
  try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into database
      // await pool.query(
      //     'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      //     [username, email, hashedPassword]
      // );

      await prisma.ob_User.create({
        data: {
          username,
          password: hashedPassword,
        }
      })

      res.status(201).json({message:'User created successfully'});
      } catch (error) {
        if (error.code === '23505') {
          res.status(400).json({success: false, message:'Email is already in use'});
      } else {
        console.error('Error Signing Up:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });;
      }
  }

})

export default route;