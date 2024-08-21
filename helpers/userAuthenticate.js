const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'monalisamahanta98@gmail.com',
      pass: 'ccnnvyabddelnehj',
    },
  });
  
const sendOTPEmail = async (recipientEmail, otp) => {
    const mailOptions = {
      from: 'monalisamahanta98@gmail.com',
      to: recipientEmail,
      subject: 'Your OTP for Verification',
      text: `Your OTP for verification is: ${otp}. It will expire in 5 minutes.`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('OTP to email sent successfully.');
    } catch (error) {
      console.error('Error sending OTP email:', error.message);
    }
};

module.exports = sendOTPEmail;