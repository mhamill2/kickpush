import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import BottomNav from './components/BottomNav/BottomNav';
import Dashboard from './pages/Dashboard/Dashboard';
import InstructorSearchResults from './pages/InstructorSearchResults/InstructorSearchResults';
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login/Login';
import Messenger from './pages/Messenger/Messenger';
import MessengerConversation from './pages/Messenger/MessengerConversation';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicProfile from './pages/PublicUserProfile/PublicProfile';
import Register from './pages/Auth/Register/Register';
import ScrollToTop from './utils/scrollToTop';
import UserProfile from './pages/PrivateUserProfile/UserProfile';

import { loadUser } from './state/user/userActions';

import io from 'socket.io-client';

if (localStorage.token) {
  loadUser(localStorage.token);
}

const App = ({ user, isAuthenticated }) => {
  // use effect hook whenever the user state changes to connect to socket.io
  useEffect(() => {
    console.log('here');
    if (isAuthenticated) {
      const socket = io('ws://localhost:5000', {
        transports: ['websocket', 'polling', 'flashsocket']
      });
      socket.on('connect', () => {
        console.log('connected to socket.io');
      });
    }
  }, [isAuthenticated]);

  return (
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
          <PrivateRoute exact path="/messages" component={Messenger} />
          <PrivateRoute exact path="/messages/:userId" component={MessengerConversation} />
        </Switch>
        <BottomNav />
      </Fragment>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.authenticated,
  user: state.user.user
});

export default connect(mapStateToProps)(App);
