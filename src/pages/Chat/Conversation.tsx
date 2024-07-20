import React, { useEffect } from 'react'
import { UserState } from '../../store/userSlice';

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Navbar from '../../components/Conversations/Navbar';
import TextArea from '../../components/Conversations/TextArea';

interface ConversationProps {
  user: UserState;
}

const Conversation: React.FC<ConversationProps> = () => {  

  const msg = useSelector((state: RootState) => state.msg);

  useEffect(() => {
    console.log(msg);
  }, [msg]);
  

  return (
    <div className='bg-primary-100 h-screen'>
        <Navbar user={msg ? msg : ""} />
        <TextArea user={msg || ""} />
    </div>
  )
}

export default Conversation