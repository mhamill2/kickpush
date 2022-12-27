import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import InstructorProfile from './Instructor/InstructorProfile';
import ConnectionRequestFooter from '../Dashboard/ConnectionRequest/ConnectionRequestFooter';
import StudentProfile from './Student/StudentProfile';
import ProfilePicture from '../../components/elements/ProfilePicture';
import { getUser } from '../../state/user/userActions';

const PublicProfile = ({ match }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'HIDE_BOTTOM_NAV' });

    const userId = match.params.userId;
    fetchUser(userId);
    // eslint-disable-next-line
  }, []);

  const fetchUser = async (userId) => {
    const user = await getUser(userId);
    setUser(user);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className="pt-3">
        <section id="heading" className="flex justify-around items-center border-b-4 pb-5">
          <span className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100">
            <div className="rounded-full overflow-hidden bg-gray-100 h-24 w-24">
              <ProfilePicture avatarUrl={user.avatarUrl} />
            </div>
          </span>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <div className="text-sm">{user.location.city ? `${user.location.city}, ${user.location.state}` : 'United States'}</div>
          </div>
        </section>

        {user.accountType === 'instructor' ? <InstructorProfile profile={user.instructorProfile} /> : <StudentProfile profile={user.studentProfile} />}
      </main>
      <ConnectionRequestFooter instructor={user} />
    </>
  );
};

export default PublicProfile;
