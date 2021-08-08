import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import FormModal from '../../components/FormModal/FormModal';
import HrText from '../../components/HrText/HrText';
import './Register.scss';

const Register = () => {
  const formContent = (
    <Fragment>
      <div className="name-field-container">
        <input type="text" name="firstName" placeholder="First Name" />
        <input type="text" name="lastName" placeholder="Last Name" />
      </div>
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Create Password" />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" />
      <button className="btn btn-primary form-btn">Create My Account</button>
      <p className="text-link">
        Already have an account?{' '}
        <Link to="/login" className="primary-login-link">
          Login
        </Link>
      </p>
      <HrText />
      <button className="form-btn google-btn">
        <span className="btn-icon-left btn-icon-bg-white">
          <FcGoogle />
        </span>
        <div className="social-btn-text">Continue with Google</div>
      </button>
      <button className="form-btn facebook-btn">
        <span className="btn-icon-left">
          <FaFacebookF />
        </span>{' '}
        <div className="social-btn-text">Continue with Facebook</div>
      </button>
    </Fragment>
  );

  return (
    <div>
      <FormModal title={'Register'} formContent={formContent} />
    </div>
  );
};

export default Register;
