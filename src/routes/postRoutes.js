const express = require('express');
const multer = require('multer');
const { createPost } = require('../controllers/postController');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  '/create',
  upload.fields([
    { name: 'imagePost', maxCount: 1 },
    { name: 'imageUpload', maxCount: 10 },
  ]),
  createPost
);

module.exports = router;
