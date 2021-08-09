import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import FormModal from '../../components/FormModal/FormModal';
import HrText from '../../components/HrText/HrText';
import './Login.scss';

const Login = () => {
  const formContent = (
    <Fragment>
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
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
        <button className="btn btn-secondary form-btn-sm">Sign Up</button>
      </div>
    </Fragment>
  );
  return <FormModal title={'Login'} formContent={formContent} />;
};

export default Login;
