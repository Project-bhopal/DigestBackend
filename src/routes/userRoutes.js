const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController');

// POST /api/users/create
router.post('/create', createUser);

module.exports = router;
