const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middleware/validate');
const { signupSchema, loginSchema, otpSchema, verifyOtpSchema, resetPasswordSchema } = require('../middleware/validation');

router.post('/signup', validate(signupSchema), userController.signup);
router.post('/login', validate(loginSchema), userController.login);
router.post('/send-otp', validate(otpSchema), userController.sendOtp);
router.post('/verify-otp', validate(verifyOtpSchema), userController.verifyOtp);
router.post('/reset-password', validate(resetPasswordSchema), userController.resetPassword);

module.exports = router;
