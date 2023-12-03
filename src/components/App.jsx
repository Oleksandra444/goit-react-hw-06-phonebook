import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { GlobalStyle } from "./GlobalStyle";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { ContactFilter } from "./ContactFilter/ContactFilter";
import { SectionTitle, Layout } from "./App.styled";

const storageKey = 'contact-list';


export const App = () => { 

  const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem(storageKey)) ?? []);
  const [filter, setFilters] = useState('');

   useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(contacts));
  }, [contacts]);

const addCard =
    newContact => {
      if (contacts.some(contact => contact.name === newContact.name)) {
        alert(`Name ${newContact.name} is already exist in your Contacts`)
      }
      else {
        const contact = {
          ...newContact,
          id: nanoid(),
        };
        setContacts(prevState => [...prevState, contact]);
        };
      }
    

const deleteCard = (cardId) => {
  setContacts(prevState => prevState.filter(contact => contact.id !== cardId))
};

const updateListFilter = (newList) => {
  setFilters(newList);
};
  
const resetFilter = () => {
  setFilters('');
};


const visibleContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));


  return (
      <div>
        <Layout>
        <SectionTitle>Phonebook</SectionTitle>
        <ContactForm onAdd={addCard} />
        <SectionTitle>Contacts</SectionTitle>
        <ContactFilter name={filter} onUpdateList={updateListFilter} onResetFilter={resetFilter} />
        {visibleContacts.length>0 && <ContactList contacts={visibleContacts} onDelete={ deleteCard} /> }
          <GlobalStyle />
          </Layout>
      </div>
    );


}
