const Employee = require('../models/Employee');

// @desc   Get all employees
// @route  GET /api/employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employees', error: error.message });
  }
};

// @desc   Get a single employee by id
// @route  GET /api/employees/:id
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employee', error: error.message });
  }
};

// @desc   Create a new employee
// @route  POST /api/employees
const createEmployee = async (req, res) => {
  try {
    const { name, employeeId, email, department, phone } = req.body;

    if (!name || !employeeId || !email || !department || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingEmployee = await Employee.findOne({ $or: [{ employeeId }, { email }] });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee ID or Email already exists' });
    }

    const employee = await Employee.create({ name, employeeId, email, department, phone });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create employee', error: error.message });
  }
};

// @desc   Update an employee
// @route  PUT /api/employees/:id
const updateEmployee = async (req, res) => {
  try {
    const { name, employeeId, email, department, phone } = req.body;

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (employeeId || email) {
      const duplicate = await Employee.findOne({
        _id: { $ne: req.params.id },
        $or: [{ employeeId }, { email }],
      });
      if (duplicate) {
        return res.status(400).json({ message: 'Employee ID or Email already in use' });
      }
    }

    employee.name = name ?? employee.name;
    employee.employeeId = employeeId ?? employee.employeeId;
    employee.email = email ?? employee.email;
    employee.department = department ?? employee.department;
    employee.phone = phone ?? employee.phone;

    const updatedEmployee = await employee.save();
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update employee', error: error.message });
  }
};

// @desc   Delete an employee
// @route  DELETE /api/employees/:id
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    await employee.deleteOne();
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete employee', error: error.message });
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
