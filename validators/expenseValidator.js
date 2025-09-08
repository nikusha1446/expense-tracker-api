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

const getExpensesSchema = Joi.object({
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
    .optional(),
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date()
    .iso()
    .when('startDate', {
      is: Joi.exist(),
      then: Joi.date().min(Joi.ref('startDate')),
      otherwise: Joi.date(),
    })
    .optional(),
  sortBy: Joi.string().valid('date', 'amount', 'title', 'createdAt'),
  sortOrder: Joi.string().valid('asc', 'desc'),
});

const updateExpenseSchema = Joi.object({
  title: Joi.string().min(1).max(255).trim().optional(),
  description: Joi.string().max(1000).allow('').optional(),
  amount: Joi.number().precision(2).positive().optional(),
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
    .optional(),
  date: Joi.date().iso().max('now').optional(),
}).min(1);

module.exports = {
  createExpenseSchema,
  getExpensesSchema,
  updateExpenseSchema,
};
