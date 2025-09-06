const Joi = require('joi');

const createExpenseSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().max(1000).allow('').optional(),
  amount: Joi.number().precision(2).positive().required(),
  category: Joi.string()
    .valid(
      'GROCERIES',
      'LEISURE',
      'ELECTRONICS',
      'UTILITIES',
      'CLOTHING',
      'HEALTH',
      'OTHERS'
    )
    .insensitive()
    .required(),
  date: Joi.date().iso().max('now').optional(), // Prevents future dates
});

module.exports = { createExpenseSchema };
