const express = require('express');
const multer = require('multer');
const path = require('path'); // Import path module
const fs = require('fs'); // Import fs module to check/create directories
const postController = require('../controllers/postController');

const router = express.Router();

// Define the path for uploads
const uploadsPath = path.join(__dirname, '../uploads');

// Ensure the 'uploads' folder exists, if not create it
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true }); // Create the folder if it doesn't exist
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Use the correct 'src/uploads' path for file storage
    cb(null, uploadsPath); // Store files in the 'src/uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use timestamp + original filename
  },
});

const upload = multer({ storage });

// Middleware to dynamically handle fields
const dynamicUpload = (req, res, next) => {
  const fields = [
    { name: 'imagePost', maxCount: 1 },
  ];

  // Add dynamic imageUpload fields
  for (let i = 1; i <= 50; i++) {
    fields.push({ name: `imageUpload${i}`, maxCount: 50 });
  }

  // Conditionally add companyLogo field
  if (req.body.isSponsored === 'true') {
    fields.push({ name: 'companyLogo', maxCount: 1 });
  }

  upload.fields(fields)(req, res, next);
};

router.post(
  '/create',
  dynamicUpload,
  postController.createPost // Ensure the controller uses the full path for image URLs
);

router.get('/allpost', postController.getAllPosts);
router.get('/allpost/:id', postController.getPostById);
router.put(
  '/update/:id',
  upload.fields([
    { name: 'imagePost', maxCount: 1 },
    { name: 'imageUpload', maxCount: 10 },
    { name: 'companyLogo', maxCount: 1 },
  ]),
  postController.updatePost
);

module.exports = router;
