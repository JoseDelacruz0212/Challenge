import React, { createContext,  useState } from 'react'

const ContactContext = createContext();
function ContactProvider ({children}){

  const [Contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    physicalAddress: '',
  });

  const ClearFields = () =>{
    setContact({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      physicalAddress: '',
    })
  }


  const [updateContext, setUpdateContext] = useState(1);



  const [firstNameSearch, setFirstNameSearch] = useState('');

  const FindContacts = Contacts.filter(
    (contact)=>{
      return contact.firstName.toLowerCase().includes(firstNameSearch.toLocaleLowerCase());
    }
  )

  return (
    <ContactContext.Provider
        value={{
          contact, setContact,
          ClearFields,
          Contacts, setContacts,
          firstNameSearch, setFirstNameSearch,
          FindContacts,
          updateContext, setUpdateContext
        }}
    >
        {children}
    </ContactContext.Provider>
  )
}

export {ContactContext, ContactProvider}