import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useSelector } from 'react-redux';

import FormModal from '../../../components/FormModal/FormModal';
import HrText from '../../../components/HrText/HrText';
import './Login.scss';
import { login } from '../../../state/auth/authActions';

const Login = (props) => {
  const authenticated = useSelector((state) => state.auth.authenticated);

  useEffect(() => {
    if (authenticated) {
      props.history.push('/dashboard');
    }

    // eslint-disable-next-line
  }, [authenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(user);
  };

  const formContent = (
    <Fragment>
      <input type="email" name="email" placeholder="Email" className={inputTextStyle} onChange={onChange} />
      <input type="password" name="password" placeholder="Password" className={inputTextStyle} onChange={onChange} />
      <button className="btn btn-primary form-btn">Login</button>
      <HrText />
      <button className="form-btn google-btn">
        <span className="btn-icon-left btn-icon-bg-white">
          <FcGoogle />
        </span>
        <div className="social-btn-text">Login with Google</div>
      </button>
      <button className="form-btn facebook-btn">
        <span className="btn-icon-left">
          <FaFacebookF />
        </span>{' '}
        <div className="social-btn-text">Login with Facebook</div>
      </button>
      <div className="sign-up-container">
        <HrText text="Don't have an account?" />
        <Link to="/register" className="btn-link-container">
          <button className="btn btn-secondary form-btn-sm">Sign Up</button>
        </Link>
      </div>
    </Fragment>
  );
  return <FormModal title={'Login'} formContent={formContent} onSubmit={onSubmit} />;
};

const inputTextStyle = 'focus:outline-none w-full border border-gray-400 border-opacity-60 py-2 px-4 rounded-lg';

export default Login;
