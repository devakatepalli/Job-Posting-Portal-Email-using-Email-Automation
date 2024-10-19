const express = require('express');
const { registerCompany, loginCompany, verifyEmail } = require('../controllers/authController'); // Import the verifyEmail function
const router = express.Router();

// Register a new company
router.post('/register', registerCompany);

// Login for a company
router.post('/login', loginCompany);

// Verify email address
router.get('/verify/:token', verifyEmail); // Add the verification route

module.exports = router;
