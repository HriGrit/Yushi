import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Contacts/Navbar';
import { UserState } from '../../store/userSlice';
import fetchUserData from '../../utils/fetchUserData';
import AddContact from '../../components/Contacts/AddContact';
import ContactList from '../../components/Contacts/ContactList';

interface ContactsProps {
  user: UserState;
}

const Contacts: React.FC<ContactsProps> = ({ user }) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const getUserData = async () => {
      if (user.id) {
        const data = await fetchUserData(user.id);
        setUserData(data);
      }
    };
    getUserData();
  }, [user.id]);

  console.log(userData === null);

  return (
    <div className='bg-primary-500 h-screen'>
      <Navbar />
      {userData === null ? (
        <AddContact />
      ) : (
        <ContactList data={userData} />
      )}
    </div>
  );
};

export default Contacts;