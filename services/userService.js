const bcrypt = require('bcryptjs');
const OTP = require('../models/otpModel');
const Users = require('../models/userModel');
const sendOTPEmail = require('../helpers/userAuthenticate');


const generateOTP = () => {
  const otpLength = 6; 
  let otp = '';
  for (let i = 0; i < otpLength; i++) {
    otp += Math.floor(Math.random() * 10); 
  }
  return otp;
};

const signupUser = async (name, email, password) => {
  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Users({
        name,
        email,
        password: hashedPassword
    });
    // Save the user to the database
    await newUser.save();
    return newUser;
};

const loginUser = async (email, password) => {
  const user = await Users.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  return user;
};

const sendOtp = async (email) => {
  const user = await Users.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }
   // Find the existing OTP record for the user
  let otpRecord = await OTP.findOne({ email });

  // Check if the user has reached the maximum attempt limit
  if (otpRecord && otpRecord.attempts >= 3) {
    throw new Error("You have reached the maximum number of OTP attempts. Please try again later.");
  }

   // Generate a new OTP
  const otp = generateOTP();
  if (otpRecord) {
    otpRecord.otp = otp;
    otpRecord.attempts += 1;
    await otpRecord.save();
  } else {
    otpRecord = new OTP({
      email,
      otp,
      attempts: 1
    });
    await otpRecord.save();
  }
  await sendOTPEmail(email, otp);
  return otp;
};

const verifyOtp = async (email, otp) => {
  const otpRecord = await OTP.findOne({ email, otp });
  if (!otpRecord) {
    throw new Error("Invalid OTP");
  }
  return otpRecord;
};

const resetPassword = async (email, otp, password, nwpassword) => {
  const user = await Users.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const otpRecord = await OTP.findOne({ email, otp });  // Verify the OTP
  if (!otpRecord) {
    throw new Error('Invalid OTP');
  }

  if (password !== nwpassword) {
    throw new Error('New passwords do not match');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(nwpassword, salt);

  user.password = hashedPassword;
  await user.save();
  return user;
};

module.exports = {
  signupUser,
  loginUser,
  sendOtp,
  verifyOtp,
  resetPassword,
};
