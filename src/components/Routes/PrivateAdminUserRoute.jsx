/* eslint-disable no-undef */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getItemFromLocalStorage } from '../../utilities/localStorage';

const PrivateAdminUserRoute = ({ component: Component, ...rest }) => {
  
  const userInfo = getItemFromLocalStorage('authUserInfo');
console.log(userInfo);
  return (
    <Route
      {...rest}
      render={(props) =>
        !userInfo ? (
          <Redirect to='/' />
        ) : userInfo.role !== 'admin' ? (
          <Redirect to='/admin/quiz' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateAdminUserRoute;
