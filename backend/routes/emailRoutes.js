const express = require('express');
const { sendJobAlert } = require('../controllers/emailController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/send-alert', verifyToken, sendJobAlert);

module.exports = router;

