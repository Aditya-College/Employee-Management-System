import { useEffect, useState } from 'react';
import EmployeeTable from '../components/EmployeeTable';
import { getEmployees, deleteEmployee } from '../services/employeeService';

function EmployeeListPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this employee? This cannot be undone.');
    if (!confirmed) return;

    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Team workspace</span>
          <h1>Employee directory</h1>
          <p className="page-subtitle">Keep everyone&apos;s contact details organised in one place.</p>
        </div>
        <div className="employee-count">
          <strong>{employees.length}</strong>
          <span>{employees.length === 1 ? 'team member' : 'team members'}</span>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-state">Loading employees…</div>
      ) : (
        <EmployeeTable employees={employees} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default EmployeeListPage;
