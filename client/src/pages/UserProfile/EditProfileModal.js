import { Transition } from '@headlessui/react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import EditBio from './EditBio';
import EditRates from './EditRates';
import EditLessonInfo from './EditLessonInfo';
import EditSocialMediaLinks from './EditSocialMediaLinks';
import { updateInstructorProfile } from '../../state/user/userActions';

const EditProfileModal = ({ showModal, closeModal, title, user }) => {
  const originalProfile = { ...user.instructorProfile };

  const onBioChange = (e) => (user.instructorProfile.bio = e.target.value);
  const onRatesChange = (e) => (user.instructorProfile.rates[e.target.name] = e.target.value);
  const onSocialMediaLinkChange = (e) => (user.instructorProfile.socialMediaLinks[e.target.name] = e.target.value);
  const onLessonInfoChange = (e) => {
    const targetParentObject = e.target.parentElement.getAttribute('data-parent');
    user.instructorProfile[targetParentObject][e.target.name] = e.target.checked;
  };

  const saveUserEdits = (e) => {
    e.preventDefault();
    updateInstructorProfile(user);
    closeModal();
  };

  const revertChangesAndCloseModal = (e) => {
    user.instructorProfile = originalProfile;
    closeModal();
  };

  return (
    <Transition show={showModal} enter="transition ease-in-out duration-300 transform" enterFrom="translate-y-full" enterTo="translate-x-0" leave="transition-ease-in-out duration-300 transform" leaveFrom="translate-y-0" leaveTo="translate-y-full" className="min-h-screen w-full bg-white z-50 fixed top-0">
      <div className="border-b p-4 border-gray-300 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Edit {title || 'Profile'}</h1>
        <FontAwesomeIcon icon={faTimes} className="cursor-pointer h-6 w-6 text-gray-600" onClick={revertChangesAndCloseModal}></FontAwesomeIcon>
      </div>

      {title === 'Background' && <EditBio onChange={onBioChange} />}
      {title === 'Rates' && <EditRates onChange={onRatesChange} />}
      {title === 'Lesson Info' && <EditLessonInfo onChange={onLessonInfoChange} />}
      {title === 'Social Media' && <EditSocialMediaLinks onChange={onSocialMediaLinkChange} />}

      <div className="border-t border-gray-300 flex justify-around py-8 fixed bottom-0 w-full">
        <button className="w-2/5" onClick={revertChangesAndCloseModal}>
          Cancel
        </button>
        <button className="w-2/5" onClick={saveUserEdits}>
          Submit
        </button>
      </div>
    </Transition>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(EditProfileModal);
