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

module.exports = {
  createExpense,
};
