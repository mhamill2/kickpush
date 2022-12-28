import { Fragment, useEffect, useState } from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../../../components/elements/Button';
import FormModal from '../../../components/forms/FormModal';
import HrText from '../../../components/elements/HrText';
import { login } from '../../../state/user/userActions';

const Login = (props) => {
  const authenticated = useSelector((state) => state.user.authenticated);

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
      <Button content="Login" isPrimary={true} size="large" extraClasses="mb-4" />
      <HrText />
      <Button
        extraClasses="bg-googleBlue border-googleBlue flex my-4 text-white"
        size="large"
        content={
          <Fragment>
            <span className="bg-white text-2xl m-0 h-9 w-9 rounded-3xl flex justify-center items-center">
              <FcGoogle />
            </span>
            <div className="flex self-center justify-center w-11/12 -ml-4">Login with Google</div>
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
            <div className="flex self-center justify-center w-11/12 -ml-4">Login with Facebook</div>
          </Fragment>
        }
      ></Button>
      <div className="border-t border-secondary w-full mt-12 pt-3 flex flex-col justify-center items-center mb-4">
        <HrText text="Don't have an account?" />
        <Link to="/register" className="text-center w-full">
          <Button content="Sign Up" isSecondary={true} size="small" extraClasses="mt-5"></Button>
        </Link>
      </div>
    </Fragment>
  );
  return <FormModal title={'Login'} formContent={formContent} onSubmit={onSubmit} />;
};

const inputTextStyle = 'focus:outline-none w-full border border-gray-400 border-opacity-60 py-2 px-4 rounded-lg mb-4';

export default Login;
