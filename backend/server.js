import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/authRouter.js';
import { filesRouter } from './routes/filesRouter.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));

// Define the allowed origins
const allowedOrigins = [
  (`http://localhost:${PORT}`),       // Your local frontend (adjust port as needed)
  "https://ferrum-web-frontend.onrender.com"    // Your Render backend or frontend domain if applicable
];


// Allow requests from specific origin
// app.use(cors({
//     origin: (origin, callback) => {
//       // Allow requests with no origin (e.g., mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       // Check if origin contains "localhost"
//       if (/^http:\/\/localhost(:\d+)?$/.test(origin)) {
//         return callback(null, true);
//       } 
//       if (origin === "https://f-web-1.onrender.com") {

//       }
//       else {
//         return callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//     credentials: true // If sending cookies or authorization headers
// }));

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);
    
    // Allow if the origin is in the allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Otherwise, block the request
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// app.use(cors({
//   origin: true, // This will allow all origins
//   credentials: true
// }));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/files", filesRouter);   // Fetch List of Hardware Files from Database


// Run when Starting server

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
})