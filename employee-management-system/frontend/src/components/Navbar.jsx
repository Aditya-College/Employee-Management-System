import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-mark" aria-hidden="true">EM</span>
        <span>
          <span className="brand-name">Employee Manager</span>
          <span className="brand-caption">People directory</span>
        </span>
      </Link>
      <nav className="navbar-links">
        <Link to="/" className="navbar-directory">Directory</Link>
        <Link to="/add" className="navbar-add-btn">
          <span aria-hidden="true">+</span> Add employee
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
