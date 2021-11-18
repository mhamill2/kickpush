import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return <div>Hello {user.firstName}!</div>;
};

export default Dashboard;
