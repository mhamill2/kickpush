import { useEffect, useState } from 'react';

import InstructorProfile from './Instructor/InstructorProfile';
import StudentProfile from './Student/StudentProfile';
import { getUser } from '../../state/user/userActions';

const PublicProfile = ({ match }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = match.params.userId;
    fetchUser(userId);
    // eslint-disable-next-line
  }, []);

  const fetchUser = async (userId) => {
    const user = await getUser(userId);
    console.log(user);
    setUser(user);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
          <div className="text-sm">{user.location.city ? `${user.location.city}, ${user.location.state}` : 'United States'}</div>
        </div>
      </section>

      {user.accountType === 'instructor' ? <InstructorProfile profile={user.instructorProfile} /> : <StudentProfile profile={user.studentProfile} />}
    </main>
  );
};

export default PublicProfile;
