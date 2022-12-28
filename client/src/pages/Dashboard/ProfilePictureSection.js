import { connect } from 'react-redux';
import ProfilePicture from '../../components/elements/ProfilePicture';

const ProfilePictureSection = ({ user }) => {
  return (
    <>
      <div className="rounded-full overflow-hidden bg-gray-100 h-24 w-24">
        <ProfilePicture avatarUrl={user.avatarUrl} />
      </div>
      <h1 className="mt-5 text-2xl font-bold">Hello {user.firstName}!</h1>
      <div className="text-center">
        {user.hasNextLesson
          ? `Your next lesson is scheduled with ${user.nextStudent} at ${user.nextLessonTime} on ${user.nextLessonDate}`
          : 'You have no upcoming lessons scheduled.'}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(ProfilePictureSection);
