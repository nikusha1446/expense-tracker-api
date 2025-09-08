const prisma = require('../utils/db');

const createExpense = async (req, res) => {
  try {
    const { title, description, amount, category, date } = req.body;

    const expenseDate = date ? new Date(date) : new Date();

    const expense = await prisma.expense.create({
      data: {
        title: title.trim(),
        description: description ? description.trim() : null,
        amount,
        category: category.toUpperCase(),
        date: expenseDate,
        userId: req.user.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        amount: true,
        category: true,
        date: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({ message: 'Expense created successfully', expense });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: 'Internal server error' });
  }
};

const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      category,
      startDate,
      endDate,
      sortBy = 'date',
      sortOrder = 'desc',
    } = req.query;

    const where = { userId };

    if (category) {
      where.category = category.toUpperCase();
    }

    if (startDate || endDate) {
      where.date = {};
      if (startDate) {
        where.date.gte = new Date(startDate);
      }
      if (endDate) {
        where.date.lte = new Date(endDate);
      }
    }

    const orderBy = { [sortBy]: sortOrder };

    const expenses = await prisma.expense.findMany({
      where,
      orderBy,
      select: {
        id: true,
        title: true,
        description: true,
        amount: true,
        category: true,
        date: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      message: 'Expenses retrieved successfully',
      expenses,
      total: expenses.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await prisma.expense.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!expense) {
      return res.status(404).json({
        error: 'Expense not found',
      });
    }

    res
      .status(200)
      .json({ message: 'Expense retrieved successfully', expense });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getExpense,
};
