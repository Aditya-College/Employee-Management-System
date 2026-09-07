# Employee Management System (MERN)

A simple, beginner-friendly Employee Management System built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Add a new employee
- View all employees in a directory
- Edit an existing employee
- Delete an employee

## Project structure

```
project-root/
│
├── frontend/               React + Vite app
│   ├── src/
│   │   ├── components/     Navbar, EmployeeTable
│   │   ├── pages/          EmployeeListPage, EmployeeFormPage
│   │   ├── services/       employeeService.js (API calls)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
├── backend/                Node.js + Express + Mongoose API
│   ├── config/db.js        MongoDB connection
│   ├── controllers/        employeeController.js (CRUD logic)
│   ├── models/Employee.js  Mongoose schema
│   ├── routes/             employeeRoutes.js
│   ├── server.js
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

## Prerequisites

- Node.js (v18 or newer recommended)
- A MongoDB database — either a local MongoDB server or a free MongoDB Atlas cluster

## Setup

### 1. Backend

```bash
cd backend
npm install
```

`backend/.env` is already set up for a local MongoDB instance (the kind MongoDB Compass connects to by default):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/employee_management
```

Make sure `mongod` (the MongoDB server) is running locally, then open MongoDB Compass and connect to `mongodb://localhost:27017` to browse the `employee_management` database and its `employees` collection once you start adding data. If you're using MongoDB Atlas instead, replace `MONGO_URI` with the connection string Atlas gives you (Compass can also connect to Atlas using that same string).

Start the backend:

```bash
npm run dev     # with nodemon (auto-restart)
# or
npm start       # plain node
```

The API will run at `http://localhost:5000`.

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
```

`frontend/.env` already points to the backend:

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The app will run at `http://localhost:5173`.

## API endpoints

| Method | Endpoint              | Description         |
|--------|------------------------|----------------------|
| GET    | /api/employees          | Get all employees    |
| GET    | /api/employees/:id      | Get one employee     |
| POST   | /api/employees          | Create an employee   |
| PUT    | /api/employees/:id      | Update an employee   |
| DELETE | /api/employees/:id      | Delete an employee   |

## How data flows

1. The React form (`EmployeeFormPage.jsx`) collects employee details and calls a function in `employeeService.js`.
2. `employeeService.js` sends an HTTP request (using the built-in `fetch`) to the Express API at the URL defined in `VITE_API_URL`.
3. Express (`employeeRoutes.js`) routes the request to the matching function in `employeeController.js`.
4. The controller uses the `Employee` Mongoose model to read or write data in MongoDB.
5. The controller sends a JSON response back to React.
6. React updates its state and re-renders the employee list, so the UI always reflects the current database contents.
