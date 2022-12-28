import { Transition } from '@headlessui/react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import EditBio from './EditBio';
import EditRates from './EditRates';
import EditLessonInfo from './EditLessonInfo';
import EditSocialMediaLinks from './EditSocialMediaLinks';
import EditLocation from './EditLocation';
import EditFamilyMembers from './EditFamilyMembers';
import { updateInstructorProfile, updateUserLocation, updateStudentProfile } from '../../../state/user/userActions';

const EditProfileModal = ({ showModal, closeModal, title, user }) => {
  let originalProfile = {};

  if (user.accountType === 'instructor') {
    originalProfile = { ...user.instructorProfile };
  } else {
    originalProfile = JSON.parse(JSON.stringify(user.studentProfile));
  }

  const onLocationChange = (e) => (user.location[e.target.name] = e.target.value);
  const onBioChange = (e) => (user.instructorProfile.bio = e.target.value);
  const onRatesChange = (e) => (user.instructorProfile.rates[e.target.name] = e.target.value);
  const onSocialMediaLinkChange = (e) => (user.instructorProfile.socialMediaLinks[e.target.name] = e.target.value);
  const onLessonInfoChange = (e) => {
    const targetParentObject = e.target.parentElement.getAttribute('data-parent');
    user.instructorProfile[targetParentObject][e.target.name] = e.target.checked;
  };
  const onFamilyMemberChange = (e) => {
    const index = e.target.parentElement.getAttribute('data-index');
    user.studentProfile.familyMembers[index][e.target.name] = e.target.value;
  };

  const saveUserProfileUpdates = (e) => {
    e.preventDefault();
    if (user.accountType === 'instructor') {
      updateInstructorProfile(user);
    } else {
      updateStudentProfile(user);
    }
    closeModal();
  };

  const saveUserLocationUpdates = (e) => {
    e.preventDefault();
    updateUserLocation(user, user.location);
    closeModal();
  };

  const revertChangesAndCloseModal = (e) => {
    if (user.accountType === 'instructor') {
      user.instructorProfile = originalProfile;
    } else {
      user.studentProfile = JSON.parse(JSON.stringify(originalProfile));
    }

    closeModal();
  };

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
      <header className="border-b p-4 border-gray-300 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Edit {title || 'Profile'}</h1>
        <FontAwesomeIcon icon={faTimes} className="cursor-pointer h-6 w-6 text-gray-600" onClick={revertChangesAndCloseModal}></FontAwesomeIcon>
      </header>

      <main className="mb-24 p-4 flex flex-1 flex-col overflow-auto">
        {title === 'Background' && <EditBio onChange={onBioChange} />}
        {title === 'Family Members' && <EditFamilyMembers onChange={onFamilyMemberChange} />}
        {title === 'Lesson Info' && <EditLessonInfo onChange={onLessonInfoChange} />}
        {title === 'Location' && <EditLocation onChange={onLocationChange} />}
        {title === 'Rates' && <EditRates onChange={onRatesChange} />}
        {title === 'Social Media' && <EditSocialMediaLinks onChange={onSocialMediaLinkChange} />}
      </main>

      <footer className="border-t border-gray-300 flex justify-around py-8 fixed bottom-0 w-full bg-white">
        <button className="border border-black cursor-pointer rounded-3xl w-2/5" onClick={revertChangesAndCloseModal}>
          Cancel
        </button>
        <button
          className="border border-black cursor-pointer rounded-3xl w-2/5"
          onClick={title === 'Location' ? saveUserLocationUpdates : saveUserProfileUpdates}
        >
          Submit
        </button>
      </footer>
    </Transition>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(EditProfileModal);
