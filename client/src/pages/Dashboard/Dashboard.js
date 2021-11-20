import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'NAV_HOME' });
  }, []);

  return <div>Hello {user.firstName}!</div>;
};

export default Dashboard;
