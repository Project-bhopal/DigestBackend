const express = require('express');
const multer = require('multer');
const postController = require('../controllers/postController');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use timestamp + original filename
  },
});

const upload = multer({ storage });

router.post(
  '/create',
  upload.fields([
    { name: 'imagePost', maxCount: 1 },
    { name: 'imageUpload', maxCount: 10 },
    { name: 'companyLogo', maxCount: 1 }, // For sponsored company logo
  ]),
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
