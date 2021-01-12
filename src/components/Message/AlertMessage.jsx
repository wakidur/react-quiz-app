/* eslint-disable react/prop-types */
import React from 'react';

function AlertMessage({ message, alertClassType }) {
  return (
    <div className={`alert alert-dismissible fade show ${alertClassType}`} role="alert">
      {message}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
    </div>
  );
}

export default AlertMessage;
