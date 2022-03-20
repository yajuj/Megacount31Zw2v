import React from 'react';
import { BsFillPencilFill, BsXLg } from 'react-icons/bs';
import { IContact } from '../types/contact';

const Contact: React.FC<IContact> = ({ _id, name, phone }) => {
  return (
    <div className='list-group-item d-flex gap-3 py-3'>
      <div className='d-flex gap-2 w-100 justify-content-between'>
        <div>
          <p className='mb-1 '>{name}</p>
          <p className='mb-0'>{phone}</p>
        </div>
        <div className='d-flex gap-3 justify-content-between'>
          <BsFillPencilFill />
          <BsXLg />
        </div>
      </div>
    </div>
  );
};

export default Contact;
