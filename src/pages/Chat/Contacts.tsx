import React from 'react';
import Navbar from '../../components/Contacts/Navbar';
import { UserState } from '../../store/userSlice';
import ContactList from '../../components/Contacts/ContactList';
import { database } from '../../utils/firebase';
import { get, ref } from 'firebase/database';

interface ContactsProps {
  user: UserState;
}

const Contacts: React.FC<ContactsProps> = ({ user }) => {

  const fetchFriends = async(id: string) => {
    try{
      const userRequestsRef = ref(database, `requests/${id}`);
      const snapshot = await get(userRequestsRef);
      
      if (snapshot.exists()) {
        const userRequestsData = snapshot.val();
        console.log(userRequestsData);
        
      }
    }catch (error){

    }
  } 

  return (
    <div className='bg-primary-500 h-screen'>
      <Navbar />
      <ContactList data={"hi"} />
    </div>
  );
};

export default Contacts;