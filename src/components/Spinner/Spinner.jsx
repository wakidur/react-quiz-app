import React from 'react';

const Spinner = () => (
  <div className="d-flex justify-content-center align-items-center vh-100 min-vh-100">
    <div
      className="spinner-grow text-primary"
      style={{
        width: 48, height: 48
      }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Spinner;
