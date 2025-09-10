const express = require('express');
const prisma = require('./utils/db');
const authRoutes = require('./routes/authRoute');
const expenseRoutes = require('./routes/expenseRoute');

const app = express();

// middleware
app.use(express.json());

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/expenses', expenseRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
