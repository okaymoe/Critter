import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './LoginForm.css';

const LoginForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='LoginWrapper'>
      <div className='LoginClose'>
        <div onClick={() => setShowModal(false)} className='LoginCloseButtonContainer'>
          <HighlightOffIcon className='LoginCloseButton' />
        </div>
      </div>
      <div className='Loginwithoutclose'>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
        crossorigin="anonymous"
      />
        <i class="fas fa-paw" className="mylogo"></i>
        <p className='LoginText'>Sign in to Critter</p>

        <form onSubmit={onLogin}>
        <div className='LoginErrorContainer'>
          {errors.map((error, ind) => (
            <div className='LoginError' key={ind}>{error}</div>
          ))}
        </div>
          <div className='LoginFieldContainer'>
            <label className='LoginLabel' htmlFor='email'>Email</label>
            <input
              className='LoginInput'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='LoginFieldContainer'>
            <label className='LoginLabel' htmlFor='password'>Password</label>
            <input
              className='LoginInput'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
        </form>
          <button onClick={onLogin} className='LoginSubmit' type='submit'>Sign in</button>
      </div>
    </div>
  );
};

export default LoginForm;