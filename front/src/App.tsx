import React from 'react';
import Contact from './components/contact';
import Modal from './components/modal';
import './app.css';

function App() {
  return (
    <div className='container my-5'>
      <Contact _id='1' name={'Timur'} phone={'+79635646454'}></Contact>
      <Modal />
    </div>
  );
}

export default App;
