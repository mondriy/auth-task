import React, { FC } from 'react'
import { useAppSelector } from '../../redux/hooks/redux';
import Contact from './Contact';

interface ContactFilterType {
  request: string
}

const ContactFilter: FC<ContactFilterType> = ({ request }: ContactFilterType) => {
  const { contacts } = useAppSelector(state => state.contactReducer);

  return (
    <>
      {contacts
        .filter((contact) => contact.name.toUpperCase().indexOf(request.toUpperCase()) > -1)
        .map((contact) => 
          <Contact
            key={contact._id}
            contactId={contact._id}
            name={contact.name}
            phone={contact.phone}/>)}
    </>
  )
}

export default ContactFilter