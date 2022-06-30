import { useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import ProfilePicture from '../ProfilePicture/ProfilePicture';

const ConnectionRequest = ({ showModal, closeModal, connectionRequest }) => {
  showModal ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Transition show={showModal} enter="transition ease-in-out duration-300 transform" enterFrom="translate-y-full" enterTo="translate-x-0" leave="transition-ease-in-out duration-300 transform" leaveFrom="translate-y-0" leaveTo="translate-y-full" className="h-screen w-full bg-white z-50 fixed top-0 flex flex-col p-4">
      <header className="border-gray-300 flex flex-col justify-between items-center gap-8">
        <FontAwesomeIcon icon={faTimes} className="cursor-pointer h-6 w-6 text-gray-600 self-end" onClick={closeModal}></FontAwesomeIcon>
        <ProfilePicture size={28} />
        <h1 className="text-xl font-semibold">{connectionRequest.studentFirstName} would like to connect!</h1>
      </header>

      <div className="bg-gray-50 p-4 rounded-lg mt-8 w-4/5">
        <p>{connectionRequest.introduction}</p>
      </div>

      <main className="overflow-auto"></main>
    </Transition>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default ConnectionRequest;
