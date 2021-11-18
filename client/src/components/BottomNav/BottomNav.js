import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faCommentAlt, faUserCircle, faCreditCard } from '@fortawesome/free-solid-svg-icons';

import './BottomNav.scss';

const BottomNav = () => {
  const activePage = useSelector((state) => state.nav.activePage);
  console.log(activePage);

  return (
    <div className="bottom-nav">
      <div className={`icon-container ${activePage === 'profile' ? 'icon-container-active' : ''}`}>
        <FontAwesomeIcon icon={faUserCircle} size="2x" className={activePage === 'profile' ? 'icon-active' : ''}></FontAwesomeIcon>
      </div>
      <div className={`icon-container ${activePage === 'payments' ? 'icon-container-active' : ''}`}>
        <FontAwesomeIcon icon={faCreditCard} size="2x" className={activePage === 'payments' ? 'icon-active' : ''}></FontAwesomeIcon>
      </div>
      <div className={`icon-container ${activePage === 'home' ? 'icon-container-active' : ''}`}>
        <FontAwesomeIcon icon={faHome} size="2x" className={activePage === 'home' ? 'icon-active' : ''}></FontAwesomeIcon>
      </div>
      <div className={`icon-container ${activePage === 'people' ? 'icon-container-active' : ''}`}>
        <FontAwesomeIcon icon={faUsers} size="2x" className={activePage === 'people' ? 'icon-active' : ''}></FontAwesomeIcon>
      </div>
      <div className={`icon-container ${activePage === 'messages' ? 'icon-container-active' : ''}`}>
        <FontAwesomeIcon icon={faCommentAlt} size="2x" className={activePage === 'messages' ? 'icon-active' : ''}></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default BottomNav;
