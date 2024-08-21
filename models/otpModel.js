const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  attempts: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // 5 minutes
  }
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;

