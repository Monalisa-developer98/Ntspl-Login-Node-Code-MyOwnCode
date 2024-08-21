const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required()
  .messages({
    'string.base': 'Name should be a type of text',
    'string.empty': 'Name cannot be an empty field',
    'string.min': 'Name should have a minimum length of {#limit}',
    'string.max': 'Name should have a maximum length of {#limit}',
    'any.required': 'Name is a required field'
  }),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
  .messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email cannot be an empty field',
    'any.required': 'Email is a required field'
  }),
  password: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
  .messages({
    'string.min': 'Password should have a minimum length of {#limit}',
    'string.empty': 'Password cannot be an empty field',
    'any.required': 'Password is a required field'
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
  .messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email cannot be an empty field',
    'any.required': 'Email is required'
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
  .messages({
    'string.min': 'Password should have a minimum length of {#limit}',
    'string.empty': 'Password cannot be an empty field',
    'any.required': 'Password is a required field'
  })
});

const otpSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
});

const verifyOtpSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  otp: Joi.string().length(6).required(),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  otp: Joi.string().length(6).required(),
  nwpassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

module.exports = {
  signupSchema,
  loginSchema,
  otpSchema,
  verifyOtpSchema,
  resetPasswordSchema,
};
