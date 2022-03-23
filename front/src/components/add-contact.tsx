import React, { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { useAppContext } from '../context/app-context';
import ContactForm from './contact-form';
import ErrorMessage from './error-message';
import Modal from './modal';
import Spinner from './spinner';

const AddButton = () => {
  const { addContact, isUpdating, removeErrorMessage } = useAppContext();

  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddContact = async () => {
    try {
      const contact = { name, phone };
      await addContact(contact);
      setName('');
      setPhone('');
      setIsOpen(false);
    } catch (error) {}
  };

  const handleAbort = () => {
    setName('');
    setPhone('');
    setIsOpen(false);
  };
  return (
    <React.Fragment>
      <div
        className='btn-add'
        onClick={() => {
          removeErrorMessage();
          setIsOpen(true);
        }}
      >
        <BsPlus className='text-white' />
      </div>{' '}
      <Modal
        onSubmit={handleAddContact}
        onCancel={handleAbort}
        title='Добавить контакт'
        btnAceptTitle='Добавить'
        btnCancelTitle='Отмена'
        isOpen={isOpen}
      >
        <ErrorMessage />
        <ContactForm
          name={name}
          phone={phone}
          handleNameChange={e => setName(e.target.value)}
          handlePhoneChange={e => setPhone(e.target.value)}
        />
        {isUpdating && (
          <div className='d-flex justify-content-center align-items-center'>
            <Spinner width='1rem' height='1rem' />
          </div>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default AddButton;
