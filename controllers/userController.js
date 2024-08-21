const userService = require('../services/userService');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.signupUser(name, email, password);
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    if (error.message === "User already exists") {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
    req.session.email = email;
    res.status(200).json({ success: true, message: "User logged in successfully", data: req.session.email });
  } catch (error) {
    if (error.message === "Invalid email or password") {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const sendOtp = async (req, res) => {
  const { email } = req.body;
  try { 
    // const { email } = req.body;   
    const otp = await userService.sendOtp(email);
    res.status(200).json({ success: true, message: "OTP sent successfully", otp });
  } catch (error) {
    if (error.message === "User does not exist") {
      return res.status(200).json({ success: false, message: "User does not exist", email});
    }
    if (error.message === "You have reached the maximum number of OTP attempts. Please try again later.") {
      return res.status(429).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if (!email) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const otpRecord = await userService.verifyOtp(email, otp);
    res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password, otp, nwpassword } = req.body;
    const user = await userService.resetPassword(email, otp, password, nwpassword);
    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  signup,
  login,
  sendOtp,
  verifyOtp,
  resetPassword,
};
