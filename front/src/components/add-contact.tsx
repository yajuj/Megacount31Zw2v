import React, { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { useAppContext } from '../context/app-context';
import ContactForm from './contact-form';
import Modal from './modal';

const AddButton = () => {
  const { addContact } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddContact = () => {
    const contact = { name, phone };
    addContact(contact);
    setName('');
    setPhone('');
    setIsOpen(false);
  };

  const handleAbort = () => {
    setName('');
    setPhone('');
    setIsOpen(false);
  };
  return (
    <div className='btn-add'>
      <BsPlus className='text-white' onClick={() => setIsOpen(true)} />
      <Modal
        onSubmit={handleAddContact}
        onCancel={handleAbort}
        title='Добавить контакт'
        btnAceptTitle='Добавить'
        btnCancelTitle='Отмена'
        isOpen={isOpen}
      >
        <ContactForm
          name={name}
          phone={phone}
          handleNameChange={e => setName(e.target.value)}
          handlePhoneChange={e => setPhone(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default AddButton;
