import React, { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { useAppContext } from '../context/app-context';
import ContactForm from './contact-form';
import Modal from './modal';
import Spinner from './spinner';

const AddButton = () => {
  const { addContact, error } = useAppContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddContact = async () => {
    try {
      setIsUpdating(true);
      const contact = { name, phone };
      await addContact(contact);
      setName('');
      setPhone('');
      setIsOpen(false);
    } catch (error) {
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAbort = () => {
    setName('');
    setPhone('');
    setIsOpen(false);
  };
  return (
    <React.Fragment>
      <div className='btn-add' onClick={() => setIsOpen(true)}>
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
        {error && <p className='text-danger'>{error}</p>}
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
