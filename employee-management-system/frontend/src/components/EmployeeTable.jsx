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
              <td data-label="Name" className="employee-name-cell">
                <span className="employee-avatar" aria-hidden="true">
                  {employee.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}
                </span>
                <span>
                  <strong>{employee.name}</strong>
                  <small>{employee.email}</small>
                </span>
              </td>
              <td data-label="Employee ID"><code>{employee.employeeId}</code></td>
              <td data-label="Email" className="email-cell">{employee.email}</td>
              <td data-label="Department"><span className="department-tag">{employee.department}</span></td>
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
