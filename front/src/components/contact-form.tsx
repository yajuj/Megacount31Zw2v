import React from 'react';

interface IContactForm {
  name: string;
  phone: string;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactForm: React.FC<IContactForm> = ({
  name,
  phone,
  handleNameChange,
  handlePhoneChange,
}) => {
  return (
    <React.Fragment>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label'>
          Имя
        </label>
        <input
          type='email'
          className='form-control'
          id='name'
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='phone' className='form-label'>
          Номер телефона
        </label>
        <input
          value={phone}
          type='email'
          className='form-control'
          id='phone'
          onChange={handlePhoneChange}
        />
      </div>
    </React.Fragment>
  );
};

export default ContactForm;
