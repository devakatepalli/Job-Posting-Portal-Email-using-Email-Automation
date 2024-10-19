const Job = require('../models/Job');

// Post job
exports.postJob = async (req, res) => {
    const { title, description, experienceLevel, endDate } = req.body;

    try {
        const job = new Job({ title, description, experienceLevel, endDate, company: req.company.id });
        await job.save();
        res.status(201).json({ message: 'Job posted successfully', job });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
