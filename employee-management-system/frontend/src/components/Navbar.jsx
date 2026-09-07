import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        Employee Manager
      </Link>
      <nav className="navbar-links">
        <Link to="/">Directory</Link>
        <Link to="/add" className="navbar-add-btn">
          Add employee
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
