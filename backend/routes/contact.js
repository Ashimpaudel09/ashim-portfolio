// routes/contact.js
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
// routes/contact.js
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,      // <-- use your own SMTP email here
    to: process.env.SMTP_USER,        // <-- your email to receive messages
    subject: `Portfolio Contact from ${name}`,
    text: `You have a new message from your portfolio contact form.\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n\n` +
          `Message:\n${message}`,
    replyTo: email,                   // <-- allows replying directly to sender
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default router;
