const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

export const getEmployees = async () => {
  const response = await fetch(`${API_URL}/employees`);
  return handleResponse(response);
};

export const getEmployeeById = async (id) => {
  const response = await fetch(`${API_URL}/employees/${id}`);
  return handleResponse(response);
};

export const createEmployee = async (employeeData) => {
  const response = await fetch(`${API_URL}/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData),
  });
  return handleResponse(response);
};

export const updateEmployee = async (id, employeeData) => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData),
  });
  return handleResponse(response);
};

export const deleteEmployee = async (id) => {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};
