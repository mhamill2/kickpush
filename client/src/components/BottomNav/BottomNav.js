import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faCommentAlt, faUserCircle, faCreditCard } from '@fortawesome/free-solid-svg-icons';

const BottomNav = () => {
  const activePage = useSelector((state) => state.nav.activePage);
  const itemContainerStyle = 'h-full flex justify-center items-center w-12';
  const itemContainerActiveStyle = 'shadow-activeIcon';

  return (
    <div className="overflow-hidden fixed bottom-0 w-full border-t border-gray-100 flex justify-evenly items-center flex-grow h-12">
      <div className={`${itemContainerStyle} ${activePage === 'profile' ? itemContainerActiveStyle : ''}`}>
        <FontAwesomeIcon icon={faUserCircle} className={activePage === 'profile' ? 'text-primary' : ''}></FontAwesomeIcon>
      </div>
      <div className={`${itemContainerStyle} ${activePage === 'payments' ? itemContainerActiveStyle : ''}`}>
        <FontAwesomeIcon icon={faCreditCard} className={activePage === 'payments' ? 'text-primary' : ''}></FontAwesomeIcon>
      </div>
      <div className={`${itemContainerStyle} ${activePage === 'home' ? 'shdaow-lg' : ''}`}>
        <FontAwesomeIcon icon={faHome} className={activePage === 'home' ? 'text-primary' : ''}></FontAwesomeIcon>
      </div>
      <div className={`${itemContainerStyle} ${activePage === 'people' ? itemContainerActiveStyle : ''}`}>
        <FontAwesomeIcon icon={faUsers} className={activePage === 'people' ? 'text-primary' : ''}></FontAwesomeIcon>
      </div>
      <div className={`${itemContainerStyle} ${activePage === 'messages' ? itemContainerActiveStyle : ''}`}>
        <FontAwesomeIcon icon={faCommentAlt} className={activePage === 'messages' ? 'text-primary' : ''}></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default BottomNav;
