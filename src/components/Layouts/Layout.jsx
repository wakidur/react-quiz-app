/* eslint-disable no-lone-blocks */
import React from 'react';
import Header from './Header';

{ /* overall router which user can go through without UnAuth */ }
const Layout = ({ children }) => (
  <>
    <Header />
    <main role="main" className=" container mt-4">
      {children}
    </main>
  </>
);

export default Layout;