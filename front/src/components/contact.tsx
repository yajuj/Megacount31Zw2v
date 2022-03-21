import React from 'react';
import { IContact } from '../types/contact';
import EditContact from './edit-contact';
import RemoveContact from './remove-contact';

const Contact: React.FC<IContact> = ({ _id, name, phone }) => {
  return (
    <div className='list-group-item d-flex gap-3 py-3'>
      <div className='d-flex gap-2 w-100 justify-content-between'>
        <div>
          <p className='mb-1 text-break'>{name}</p>
          <p className='mb-0 text-break'>{phone}</p>
        </div>
        <div className='d-flex gap-3 justify-content-between'>
          <EditContact name={name} phone={phone} _id={_id} />
          <RemoveContact id={_id} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
