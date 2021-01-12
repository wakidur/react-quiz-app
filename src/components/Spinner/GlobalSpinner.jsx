/* eslint-disable react/prop-types */
import React from 'react';

const GlobalSpinner = ({ spinnerClass }) => (
  <div className=" d-flex justify-content-center align-items-center">
    <div className={`spinner-border ${spinnerClass}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default GlobalSpinner;
