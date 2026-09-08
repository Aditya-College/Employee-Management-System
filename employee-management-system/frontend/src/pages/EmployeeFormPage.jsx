import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, updateEmployee, getEmployeeById } from '../services/employeeService';

const initialState = {
  name: '',
  employeeId: '',
  email: '',
  department: '',
  phone: '',
};

function EmployeeFormPage() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchEmployee = async () => {
      try {
        const employee = await getEmployeeById(id);
        setFormData({
          name: employee.name,
          employeeId: employee.employeeId,
          email: employee.email,
          department: employee.department,
          phone: employee.phone,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (isEditMode) {
        await updateEmployee(id, formData);
      } else {
        await createEmployee(formData);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading-state">Loading employee…</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
        <span className="eyebrow">{isEditMode ? 'Employee profile' : 'Build your team'}</span>
        <h1>{isEditMode ? 'Edit employee' : 'Add employee'}</h1>
        <p className="page-subtitle">
          {isEditMode ? 'Update the details below and save your changes.' : 'Fill in the details to add someone to the directory.'}
        </p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="form-intro">
          <span className="form-step">01</span>
          <div>
            <h2>Employee details</h2>
            <p>All fields are required and visible in the directory.</p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="employeeId">Employee ID</label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="EMP-1023"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jane.doe@company.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Engineering"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 555 123 4567"
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-cancel" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-submit" disabled={submitting}>
            {submitting ? 'Saving…' : isEditMode ? 'Save changes' : 'Add employee'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeFormPage;
