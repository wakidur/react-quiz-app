import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AlertMessage from "../components/Message/AlertMessage";
import { auth } from '../utilities/userAction';
import { usersDB } from '../utilities/dataStore';
import { getItemFromLocalStorage } from '../utilities/localStorage';

const LogIn = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  
  const redirect = location.search ? location.search.split('=')[1] : '/questions';
  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and passwor is required!');
      return;
    }
    if (auth(email, password)) {
      setError('');
      history.push('/questions');
    } else {
      setError('User not match!');
      return;
    }
  };

  useEffect(() => {
    const userInfo = getItemFromLocalStorage('authUserInfo') ? getItemFromLocalStorage('authUserInfo') : {};
    console.log(userInfo);
    if (Object.keys(userInfo).length > 0) {
      history.push(redirect);
    }
  }, [redirect, history]);

  return (
    <main className='form-signin-contain vh-100'>
      
      <form className='form-signin text-center' onSubmit={submitHandler}>
        { error && error ? (<AlertMessage message={error} alertClassType="alert-danger" />) : null }
        <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>
        <label htmlFor='inputEmail' className='visually-hidden'>
          Email address
        </label>
        <input
          type='email'
          id='inputEmail'
          className='form-control'
          placeholder='Email address'
          required
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='inputPassword' className='visually-hidden'>
          Password
        </label>
        <input
          type='password'
          id='inputPassword'
          className='form-control'
          placeholder='Password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='w-100 btn btn-lg btn-primary' type='submit'>
          Sign in
        </button>
        <p className='mt-5 mb-3 text-muted'>&copy; 2017-2021</p>
      </form>
    </main>
  );
};

export default LogIn;
