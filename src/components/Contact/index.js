import React from 'react';

const Contact = ({ contactData, checkedIds, onToggleContactFromList, onSetContacts, onEditModal }) => {

  const onDeleteContact = () => {
    onSetContacts((contacts) => {
      const filteredList = contacts.filter(contact => contact.id !== contactData.id);
      localStorage.setItem('contacts', JSON.stringify(filteredList));
      return filteredList;
    });
  }

  const onEditContact = () => {
    onEditModal(contactData); 
  }
  return (
    <tr>
      <td>
        <input type="checkbox" onChange={(e) => onToggleContactFromList(e, contactData.id)} checked={checkedIds.includes(contactData.id)} />
      </td>
      <td><i className="fa fa-trash-o" onClick={onDeleteContact} style={{ cursor: 'pointer' }} /></td>
      <td><i className="fa fa-pencil" onClick={onEditContact} style={{ cursor: 'pointer' }} /></td>
      <td>{contactData.name}</td>
      <td>{contactData.phoneNumber}</td>
    </tr>
  );
}

export default Contact;

