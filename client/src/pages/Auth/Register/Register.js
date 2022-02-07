import { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useSelector } from 'react-redux';

import FormModal from '../../../components/FormModal/FormModal';
import HrText from '../../../components/HrText/HrText';
import './Register.scss';

import { register } from '../../../state/user/userActions';

const Register = (props) => {
  const authenticated = useSelector((state) => state.user.authenticated);

  useEffect(() => {
    if (authenticated) {
      props.history.push('/dashboard');
    }

    // eslint-disable-next-line
  }, [authenticated, props.history]);

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    accountType: useLocation().accountType || 'student'
  });

  const { firstName, lastName, email, password, passwordConfirmation, accountType } = user;

  const setAccountTypeStyle = (element) => {
    const previouslySelected = document.querySelector('.toggle-group-item-selected');
    if (previouslySelected) {
      previouslySelected.classList.remove('toggle-group-item-selected');
    }

    element.parentElement.classList.add('toggle-group-item-selected');
  };

  const onChange = (e) => {
    if (e.target.name === 'accountType') {
      setAccountTypeStyle(e.target);
    }

    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register(user);
  };

  const formContent = (
    <Fragment>
      <div className="name-field-container">
        <input type="text" name="firstName" placeholder="First Name" value={firstName} className={inputTextStyle} onChange={onChange} />
        <input type="text" name="lastName" placeholder="Last Name" value={lastName} className={inputTextStyle} onChange={onChange} />
      </div>
      <input type="email" name="email" placeholder="Email" value={email} className={inputTextStyle} onChange={onChange} />
      <input type="password" name="password" placeholder="Create Password" value={password} className={inputTextStyle} onChange={onChange} />
      <input type="password" name="passwordConfirmation" placeholder="Confirm Password" value={passwordConfirmation} className={inputTextStyle} onChange={onChange} />
      <div className="form-toggle-group">
        <span className="toggle-group-header">I want to:</span>
        <div className="toggle-group">
          <label className={`toggle-group-item ${accountType === 'student' ? ' toggle-group-item-selected' : ''}`} htmlFor="student-account">
            Find an Instructor
            <input id="student-account" type="radio" name="accountType" checked={accountType === 'student'} onChange={onChange} value="student" />
          </label>
          <label className={`toggle-group-item toggle-group-item-right${accountType === 'instructor' ? ' toggle-group-item-selected' : ''}`} htmlFor="instructor-account">
            Become an Instructor
            <input id="instructor-account" type="radio" name="accountType" checked={accountType === 'instructor'} onChange={onChange} value="instructor" />
          </label>
        </div>
      </div>
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
      <FormModal title={'Register'} formContent={formContent} onSubmit={onSubmit} />
    </div>
  );
};

const inputTextStyle = 'focus:outline-none w-full border border-gray-400 border-opacity-60 py-2 px-4 rounded-lg';

export default Register;
