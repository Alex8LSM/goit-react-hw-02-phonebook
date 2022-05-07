import React from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import importContacts from './ContactList/Contacts.json';
import ContactForm from './ContactForm/ContactForm';
import Filter from './SearchFilter/SearchFilter';
import './App.css';

class Phonebook extends React.Component {
  state = {
    contacts: importContacts,
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const { contacts } = this.state;

    contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    )
      ? alert(`${name} is already in contacts.`)
      : this.setState(({ contacts }) => ({ contacts: [...contacts, contact] }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className="container">
        <h1 className="maintitle"> Phonebook </h1>
        <h2 className="title">Add new contact</h2>
        <ContactForm onSubmit={this.addContact} />
        <h2 className="title">Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export const App = () => {
  return <Phonebook />;
};
