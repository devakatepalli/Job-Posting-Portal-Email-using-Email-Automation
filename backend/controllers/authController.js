const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Register a new company
const registerCompany = async (req, res) => {
    const { name, email, password, mobile } = req.body;
    try {
        // Check if the company already exists
        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
            return res.status(400).json({ message: 'Company already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newCompany = new Company({ name, email, password: hashedPassword, mobile, isVerified: false });
        await newCompany.save();

        // Send verification email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const verificationToken = jwt.sign({ id: newCompany._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const verificationUrl = `http://localhost:5000/api/auth/verify/${verificationToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            html: `<h1>Email Verification</h1><p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p>`,
        };

        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: 'Company registered successfully. Check your email to verify.' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Login a company or test user
const loginCompany = async (req, res) => {
    const { email, password } = req.body;

    // Set a default username and password for testing
    const defaultUsername = 'testUser';
    const defaultPassword = 'testPassword123';

    // Check if the provided credentials match the default credentials
    if (email === defaultUsername && password === defaultPassword) {
        // Generate a JWT token if credentials are correct
        const token = jwt.sign({ username: defaultUsername }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token, message: 'Login successful!' });
    }

    // Check if company exists in the database
    const company = await Company.findOne({ email });
    if (!company) return res.status(404).json({ message: 'Company not found.' });

    if (!company.isVerified) {
        return res.status(403).json({ message: 'Email not verified. Please check your inbox for the verification email.' });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password.' });

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

// Verify email
const verifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const company = await Company.findById(decoded.id);
        if (!company) return res.status(404).json({ message: 'Company not found.' });

        company.isVerified = true;
        await company.save();
        res.json({ message: 'Email verified successfully! You can now log in.' });
    } catch (err) {
        res.status(400).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = { registerCompany, loginCompany, verifyEmail };
