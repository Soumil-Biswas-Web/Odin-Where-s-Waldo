import { Router } from "express";
import upload from "../middleware/multerUploader.js";
import { pool } from "../databases/database.js";
import { authRefreshToken } from "../middleware/jwt.js";
import {uploadToCloudinary, deleteFronCloudinary} from "../middleware/cloudinaryInit.js";


function parseFilename(storedFilename) {    // Use it if you need to
  // Split the filename at the first hyphen
  const [timestamp, ...originalNameParts] = storedFilename.split('-');
  
  // Join the rest of the parts back into the original filename
  const originalFilename = originalNameParts.join('-');

  // Convert the timestamp to a human-readable date
  const uploadDate = new Date(parseInt(timestamp, 10)).toLocaleString();

  return { uploadDate, originalFilename };
}

// // Example usage
// const storedFilename = '1736853070273-Hardware.json';
// const parsedData = parseFilename(storedFilename);

// console.log(parsedData);
// // Output:
// // { uploadDate: '1/15/2025, 10:44:30 AM', originalFilename: 'Hardware.json' }

const filesRouter = Router();

filesRouter.get('/fetch', async (req, res) => {
    console.log(req.query);
    try {
      const { user } = req.query;
  
      if (!user) {
        return res.status(400).json({ message: 'User ID is required' });
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

filesRouter.post('/upload', upload.single('file'), authRefreshToken, async (req, res) => {
  try {
    console.log("Uploading file...");
    console.log('Request User:', req.user); // Log the user from the JWT
    const user = req.user.username;

    const file = req.file; // Multer attaches file info here
    // console.log(JSON.stringify(req.body));

    console.log(file);

    if (!file) {
      return res.status(400).json({ message: 'No File Detected' });
    }

    if (!user) {
      return res.status(400).json({ message: 'No User Detected' });
    }

    // Upload file to Coudinary
    const result = await uploadToCloudinary(file);
    console.log(result);

    // Save file metadata in the database
    await pool.query(
      'INSERT INTO files (fileid, filename, path, mimetype, size, "user") VALUES ($1, $2, $3, $4, $5, $6)',
      [result.public_id, file.originalname, result.secure_url, file.mimetype, file.size, user]
    );

    res.json({ success: true, message: 'File uploaded successfully', fileid: file.filename });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }  
});

// Send back file (path) to display page
filesRouter.get('/use', async (req, res) => {
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
