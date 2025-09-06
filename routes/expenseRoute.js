const express = require('express');
const validate = require('../middleware/validate');
const { createExpenseSchema } = require('../validators/expenseValidator');
const { createExpense } = require('../controllers/expenseController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken);

router.post('/', validate(createExpenseSchema), createExpense);

module.exports = router;
