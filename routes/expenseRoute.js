const express = require('express');
const validate = require('../middleware/validate');
const {
  createExpenseSchema,
  getExpensesSchema,
} = require('../validators/expenseValidator');
const {
  createExpense,
  getExpenses,
  getExpense,
} = require('../controllers/expenseController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken);

router.post('/', validate(createExpenseSchema), createExpense);
router.get('/', validate(getExpensesSchema, 'query'), getExpenses);
router.get('/:id', getExpense);

module.exports = router;
