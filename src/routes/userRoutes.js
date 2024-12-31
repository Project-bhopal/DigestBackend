const express = require('express');
const router = express.Router();
const { createUser, login } = require('../controllers/userController');

// POST /api/users/create
router.post('/create', createUser);
router.post('/login', login);

module.exports = router;
