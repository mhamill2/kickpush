import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { logout } from '../../state/auth/authActions';

import './Navbar.scss';

const Navbar = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const onLogout = () => {
    logout();
  };

  const authNav = (
    <Fragment>
      <div id="menu-btn-main" className="menu-btn" onClick={toggleMenu}>
        <div className="btn-line"></div>
        <div className="btn-line"></div>
        <div className="btn-line btn-line-bottom"></div>
      </div>
    </Fragment>
  );

  const authMenu = (
    <Fragment>
      <div className={`menu ${menuOpen ? ' showMenu' : ''}`}>
        <ul className="menu-nav">
          <li className="menu-item current" onClick={onLogout}>
            Logout
          </li>
        </ul>
      </div>
    </Fragment>
  );

  const guestNav = (
    <Fragment>
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
    </Fragment>
  );

  return (
    <header>
      <nav className="navbar">
        <div className="menu-logo-container">
          <h1 className="logo">
            <Link to="/" className="logo-link">
              LetsGoSkate
            </Link>
          </h1>
        </div>
        {authenticated ? authNav : guestNav}
      </nav>
      {authenticated ? authMenu : ''}
    </header>
  );
};

export default Navbar;
