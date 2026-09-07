import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeFormPage from './pages/EmployeeFormPage';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<EmployeeListPage />} />
          <Route path="/add" element={<EmployeeFormPage />} />
          <Route path="/edit/:id" element={<EmployeeFormPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
