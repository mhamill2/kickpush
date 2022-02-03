import { Transition } from '@headlessui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import EditBio from './EditBio';
import EditRates from './EditRates';
import EditLessonInfo from './EditLessonInfo';
import EditSocialMediaLinks from './EditSocialMediaLinks';

const EditProfileModal = ({ showModal, closeModal, title }) => {
  return (
    <Transition show={showModal} enter="transition ease-in-out duration-300 transform" enterFrom="translate-y-full" enterTo="translate-x-0" leave="transition-ease-in-out duration-300 transform" leaveFrom="translate-y-0" leaveTo="translate-y-full" className="min-h-screen w-full bg-white z-50 fixed top-0">
      <div className="border-b p-4 border-gray-300 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Edit {title || 'Profile'}</h1>
        <FontAwesomeIcon icon={faTimes} className="cursor-pointer h-6 w-6 text-gray-600" onClick={closeModal}></FontAwesomeIcon>
      </div>

      {title === 'Background' && <EditBio />}
      {title === 'Rates' && <EditRates />}
      {title === 'Lesson Info' && <EditLessonInfo />}
      {title === 'Social Media' && <EditSocialMediaLinks />}

      <div className="border-t border-gray-300 flex justify-around py-8 fixed bottom-0 w-full">
        <button className="w-2/5" onClick={closeModal}>
          Cancel
        </button>
        <button className="w-2/5">Submit</button>
      </div>
    </Transition>
  );
};

export default EditProfileModal;
