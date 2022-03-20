import React from 'react';

const Spinner = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vw-100 vh-100'>
      <div
        className='spinner-border'
        style={{ width: '5rem', height: '5rem' }}
        role='status'
      ></div>
    </div>
  );
};

export default Spinner;
