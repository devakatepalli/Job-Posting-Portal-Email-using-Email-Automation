const nodemailer = require('nodemailer');

const sendJobAlert = async (req, res) => {
    const { candidates, jobDetails } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS, // Your email password or app password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        subject: 'New Job Alert',
        html: `<h1>${jobDetails.title}</h1><p>${jobDetails.description}</p>`,
    };

    for (const candidate of candidates) {
        mailOptions.to = candidate.email;
        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            return res.status(500).json({ message: `Error sending email to ${candidate.email}` });
        }
    }
    res.json({ message: 'Job alerts sent successfully!' });
};

module.exports = { sendJobAlert };
