import React from 'react';
import './App.css';
import AddContact from './components/add-contact';
import Contact from './components/contact';
import ErrorMessage from './components/error-message';
import Spinner from './components/spinner';
import { useAppContext } from './context/app-context';

function App() {
  const { contacts, error, isLoading } = useAppContext();

  if (isLoading)
    return (
      <div className='d-flex justify-content-center align-items-center vw-100 vh-100'>
        <Spinner width='5rem' height='5rem' />
      </div>
    );

  if (!contacts.length)
    return (
      <div className='container my-5'>
        <div className='row'>
          <div className='list-group mx-auto col-sm-5'>
            <ErrorMessage />
            <p>У вас нет контактов.</p>
            <p>Что бы добавить контакт нажмите на зеленую кнопку в углу</p>
          </div>
        </div>
        <AddContact />
      </div>
    );

  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='list-group mx-auto col-sm-5'>
          {contacts.map(({ _id, name, phone }) => (
            <Contact key={_id} _id={_id} name={name} phone={phone} />
          ))}
        </div>
      </div>
      <AddContact />
    </div>
  );
}

export default App;
