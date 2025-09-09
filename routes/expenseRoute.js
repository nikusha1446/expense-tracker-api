const express = require('express');
const validate = require('../middleware/validate');
const {
  createExpenseSchema,
  getExpensesSchema,
  updateExpenseSchema,
} = require('../validators/expenseValidator');
const {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken);

router.post('/', validate(createExpenseSchema), createExpense);
router.get('/', validate(getExpensesSchema, 'query'), getExpenses);
router.get('/:id', getExpense);
router.put('/:id', validate(updateExpenseSchema), updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
