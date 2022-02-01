import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faCommentAlt, faUserCircle, faCreditCard } from '@fortawesome/free-solid-svg-icons';

const BottomNav = () => {
  const activePage = useSelector((state) => state.nav.activePage);
  const user = useSelector((state) => state.auth.user);
  const itemContainerStyle = 'h-full flex justify-center items-center w-12';
  const itemContainerActiveStyle = 'shadow-activeIcon';

  if (!user) {
    return <></>;
  }

  return (
    <div className="z-30 bg-white fixed bottom-0 w-full border-t border-gray-100 flex justify-evenly items-center flex-grow h-12">
      <Link to={`/instructors/${user ? user._id : ''}`} className={`${itemContainerStyle} ${activePage === 'myProfile' ? itemContainerActiveStyle : ''}`}>
        <FontAwesomeIcon icon={faUserCircle} className={activePage === 'myProfile' ? 'text-primary' : ''}></FontAwesomeIcon>
      </Link>
      <Link to="/payments" className={`${itemContainerStyle} ${activePage === 'payments' ? itemContainerActiveStyle : ''}`}>
        <FontAwesomeIcon icon={faCreditCard} className={activePage === 'payments' ? 'text-primary' : ''}></FontAwesomeIcon>
      </Link>
      <Link to="/dashboard" className={`${itemContainerStyle} ${activePage === 'home' ? itemContainerActiveStyle : ''}`}>
        <FontAwesomeIcon icon={faHome} className={activePage === 'home' ? 'text-primary' : ''}></FontAwesomeIcon>
      </Link>
      <Link to="/students" className={`${itemContainerStyle} ${activePage === 'people' ? itemContainerActiveStyle : ''}`}>
        <FontAwesomeIcon icon={faUsers} className={activePage === 'people' ? 'text-primary' : ''}></FontAwesomeIcon>
      </Link>
      <Link to="/messages" className={`${itemContainerStyle} ${activePage === 'messages' ? itemContainerActiveStyle : ''}`}>
        <FontAwesomeIcon icon={faCommentAlt} className={activePage === 'messages' ? 'text-primary' : ''}></FontAwesomeIcon>
      </Link>
    </div>
  );
};

export default BottomNav;
