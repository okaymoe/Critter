import React, { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = ({ setShowModal }) => {
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  // const [birthday, setBirthday] = useState(new Date(user.birthday) || new Date());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validationErrors = [];

    if (name.length <= 20 &&
      name.length >= 4 &&
      username.length <= 40 &&
      username.length >= 4 &&
      email.length <= 40 &&
      email.length >= 9 &&
      email.match(emailRegex) &&
      // location.length >= 4 &&
      // location.length <= 25 &&
      // birthday &&
      password.length <= 255 &&
      password.length >= 8 &&
      password === repeatPassword
    ) {
      const data = await dispatch(signUp(name, username, email, password));
      if (data) {
        setErrors(data)
      } else {
        setShowModal(false);
        history.push('/')
      }
    } else {
      if (name.length < 1 || name.length > 50) {
        validationErrors.push("Name must be between 1 and 50 characters");
      }
      if (username.length < 4 || username.length > 40) {
        validationErrors.push("Username must be between 1 and 15 characters");
      }
      if (email && !email.match(emailRegex)) {
        validationErrors.push("Email is not a valid email");
      }
      if (email.length < 7 || email.length > 30) {
        validationErrors.push("Email must be between 7 and 30 characters");
      }
      // if (location.length < 4 || location.length > 25) {
      //   validationErrors.push("Location must be between 4 and 25 characters");
      // }
      if (password.length < 7 || password.length > 30) {
        validationErrors.push("Password must be between 7 and 30 characters");
      }
      if (password.length > 30) {
        validationErrors.push("Password must be less than 30 characters");
      } else {
        if (password !== repeatPassword) {
          validationErrors.push('Passwords do not match');
        }
      }
      setErrors(validationErrors);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateLocation = (e) => {
    setLocation(e.target.value);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/'/>;
  }

  return (
    <div className='SignupWrapper'>
      <div className='SignupHeader'>
        <div className='SignupTitle'>
          <div onClick={() => setShowModal(false)} className='SignupCloseButtonContainer'>
            <HighlightOffIcon className='SignupCloseButton' />
          </div>
          <p className='SignUpTitleText'>Create your account</p>
        </div>
      </div>
      <form className="SignupForm" onSubmit={onSignUp}>
        <div className='SignupErrorContainer'>
          {errors.map((error, ind) => (
            <div className='SignupError' key={ind}>{error}</div>
          ))}
        </div>
        <div className='SignupFieldContainer'>
          <label className='SignupLabel'>Name</label>
          <input
            className='SignupInput'
            type='text'
            name='name'
            onChange={updateName}
            value={name}
            required={true}
          ></input>
        </div>
        <div className='SignupFieldContainer'>
          <label className='SignupLabel'>Username</label>
          <input
            className='SignupInput'
            type='text'
            name='username'
            placeholder='Username'
            onChange={updateUsername}
            value={username}
            required={true}
          ></input>
        </div>
        <div className='SignupFieldContainer'>
          <label className='SignupLabel'>Email</label>
          <input
            className='SignupInput'
            type='text'
            name='email'
            placeholder='Email'
            onChange={updateEmail}
            value={email}
            required={true}
          ></input>
        </div>
        {/* <div className='SignupFieldContainer'>
          <label className='SignupLabel'>Location</label>
          <input
            className='SignupInput'
            type='text'
            name='location'
            placeholder='Location'
            onChange={updateLocation}
            value={location}
            required={true}
          ></input>
        </div> */}
        <div className='SignupFieldContainer'>
          <label className='SignupLabel'>Password</label>
          <input
            className='SignupInput'
            type='password'
            name='password'
            placeholder='Password'
            onChange={updatePassword}
            value={password}
            required={true}
          ></input>
        </div>
        <div className='SignupFieldContainer'>
          <label className='SignupLabel'>Repeat Password</label>
          <input
            className='SignupInput'
            type='password'
            name='repeat_password'
            placeholder='Repeat Password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
      </form>
      <button onClick={onSignUp} className='SignupSubmitButton' type='submit'>Sign up</button>
    </div>
  );
};

export default SignUpForm;