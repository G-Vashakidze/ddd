import React, { useState } from "react";
import ContactList from "../ContactList";
import Modal from "../Modal";
import './index.css';

const App = () => {
  const [modalIsOn, setModalIsOn] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [editData, setEditData] = useState(null); 

  const onEditModal = (data) => {
    setEditData(data);
    setModalIsOn(true);
  }
  
  return (
    <>
      <button onClick={() => {
        setModalIsOn(true);
        setEditData(null); 
      }} id="add-new-contact">Add Contact</button>
      <ContactList
      contacts={contacts}
      onSetContacts={setContacts}
      onEditModal={onEditModal}
      />

      {modalIsOn && (
        <Modal
          onSetModalIsOn={setModalIsOn}
          onSetContacts={setContacts}
          editData={editData} 
        />
      )}
    </>
  );
}

export default App;
