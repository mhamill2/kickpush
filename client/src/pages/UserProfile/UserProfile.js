import { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';

import InstructorProfile from './Instructor/InstructorProfile';
import StudentProfile from './Student/StudentProfile';
import EditProfileModal from './EditModal/EditProfileModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const UserProfile = ({ user }) => {
  const dispatch = useDispatch();
  const { accountType, location } = user;

  const [showEditModal, setShowEditModal] = useState(false);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    dispatch({ type: 'NAV_PROFILE' });
    // eslint-disable-next-line
  }, []);

  const openEditModal = (title) => {
    setTitle(title);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <>
      <main className="pt-3">
        <section id="heading" className="flex justify-around items-center border-b-4 pb-5">
          <span className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100">
            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <div className="text-sm">
              {location.city ? `${location.city}, ${location.state}` : 'Add your location'}
              <FontAwesomeIcon icon={faPenToSquare} className="cursor-pointer ml-3" onClick={() => openEditModal('Location')}></FontAwesomeIcon>
            </div>
          </div>
        </section>

        {accountType === 'instructor' ? <InstructorProfile closeEditModal openEditModal={openEditModal} /> : <StudentProfile closeEditModal={closeEditModal} openEditModal={openEditModal} />}
      </main>
      <EditProfileModal title={title} showModal={showEditModal} closeModal={closeEditModal} />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(UserProfile);
