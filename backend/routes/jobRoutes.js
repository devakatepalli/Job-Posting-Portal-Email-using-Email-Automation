const express = require('express');
const { postJob } = require('../controllers/jobController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, postJob);

module.exports = router;
