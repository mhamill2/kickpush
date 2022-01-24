import { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';

import InstructorDashboard from './Instructor/Dashboard';
import StudentDashboard from './Student/Dashboard';

const Dashboard = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'NAV_HOME' });
    // eslint-disable-next-line
  }, []);

  return <main className="bg-gray-50 h-screen">{user.accountType === 'instructor' ? <InstructorDashboard /> : <StudentDashboard />}</main>;
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);
