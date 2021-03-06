import axios, { AxiosError } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import api from '../http/api';
import { IContact } from '../types/contact';

interface ContextState {
  contacts: IContact[];
  error: string;
  isLoading: boolean;
  isUpdating: boolean;
  editedUserValues: Omit<IContact, '_id'>;
  removeErrorMessage: () => void;
  setEditedContact: (contact: Omit<IContact, '_id'>) => void;
  setEditedUserValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeContact: (id: string) => void;
  addContact: (contact: Omit<IContact, '_id'>) => void;
  updateContact: (contact: IContact) => void;
}

const Context = React.createContext<ContextState>({} as ContextState);

export const AppContextProvider: React.FC = ({ children }) => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [editedUserValues, setEditedUserValues] = useState(
    {} as Omit<IContact, '_id'>
  );

  const setEditedContact = (contact: Omit<IContact, '_id'>) => {
    setEditedUserValues(contact);
  };

  const setEditedUserValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'name') {
      setEditedUserValues({ ...editedUserValues, name: e.target.value });
    }
    if (e.target.id === 'phone') {
      setEditedUserValues({ ...editedUserValues, phone: e.target.value });
    }
  };

  const removeErrorMessage = () => {
    setError('');
  };

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get<IContact[]>('/contacts');
      setContacts(data);
      setError('');
    } catch (error) {
      setError('Не удалось загрузить контакты');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  const removeContact = async (id: string) => {
    try {
      await api.delete(`/contacts/${id}`);
      const flitredContacts = contacts.filter(contact => contact._id !== id);
      setContacts(flitredContacts);
      setError('');
    } catch (error) {
      setError('Не удалось контакт.');
    }
  };

  const addContact = async (contact: Omit<IContact, '_id'>) => {
    try {
      setIsUpdating(true);
      const { data } = await api.post<IContact>('/contacts', contact);
      setContacts(_contacts => [data, ..._contacts]);
      setError('');
      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError;
        setError(err.response?.data.msg);
        throw new Error();
      } else {
        setError('Не удалось добавить контакт.');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const updateContact = async (contact: IContact) => {
    try {
      setIsUpdating(true);
      await api.patch(`/contacts/${contact._id}`, contact);
      setContacts(_contacts =>
        _contacts.map(_contact =>
          _contact._id === contact._id ? contact : _contact
        )
      );
      setError('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError;
        setError(err.response?.data.msg);
        throw new Error();
      } else {
        setError('Не удалось обновить контакт.');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Context.Provider
      value={{
        contacts,
        editedUserValues,
        setEditedContact,
        setEditedUserValue,
        removeContact,
        updateContact,
        addContact,
        removeErrorMessage,
        error,
        isLoading,
        isUpdating,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
