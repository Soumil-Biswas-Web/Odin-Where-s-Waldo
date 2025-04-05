import { Router } from "express";
import upload from "../middleware/multerUploader.js";
import { pool } from "../databases/database.js";
import {uploadToCloudinary, deleteFronCloudinary} from "../middleware/cloudinaryInit.js";
import { authenticateRequest, authWeb } from "../middleware/authMiddleware.js";

const filesRouter = Router();

filesRouter.get('/fetch', authWeb, async (req, res) => {
    console.log(req.query);
    try {
      const { user } = req.query;
  
      if (!user) {
        return res.status(400).json({ message: 'User email is required' });
      }
  
      // Query to fetch files associated with the user
      const {rows:files} = await pool.query(
        'SELECT fileid, filename, path, mimetype, uploadDate FROM files WHERE "user" = $1',
        [user]
      );
    
      res.json({ success: true, files });
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

filesRouter.post('/upload', upload.single('file'), authenticateRequest, async (req, res) => {
  try {
    console.log("Uploading file...");
    console.log('Request User:', req.user); // Log the user from the JWT or the API key
    const userEmail = req.user.email;

    const file = req.file; // Multer attaches file info here
    // console.log(JSON.stringify(req.body));

    console.log(file);

    if (!file) {
      return res.status(400).json({ message: 'No File Detected' });
    }

    if (!userEmail) {
      return res.status(400).json({ message: 'No User Detected' });
    }

    // Upload file to Coudinary
    const result = await uploadToCloudinary(file);
    console.log(result);

    // Save file metadata in the database
    await pool.query(
      'INSERT INTO files (fileid, filename, path, mimetype, size, "user") VALUES ($1, $2, $3, $4, $5, $6)',
      [result.public_id, file.originalname, result.secure_url, file.mimetype, file.size, userEmail]
    );

    res.json({ success: true, message: 'File uploaded successfully', fileid: file.filename });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }  
});

// Send back file (path) to display page
filesRouter.get('/use', authWeb, async (req, res) => {
  console.log(req.query);
  try {
    const { fileid } = req.query;

    // Query the database to get the file metadata
    const {rows:files} = await pool.query('SELECT path, mimetype, filename FROM files WHERE fileid = $1', [fileid]);
    
    if (files.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }

    const fileData = files[0];

    console.log(fileData.path);
    res.redirect(fileData.path); 

  } catch (error) {
      console.error('Error fetching file:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

export {filesRouter};
