import React, { useState } from 'react';
import { BsXLg } from 'react-icons/bs';
import { useAppContext } from '../context/app-context';
import Modal from './modal';

interface IRemoveContact {
  id: string;
}

const RemoveContact: React.FC<IRemoveContact> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { removeContact } = useAppContext();
  const handleRemove = () => {
    removeContact(id);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <BsXLg role='button' onClick={() => setIsOpen(true)} />
      <Modal
        title='Удалить?'
        btnCancelTitle='Отмена'
        btnAceptTitle='Удалить'
        isOpen={isOpen}
        onCancel={handleClose}
        onSubmit={handleRemove}
      />
    </React.Fragment>
  );
};

export default RemoveContact;
