import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { logout } from '../../state/user/userActions';

const Navbar = () => {
  const authenticated = useSelector((state) => state.user.authenticated);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const onLogout = () => {
    toggleMenu();
    logout();
  };

  const authNav = (
    <Fragment>
      <div id="menu-btn-main" className="cursor-pointer z-50" onClick={toggleMenu}>
        <div className="bg-gray-400 h-1 mb-1 w-7 rounded-lg"></div>
        <div className="bg-gray-400 h-1 mb-1 w-7 rounded-lg"></div>
        <div className="bg-gray-400 h-1 w-7 rounded-lg"></div>
      </div>
    </Fragment>
  );

  const authMenu = (
    <Fragment>
      <div className={`list-none overflow-y-scroll fixed h-screen w-0 z-50 bg-white ${menuOpen ? ' w-full' : ''}`}>
        <ul className="flex flex-col items-stretch w-full px-4 list-none">
          <li className="border-b border-secondary py-4" onClick={onLogout}>
            Logout
          </li>
        </ul>
      </div>
    </Fragment>
  );

  const guestNav = (
    <Fragment>
      <ul className="flex list-none items-center">
        <li className="p-2 mx-1">
          <Link to="/login" className="hover:text-primary">
            LOGIN
          </Link>
        </li>
        <li className="p-2 lg:mx-1">
          <Link to="/register">
            <button
              type="button"
              className="inline-flex items-center px-5 lg:px-8 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primaryDark"
            >
              Sign Up
            </button>
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav className="flex justify-between items-center py-1 px-4 z-40 w-full opacity-90 h-16">
        <div className="flex items-center">
          <h1 className="text-2xl">
            <Link to="/">KickPush</Link>
          </h1>
        </div>
        {authenticated ? authNav : guestNav}
      </nav>
      {authenticated ? authMenu : ''}
    </header>
  );
};

export default Navbar;
