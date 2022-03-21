import React, { useState } from 'react';
import { BsFillPencilFill, BsXLg } from 'react-icons/bs';
import { useAppContext } from '../context/app-context';
import { IContact } from '../types/contact';
import ContactForm from './contact-form';
import Modal from './modal';

const Contact: React.FC<IContact> = ({ _id, name, phone }) => {
  const {
    removeContact,
    updateContact,
    editedUserValues,
    setEditedUserValue,

    setEditedContact,
  } = useAppContext();

  const [isEdit, setIsEdit] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  const handleEditSubmit = () => {
    updateContact({
      name: editedUserValues.name,
      phone: editedUserValues.phone,
      _id,
    });
    setIsEdit(false);
  };

  const handleEditOpen = () => {
    setEditedContact({ name, phone });
    setIsEdit(true);
  };

  const handleEditClose = () => {
    setIsEdit(false);
  };

  const handleRemove = () => {
    removeContact(_id);
    setIsRemove(false);
  };

  const handleRemoveClose = () => {
    setIsRemove(false);
  };

  return (
    <div className='list-group-item d-flex gap-3 py-3'>
      <div className='d-flex gap-2 w-100 justify-content-between'>
        <div>
          <p className='mb-1 text-break'>{name}</p>
          <p className='mb-0 text-break'>{phone}</p>
        </div>
        <div className='d-flex gap-3 justify-content-between'>
          <BsFillPencilFill role='button' onClick={handleEditOpen} />
          <BsXLg role='button' onClick={() => setIsRemove(true)} />
        </div>
      </div>
      <Modal
        title='Редактировать'
        btnCancelTitle='Отмена'
        btnAceptTitle='Сохранить'
        isOpen={isEdit}
        onCancel={handleEditClose}
        onSubmit={handleEditSubmit}
      >
        <ContactForm
          name={editedUserValues.name}
          phone={editedUserValues.phone}
          handleNameChange={setEditedUserValue}
          handlePhoneChange={setEditedUserValue}
        />
      </Modal>
      <Modal
        title='Удалить?'
        btnCancelTitle='Отмена'
        btnAceptTitle='Удалить'
        isOpen={isRemove}
        onCancel={handleRemoveClose}
        onSubmit={handleRemove}
      />
    </div>
  );
};

export default Contact;
