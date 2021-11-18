import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faCommentAlt, faUserCircle, faCreditCard } from '@fortawesome/free-solid-svg-icons';

import './BottomNav.scss';

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <div className="icon-container">
        <FontAwesomeIcon icon={faUserCircle} size="2x"></FontAwesomeIcon>
      </div>
      <div className="icon-container">
        <FontAwesomeIcon icon={faCreditCard} size="2x"></FontAwesomeIcon>
      </div>
      <div className="icon-container icon-container-active">
        <FontAwesomeIcon icon={faHome} size="2x" className="icon-active"></FontAwesomeIcon>
      </div>
      <div className="icon-container">
        <FontAwesomeIcon icon={faUsers} size="2x"></FontAwesomeIcon>
      </div>
      <div className="icon-container">
        <FontAwesomeIcon icon={faCommentAlt} size="2x"></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default BottomNav;
