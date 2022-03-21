import React from 'react';

interface ISpiner {
  width: string;
  height: string;
}

const Spinner: React.FC<ISpiner> = ({ width = '5rem', height = '5rem' }) => {
  return (
    <div
      className='spinner-border'
      style={{ width, height }}
      role='status'
    ></div>
  );
};

export default Spinner;
