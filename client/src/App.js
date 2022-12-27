import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import BottomNav from './components/BottomNav/BottomNav';
import Dashboard from './pages/Dashboard/Dashboard';
import InstructorSearchResults from './pages/InstructorSearchResults/InstructorSearchResults';
import Landing from './pages/Landing/Landing';
import LessonCalendar from './pages/Lessons/LessonCalendar';
import Login from './pages/Auth/Login/Login';
import Messenger from './pages/Messenger/Messenger';
import MessengerConversation from './pages/Messenger/MessengerConversation';
import Navbar from './components/Navbar/Navbar';
import Payments from './pages/Payments/Payments';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicProfile from './pages/PublicUserProfile/PublicProfile';
import Register from './pages/Auth/Register/Register';
import ScrollToTop from './utils/scrollToTop';
import Spinner from './components/Spinner/Spinner';
import UserProfile from './pages/PrivateUserProfile/UserProfile';

import { loadUser } from './state/user/userActions';
import { createNewSocket } from './utils/socket';

const App = ({ user, isAuthenticated, messages }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.token;

    if (token) {
      loadUser(token).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      createNewSocket(user._id, messages, dispatch);
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

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
          <PrivateRoute exact path="/lessons" component={LessonCalendar} />
          <PrivateRoute exact path="/payments" component={Payments} />
        </Switch>
        <BottomNav />
      </Fragment>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.authenticated,
  user: state.user.user,
  messages: state.message.messages
});

export default connect(mapStateToProps)(App);
