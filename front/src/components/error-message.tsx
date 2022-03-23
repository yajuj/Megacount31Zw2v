import React from 'react';
import { useAppContext } from '../context/app-context';

const ErrorMessage = () => {
  const { error } = useAppContext();
  if (!!error) return <p className='text-danger text-break'>{error}</p>;
  return null;
};

export default ErrorMessage;
