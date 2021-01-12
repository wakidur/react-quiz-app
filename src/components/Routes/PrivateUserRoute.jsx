/* eslint-disable no-undef */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { getItemFromLocalStorage } from '../../utilities/localStorage';

const PrivateUserRoute = ({ component: Component, ...rest }) => {
  const userInfo = getItemFromLocalStorage('authUserInfo');
  console.log(userInfo);
  return (
    <Route
      {...rest}
      render={(props) =>
        !userInfo ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

export default PrivateUserRoute;
