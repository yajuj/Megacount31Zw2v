import React, { useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { useAppContext } from '../context/app-context';
import { IContact } from '../types/contact';
import ContactForm from './contact-form';
import Modal from './modal';

const EditContact: React.FC<IContact> = ({ _id, name, phone }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    updateContact,
    editedUserValues,
    setEditedUserValue,
    setEditedContact,
    error,
  } = useAppContext();

  const handleSubmit = async () => {
    updateContact({
      name: editedUserValues.name,
      phone: editedUserValues.phone,
      _id,
    });
    setIsOpen(false);
  };

  const handleOpen = () => {
    setEditedContact({ name, phone });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <BsFillPencilFill role='button' onClick={handleOpen} />
      <Modal
        title='Редактировать'
        btnCancelTitle='Отмена'
        btnAceptTitle='Сохранить'
        isOpen={isOpen}
        onCancel={handleClose}
        onSubmit={handleSubmit}
      >
        <ContactForm
          name={editedUserValues.name}
          phone={editedUserValues.phone}
          handleNameChange={setEditedUserValue}
          handlePhoneChange={setEditedUserValue}
        />
      </Modal>
    </React.Fragment>
  );
};

export default EditContact;
