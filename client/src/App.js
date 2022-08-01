import { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './state/store';

import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import Dashboard from './pages/Dashboard/Dashboard';
import InstructorSearchResults from './pages/InstructorSearchResults/InstructorSearchResults';
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login/Login';
import Messaging from './pages/Messaging/Messaging';
import PublicProfile from './pages/PublicUserProfile/PublicProfile';
import Register from './pages/Auth/Register/Register';
import ScrollToTop from './utils/scrollToTop';
import UserProfile from './pages/PrivateUserProfile/UserProfile';

import { loadUser } from './state/user/userActions';
import BottomNav from './components/BottomNav/BottomNav';

if (localStorage.token) {
  loadUser(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/search" component={InstructorSearchResults} />
            <PrivateRoute exact path="/profile" component={UserProfile} />
            <PrivateRoute exact path="/instructors/:userId" component={PublicProfile} />
            <PrivateRoute exact path="/messages" component={Messaging} />
            <PrivateRoute exact path="/messages" component={Messaging} />
          </Switch>
          <BottomNav />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
