import React, { useState } from 'react';
import './modal.css';

const Modal = ({ onSetModalIsOn, onSetContacts, editData }) => {
  const [userInput, setUserInput] = useState(editData || { name: '', phoneNumber: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const createNewContact = (e) => {
    const { value, name } = e.target;
    setUserInput((userInput) => ({ id: Date.now(), ...userInput, [name]: value }));
  }

  const addOrEditContact = () => {
    if (!userInput.name || !userInput.phoneNumber) {
      setErrorMessage('Name and phone number are required.');
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(userInput.name)) {
      setErrorMessage('Name should only contain letters and spaces.');
      return;
    }

    if (!/^\d+$/.test(userInput.phoneNumber)) {
      setErrorMessage('Phone number should only contain digits.');
      return;
    }

    if (editData) {
      onSetContacts((previousContacts) => {
        const updatedContacts = previousContacts.map((contact) => {
          if (contact.id === editData.id) {
            return userInput;
          }
          return contact;
        });
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        return updatedContacts;
      });
    } else {
      onSetContacts((previousContacts) => {
        previousContacts.push(userInput);
        localStorage.setItem('contacts', JSON.stringify(previousContacts));
        return previousContacts;
      });
    }

    onSetModalIsOn(false);
  }

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => onSetModalIsOn(false)}>&times;</span>
        <h2 style={{ textAlign: "center" }}>{editData ? "Edit Contact" : "Add New Contact"}</h2>
        <div className='userInputWrapper'>
          <input type='text' name='name' placeholder='Name' onInput={createNewContact} value={userInput.name} />
        </div>
        <div className='userInputWrapper'>
          <input type='text' name="phoneNumber" placeholder='Phone number' onInput={createNewContact} value={userInput.phoneNumber} />
        </div>
        <div className='userInputWrapper'>
          <button onClick={addOrEditContact}>{editData ? "Save" : "Add"}</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
}

export default Modal;
