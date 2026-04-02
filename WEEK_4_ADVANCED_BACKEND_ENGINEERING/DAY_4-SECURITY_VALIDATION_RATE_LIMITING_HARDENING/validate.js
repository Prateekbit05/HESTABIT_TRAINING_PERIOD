const Joi = require('joi');

const userSchemas = {
  register: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
    firstName: Joi.string().min(2).max(50).trim().required().messages({
      'string.min': 'First name must be at least 2 characters long',
      'string.max': 'First name cannot exceed 50 characters',
      'any.required': 'First name is required'
    }),
    password: Joi.string().min(8).max(128).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password cannot exceed 128 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      'any.required': 'Password is required'
    })
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  changePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).max(128).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required()
  })
};

const productSchemas = {
  create: Joi.object({
    name: Joi.string().min(3).max(100).trim().required(),
    description: Joi.string().max(2000).trim().allow(''),
    price: Joi.number().positive().precision(2).required(),
    category: Joi.string().trim().required(),
    stock: Joi.number().integer().min(0).default(0)
  }),
  update: Joi.object({
    name: Joi.string().min(3).max(100).trim(),
    description: Joi.string().max(2000).trim().allow(''),
    price: Joi.number().positive().precision(2),
    category: Joi.string().trim(),
    stock: Joi.number().integer().min(0)
  }).min(1),
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    category: Joi.string().trim(),
    minPrice: Joi.number().positive(),
    maxPrice: Joi.number().positive(),
    search: Joi.string().trim().max(100),
    sort: Joi.string().valid('name', '-name', 'price', '-price', 'createdAt', '-createdAt').default('-createdAt')
  })
};

const validate = (schema) => {
  return (req, res, next) => {
    const dataToValidate = req.body || req.query || req.params;
    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    if (req.body && Object.keys(req.body).length > 0) req.body = value;
    if (req.query && Object.keys(req.query).length > 0) req.query = value;

    next();
  };
};

module.exports = { validate, userSchemas, productSchemas };
// Validate middleware: JOI/Zod schema validation for User and Product request payloads
