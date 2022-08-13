import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

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

import { loadUser, deleteSocket } from './state/user/userActions';

import io from 'socket.io-client';

if (localStorage.token) {
  loadUser(localStorage.token);
}

const App = ({ user, isAuthenticated, socket, messages }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && !socket) {
      const socket = io('http://localhost:5000', {
        transports: ['websocket', 'polling', 'flashsocket'],
        reconnection: true,
        reconnectionDelay: 1000
      });

      socket.on('connect', () => {
        socket.emit('setSocketId', user._id);
      });

      socket.on('newMessage', (message) => {
        if (messages.filter((msg) => msg._id === message._id).length === 0) {
          dispatch({ type: 'ADD_NEW_MESSAGE', payload: message });
        }
      });

      socket.on('disconnect', () => {
        deleteSocket(socket);
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
  user: state.user.user,
  socket: state.user.socket,
  messages: state.message.messages
});

export default connect(mapStateToProps)(App);
