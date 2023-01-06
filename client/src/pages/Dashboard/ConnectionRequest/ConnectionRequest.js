import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { sendConnectionRequestResponse } from '../../../state/lessons/lessonActions';

import ProfilePicture from '../../../components/elements/ProfilePicture';
import ConnectionRequestResponseModal from './ConnectionRequestResponseModal';

const ConnectionRequest = ({ showModal, closeModal, connectionRequest }) => {
  showModal ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
    // eslint-disable-next-line
  }, []);

  const [showResponseModal, setshowResponseModal] = useState(false);
  const [acceptRequest, setAcceptRequest] = useState(false);

  const openResponseModal = (e) => {
    const accepted = e.target.getAttribute('data-accept');
    setAcceptRequest(accepted);
    setshowResponseModal(true);
  };

  const closeResponseModal = () => {
    setshowResponseModal(false);
    setAcceptRequest(false);
  };

  const sendResponse = async (e) => {
    e.preventDefault();
    const responseMessage = e.target.elements['responseMessage'].value;

    sendConnectionRequestResponse(connectionRequest, responseMessage, acceptRequest);
  };

  if (!connectionRequest) return null;

  return (
    <Transition
      show={showModal}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="translate-y-full"
      enterTo="translate-x-0"
      leave="transition-ease-in-out duration-300 transform"
      leaveFrom="translate-y-0"
      leaveTo="translate-y-full"
      className="h-screen w-full bg-white z-50 fixed top-0 flex flex-col"
    >
      <header className="border-gray-300 flex flex-col justify-between items-center gap-8 p-4">
        <FontAwesomeIcon icon={faTimes} className="cursor-pointer h-6 w-6 text-gray-600 self-end" onClick={closeModal}></FontAwesomeIcon>
        <div className="rounded-full overflow-hidden bg-gray-100 h-24 w-24">
          <ProfilePicture avatarUrl={connectionRequest.student.avatarUrl} />
        </div>
        <h1 className="text-xl font-semibold">{connectionRequest.student && connectionRequest.student.firstName} would like to connect!</h1>
      </header>

      <main className="p-4 overflow-auto">
        <div className="bg-gray-50 p-4 rounded-lg mt-8">
          <p>{connectionRequest.headerMessage}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mt-8 w-4/5">
          <p>{connectionRequest.introduction}</p>
        </div>
      </main>

      <footer className="border-t border-gray-300 flex justify-around py-8 fixed bottom-0 w-full bg-white">
        <button data-accept="false" className="border border-black cursor-pointer rounded-3xl w-2/5" onClick={openResponseModal}>
          Refuse
        </button>
        <button data-accept="true" className="border border-black cursor-pointer rounded-3xl w-2/5" onClick={openResponseModal}>
          Accept
        </button>
      </footer>

      <ConnectionRequestResponseModal
        showModal={showResponseModal}
        closeModal={closeResponseModal}
        connectionRequest={connectionRequest}
        accepted={acceptRequest}
        sendResponse={sendResponse}
      />
    </Transition>
  );
};

export default ConnectionRequest;
