const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/userController');

// POST /api/users/create
router.post('/create', createUser);
router.post('/login', loginUser);

module.exports = router;
