# Expense Tracker API

A RESTful API for managing personal expenses with user authentication built with Node.js, Express, and Prisma ORM. This API provides secure user registration, authentication, and expense management functionality.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Password Security**: Bcrypt password hashing with salt rounds
- **Expense Management**: Full CRUD operations for expenses
- **Category System**: Support for GROCERIES, LEISURE, ELECTRONICS, UTILITIES, CLOTHING, HEALTH, and OTHERS
- **Advanced Filtering**: Filter expenses by category and date range
- **Flexible Sorting**: Sort by date, amount, title, or creation time
- **Input Validation**: Comprehensive validation using Joi
- **Database Integration**: Prisma ORM with PostgreSQL database support

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Password Hashing**: bcryptjs
- **Database**: PostgreSQL (via Prisma)

## 📦 Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/nikusha1446/expense-tracker-api.git
   cd expense-tracker-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:  
   Create a `.env` file in the project root:
   ```env
   DATABASE_URL="your_database_connection_string"
   JWT_SECRET="your_jwt_secret_key"
   PORT=5000
   ```

4. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

Server will run at:  
`http://localhost:5000`

---

## 📋 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register a new user | No |
| POST | `/api/v1/auth/login` | Login user and get JWT token | No |

### Expenses
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/expenses` | Get all user expenses | Yes |
| GET | `/api/v1/expenses?category=groceries` | Get expenses filtered by category | Yes |
| GET | `/api/v1/expenses?startDate=2024-01-01&endDate=2024-01-31` | Get expenses filtered by date range | Yes |
| GET | `/api/v1/expenses?sortBy=amount&sortOrder=asc` | Get expenses with custom sorting | Yes |
| GET | `/api/v1/expenses/:id` | Get specific expense by ID | Yes |
| POST | `/api/v1/expenses` | Create a new expense | Yes |
| PUT | `/api/v1/expenses/:id` | Update expense (partial updates supported) | Yes |
| DELETE | `/api/v1/expenses/:id` | Delete an expense | Yes |

---

## 📊 Data Models

### User
```json
{
  "id": "string",
  "email": "string",
  "password": "string (hashed)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Expense
```json
{
  "id": "string",
  "title": "string",
  "description": "string (optional)",
  "amount": "decimal",
  "category": "enum",
  "date": "datetime",
  "userId": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Categories
- `GROCERIES`
- `LEISURE` 
- `ELECTRONICS`
- `UTILITIES`
- `CLOTHING`
- `HEALTH`
- `OTHERS`

---

## 🔧 Query Parameters

### GET /api/v1/expenses
- `category` - Filter by category (case-insensitive)
- `startDate` - Filter expenses from this date (ISO format: YYYY-MM-DD)
- `endDate` - Filter expenses until this date (ISO format: YYYY-MM-DD)
- `sortBy` - Sort field: `date`, `amount`, `title`, `createdAt` (default: `date`)
- `sortOrder` - Sort direction: `asc`, `desc` (default: `desc`)

**Example:**
```
GET /api/v1/expenses?category=groceries&startDate=2024-01-01&sortBy=amount&sortOrder=desc
```

---

## 📝 Request/Response Examples

### Register User
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "cm123...",
    "email": "user@example.com"
    "createdAt": "2025-09-10T17:35:40.979Z"
  }
}
```

### Create Expense
```bash
POST /api/v1/expenses
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Grocery Shopping",
  "description": "Weekly groceries from supermarket",
  "amount": 85.50,
  "category": "GROCERIES",
  "date": "2025-09-10"
}
```

**Response:**
```json
{
  "message": "Expense created successfully",
  "expense": {
    "id": "cm456...",
    "title": "Grocery Shopping",
    "description": "Weekly groceries from supermarket",
    "amount": "85.50",
    "category": "GROCERIES",
    "date": "2025-09-10T17:35:40.979Z",
    "createdAt": "2025-09-10T17:35:40.979Z"
        "user": {
            "id": "cm456...",
            "email": "user@example.com"
        }
    }
}
```

## 🔒 Authentication

All expense endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Get your token by registering and logging in through the auth endpoints.

---

## ✅ Validation Rules

### User Registration/Login
- **Email**: Valid email format, required
- **Password**: Minimum 6 characters, required

### Expense Creation  
- **Title**: 1-255 characters
- **Description**: Max 1000 characters, optional
- **Amount**: Positive number with max 2 decimal places, max 99,999,999.99
- **Category**: Must be one of the valid categories
- **Date**: Valid ISO date format, cannot be in the future
