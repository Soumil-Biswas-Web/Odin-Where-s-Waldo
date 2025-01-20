import { Router } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from "../databases/database.js";

const authRouter = Router();

// Middleware to verify token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
  
    if (!token) return res.status(401).json({ message: 'Token is required' });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid or expired token' });
      req.user = user; // Attach user payload to request
      next();
    });
};

// /auth/me Route to verify user
authRouter.get('/me', authenticateToken, async (req, res) => {
    try {
      const { id } = req.user; // Assuming JWT payload contains `id`
      const [user] = await pool.query('SELECT id, username, email FROM users WHERE id = ?', [id]);
  
      if (!user || user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      console.log(user[0]);
      res.json(user[0]); // Respond with user details
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST /login route
authRouter.post('/login', async (req, res) => {
  console.log(`Login request: ${req.body}`);
  const { email_username, password } = req.body;

  try {
    // Check if the user exists
    const [users] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [email_username, email_username]
    );

    // console.log(users);

    if (users.length === 0) {
      return res.status(400).send('User not found');
    }

    let user;
    
    for (user of users) {
      // Compare the password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).send('Invalid password');
      }
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token:token, username: user.username });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// POST  /signup route
authRouter.post('/signup', async (req, res) => {
    console.log(`Signup request: ${req.body}`);
    const { email, username, password } = req.body;
    
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).send('User created successfully');
        } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).send('Email is already in use');
        } else {
            res.status(500).send('Server error');
        }
    }

})

export {authRouter};