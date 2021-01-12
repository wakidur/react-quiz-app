/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

import {
  getItemFromLocalStorage,
  clearLocalStorage,
} from '../../utilities/localStorage';

const Header = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const user = getItemFromLocalStorage('authUserInfo') ? getItemFromLocalStorage('authUserInfo') : {};;
    setUserInfo(user);
  }, []);

  const logOut = () => {
    clearLocalStorage();
    history.push('/');
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          Quiz App
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mx-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink
                activeClassName='active'
                className='nav-link'
                to='/questions'
              >
                Question
              </NavLink>
            </li>

            {userInfo &&
            Object.keys(userInfo).length > 0 &&
            userInfo.role === 'user' ? (
              <li className='nav-item'>
                <NavLink
                  activeClassName='active'
                  className='nav-link'
                  to='/user/answer'
                >
                  Answer
                </NavLink>
              </li>
            ) : null}
            {userInfo &&
            Object.keys(userInfo).length > 0 &&
            userInfo.role === 'admin' ? (
              <>
                <li className='nav-item'>
                  <NavLink
                    activeClassName='active'
                    className='nav-link'
                    to='/admin/answer'
                  >
                    Answer
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink
                    activeClassName='active'
                    className='nav-link'
                    to='/admin/quiz'
                  >
                    Quiz
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
          <div className='d-flex align-items-center'>
            {userInfo && Object.keys(userInfo).length > 0 ? (
              <>
                <span>{userInfo.email}</span>
                <button
                  onClick={logOut}
                  className='ms-3 btn btn-outline-primary'
                >
                  Logout
                </button>
              </>
            ) : (
              <Link role='button' className='btn btn-outline-success' to='/'>
                SignIn
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
