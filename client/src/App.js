import { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './state/store';

import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import Dashboard from './pages/Dashboard/Dashboard';
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import UserProfile from './pages/UserProfile/UserProfile';

import { loadUser } from './state/auth/authActions';
import BottomNav from './components/BottomNav/BottomNav';

if (localStorage.token) {
  loadUser(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/instructors/:userId" component={UserProfile} />
          </Switch>
          <BottomNav />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
