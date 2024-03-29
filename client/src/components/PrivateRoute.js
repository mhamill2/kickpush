import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authenticated = useSelector((state) => state.user.authenticated);

  return <Route {...rest} render={(props) => (!authenticated ? <Redirect to="/" /> : <Component {...props} />)} />;
};

export default PrivateRoute;
