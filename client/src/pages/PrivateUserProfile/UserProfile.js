import { useEffect, useRef, useState } from 'react';
import { useDispatch, connect } from 'react-redux';

import InstructorProfile from './Instructor/InstructorProfile';
import StudentProfile from './Student/StudentProfile';
import EditProfileModal from '../../components/EditModal/EditProfileModal';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { uploadAvatar } from '../../state/user/userActions';

const UserProfile = ({ user }) => {
  const dispatch = useDispatch();
  const { accountType, location } = user;
  const input = useRef(null);

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

  const openFileSelectionDialog = () => {
    input.current?.click();
  };

  const onAvatarChange = async (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith('image/')) {
      // TODO change this to alert the user
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      // TODO change this to alert the user
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    uploadAvatar(formData);
  };

  console.log(user.avatarUrl);

  return (
    <>
      <main className="pt-3">
        <section id="heading" className="flex justify-around items-center border-b-4 pb-5">
          <div className="relative">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="cursor-pointer ml-3 absolute top-1 right-1 z-50 bg-white p-1 rounded-full border"
              onClick={openFileSelectionDialog}
            ></FontAwesomeIcon>
            <input type="file" className="hidden" ref={input} onChange={onAvatarChange} />
            <div className="rounded-full overflow-hidden bg-gray-100 h-24 w-24">
              <ProfilePicture avatarUrl={user.avatarUrl} />
            </div>
          </div>
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

        {accountType === 'instructor' ? (
          <InstructorProfile closeEditModal openEditModal={openEditModal} />
        ) : (
          <StudentProfile closeEditModal={closeEditModal} openEditModal={openEditModal} />
        )}
      </main>
      <EditProfileModal title={title} showModal={showEditModal} closeModal={closeEditModal} />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(UserProfile);
