import { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useSelector } from 'react-redux';

import Button from '../../../components/Button/Button';
import FormModal from '../../../components/FormModal/FormModal';
import HrText from '../../../components/HrText/HrText';

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

  const setInputType = (e) => {
    e.target.type = 'date';
  };

  const formContent = (
    <Fragment>
      <div className="flex justify-between">
        <input type="text" name="firstName" placeholder="First Name" value={firstName} className={inputTextStyle + ' mr-4'} onChange={onChange} />
        <input type="text" name="lastName" placeholder="Last Name" value={lastName} className={inputTextStyle} onChange={onChange} />
      </div>
      <input type="email" name="email" placeholder="Email" value={email} className={inputTextStyle} onChange={onChange} />
      <input type="password" name="password" placeholder="Create Password" value={password} className={inputTextStyle} onChange={onChange} />
      <input
        type="password"
        name="passwordConfirmation"
        placeholder="Confirm Password"
        value={passwordConfirmation}
        className={inputTextStyle}
        onChange={onChange}
      />
      <input name="birthDate" placeholder="Birthday" className={inputTextStyle + ' text-gray-400'} onChange={onChange} onFocus={setInputType} />
      <div className="text-center mb-4">
        <span className="font-semibold">I want to:</span>
        <div className="flex justify-center items-center border-secondary rounded-lg mt-3">
          <label
            className={`px-4 py-2 w-1/2 cursor-pointer rounded-tl-lg rounded-bl-lg ${accountType === 'student' ? ' bg-primary text-white' : ''}`}
            htmlFor="student-account"
          >
            Find an Instructor
            <input
              id="student-account"
              className="opacity-0 h-0"
              type="radio"
              name="accountType"
              checked={accountType === 'student'}
              onChange={onChange}
              value="student"
            />
          </label>
          <label
            className={`px-4 py-2 w-1/2 cursor-pointer rounded-tr-lg rounded-br-lg border-l-secondary${
              accountType === 'instructor' ? ' bg-primary text-white' : ''
            }`}
            htmlFor="instructor-account"
          >
            Become an Instructor
            <input
              id="instructor-account"
              className="opacity-0 h-0"
              type="radio"
              name="accountType"
              checked={accountType === 'instructor'}
              onChange={onChange}
              value="instructor"
            />
          </label>
        </div>
      </div>
      <Button content="Create My Account" isPrimary={true} size="large" extraClasses="mb-4" />
      <p className="text-link mb-4">
        Already have an account?{' '}
        <Link to="/login" className="text-primary">
          Login
        </Link>
      </p>
      <HrText />
      <Button
        extraClasses="bg-googleBlue border-googleBlue flex my-4 text-white"
        size="large"
        content={
          <Fragment>
            <span className="bg-white text-2xl m-0 h-9 w-9 rounded-3xl flex justify-center items-center">
              <FcGoogle />
            </span>
            <div className="flex self-center justify-center w-11/12 -ml-4">Continue with Google</div>
          </Fragment>
        }
      ></Button>
      <Button
        extraClasses="bg-facebookBlue border-facebookBlue flex mb-4 text-white"
        size="large"
        content={
          <Fragment>
            <span className="text-2xl m-0 h-9 w-9 rounded-3xl flex justify-center items-center">
              <FaFacebookF />
            </span>{' '}
            <div className="flex self-center justify-center w-11/12 -ml-4">Continue with Facebook</div>
          </Fragment>
        }
      ></Button>
    </Fragment>
  );

  return (
    <div>
      <FormModal title={'Register'} formContent={formContent} onSubmit={onSubmit} />
    </div>
  );
};

const inputTextStyle = 'focus:outline-none w-full border border-gray-400 border-opacity-60 py-2 px-4 rounded-lg mb-4';

export default Register;
