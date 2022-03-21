import React, { useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import { useAppContext } from '../context/app-context';
import { IContact } from '../types/contact';
import ContactForm from './contact-form';
import Modal from './modal';
import Spinner from './spinner';

const EditContact: React.FC<IContact> = ({ _id, name, phone }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    updateContact,
    editedUserValues,
    setEditedUserValue,
    setEditedContact,
    error,
  } = useAppContext();

  const handleSubmit = async () => {
    try {
      setIsUpdating(true);
      await updateContact({
        name: editedUserValues.name,
        phone: editedUserValues.phone,
        _id,
      });
      setIsOpen(false);
    } catch (e) {
    } finally {
      setIsUpdating(false);
    }
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
        isDisabled={isUpdating}
      >
        {error && <p className='text-danger'>{error}</p>}
        <ContactForm
          name={editedUserValues.name}
          phone={editedUserValues.phone}
          handleNameChange={setEditedUserValue}
          handlePhoneChange={setEditedUserValue}
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

export default EditContact;
