import { Link } from 'react-router-dom';

function EmployeeTable({ employees, onDelete }) {
  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <p>No employees yet.</p>
        <span>Add your first employee to see them listed here.</span>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Department</th>
            <th>Phone</th>
            <th aria-label="Actions"></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td data-label="Name">{employee.name}</td>
              <td data-label="Employee ID">{employee.employeeId}</td>
              <td data-label="Email">{employee.email}</td>
              <td data-label="Department">{employee.department}</td>
              <td data-label="Phone">{employee.phone}</td>
              <td data-label="Actions" className="actions-cell">
                <Link to={`/edit/${employee._id}`} className="btn btn-edit">
                  Edit
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)} className="btn btn-delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
