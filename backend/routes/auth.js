const express = require('express');
const { register, login } = require('../controllers/authController');
const { forgotPassword, resetPassword } = require('../controllers/resetController');

const router = express.Router();

router.post('/api/register', register);
router.post('/api/login', login);
router.post('/api/forgot-password', forgotPassword);
router.post('/api/reset-password/:token', resetPassword);

module.exports = router;

