import { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';

import InstructorDashboard from './InstructorDashboard';
import StudentDashboard from './StudentDashboard';

const Dashboard = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'NAV_HOME' });
    // eslint-disable-next-line
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen w-full">
      <div className="flex flex-col justify-center items-center w-11/12 m-auto">
        {user.accountType === 'instructor' ? <InstructorDashboard /> : <StudentDashboard />}
      </div>
    </main>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Dashboard);
