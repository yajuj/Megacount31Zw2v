import axios, { AxiosError } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import api from '../http/api';
import { IContact } from '../types/contact';

interface ContextState {
  contacts: IContact[];
  error: string;
  isLoading: boolean;
  removeContact: (id: string) => void;
  addContact: (contact: Omit<IContact, '_id'>) => void;
  updateContact: (contact: IContact) => void;
}

const Context = React.createContext<ContextState>({} as ContextState);

export const AppContextProvider: React.FC = ({ children }) => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      const { data } = await api.post<IContact>('/contacts', contact);
      setContacts(_contacts => [data, ..._contacts]);
      setError('');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError;
        setError(err.response?.data.msg);
      } else {
        setError('Не удалось добавить контакт.');
      }
    }
  };

  const updateContact = async (contact: IContact) => {
    try {
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
      } else {
        setError('Не удалось обновить контакт.');
      }
    }
  };

  return (
    <Context.Provider
      value={{
        contacts,
        removeContact,
        updateContact,
        addContact,
        error,
        isLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
