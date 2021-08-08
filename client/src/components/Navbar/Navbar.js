import { Link } from 'react-router-dom';

import './Navbar.scss';

const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="menu-logo-container">
          <div id="menu-btn-main" className="menu-btn">
            <div className="btn-line"></div>
            <div className="btn-line btn-line-middle"></div>
            <div className="btn-line btn-line-bottom"></div>
          </div>
          <h1 className="logo">
            <Link to="/" className="logo-link">
              LetsGoSkate
            </Link>
          </h1>
        </div>
        <ul className="nav-links">
          <li className="nav-link-item">
            <Link to="/login" className="login-link">
              LOGIN
            </Link>
          </li>
          <li className="nav-link-item">
            <Link to="/register">
              <button className="btn btn-primary signup-btn">Sign Up</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
