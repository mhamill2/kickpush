import { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

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

import store from './state/store';
import { loadUser } from './state/user/userActions';

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
            <PrivateRoute exact path="/messages" component={Messenger} />
            <PrivateRoute exact path="/messages/:userId" component={MessengerConversation} />
          </Switch>
          <BottomNav />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
