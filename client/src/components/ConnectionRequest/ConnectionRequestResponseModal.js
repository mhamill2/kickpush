import { Transition } from '@headlessui/react';

import ProfilePicture from '../ProfilePicture/ProfilePicture';

const ConnectionRequestResponseModal = ({ showModal, closeModal, connectionRequest, accepted, sendResponse }) => {
  const title = accepted ? `Connect with ${connectionRequest.student.firstName}` : 'Decline Request';

  return (
    <Transition show={showModal} enter="transition ease-in-out duration-300 transform" enterFrom="translate-y-full" enterTo="translate-x-0" leave="transition-ease-in-out duration-300 transform" leaveFrom="translate-y-0" leaveTo="translate-y-full" className="max-h-1/2 w-full bg-white z-100 fixed bottom-0 flex flex-col border rounded-md items-center p-6">
      <header className="border-gray-300 flex flex-col justify-between items-center gap-3">
        <ProfilePicture size={12} />
        <h1 className="font-semibold">{title}</h1>
      </header>

      <form action="#" className="w-full flex flex-col items-center gap-12 mt-4" onSubmit={sendResponse}>
        <textarea name="responseMessage" id="responseMessage" cols="40" rows="5" className="border rounded-md p-4 text-sm" placeholder="Add a message..." maxLength="140"></textarea>
        <button className="border border-black cursor-pointer rounded-3xl w-2/5" type="submit">
          Send
        </button>
      </form>
    </Transition>
  );
};

export default ConnectionRequestResponseModal;
