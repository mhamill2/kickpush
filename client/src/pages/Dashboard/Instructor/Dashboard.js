import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const statsItem = 'bg-white flex flex-col items-center justify-center p-5 mt-5 border-0 rounded-md flex-shrink-0 p-16';

const Dashboard = ({ user }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="bg-white flex flex-col items-center justify-center p-5 w-11/12 mt-5 border-0 rounded-md">
        <div className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100 mb-2">
          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold">Hello {user.firstName}!</h1>
        <div className="text-center">{user.hasNextLesson ? `Your next lesson is scheduled with ${user.nextStudent} at ${user.nextLessonTime} on ${user.nextLessonDate}` : 'You have no upcoming lessons scheduled.'}</div>
      </div>
      <div className="w-11/12 flex overflow-x-auto space-x-8">
        <div className={statsItem}></div>
        <div className={statsItem}></div>
        <div className={statsItem}></div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);
