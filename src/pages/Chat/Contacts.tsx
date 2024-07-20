import React from 'react';
import Navbar from '../../components/Contacts/Navbar';
import { UserState } from '../../store/userSlice';
import ContactList from '../../components/Contacts/ContactList';
// import { database } from '../../utils/firebase';
// import { get, ref } from 'firebase/database';

interface ContactsProps {
  users: UserState;
}

const Contacts: React.FC<ContactsProps> = ({users}) => {

  return (
    <div className='bg-primary-500 h-screen'>
      <Navbar />
      <ContactList data={users} />
    </div>
  );
};

export default Contacts;