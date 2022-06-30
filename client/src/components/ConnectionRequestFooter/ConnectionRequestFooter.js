import { useState } from 'react';

import Button from '../../components/Button/Button';
import ConnectionRequestForm from '../ConnectionRequest/ConnectionRequestForm';

const ConnectionRequestFooter = ({ instructor }) => {
  const [showModal, setShowModal] = useState(false);

  const openConnectionRequestForm = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <footer className="w-full flex justify-center items-center p-5 fixed bottom-0 bg-white">
        <Button isPrimary={true} content="Request a Lesson" size="large" onClick={openConnectionRequestForm} />
      </footer>
      <ConnectionRequestForm showModal={showModal} closeModal={closeModal} instructor={instructor} />
    </>
  );
};

export default ConnectionRequestFooter;
