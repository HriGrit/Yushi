import React from 'react'
import { UserState } from '../../store/userSlice';

interface ConversationProps {
  user: UserState;
}

const Conversation: React.FC<ConversationProps> = ({user}) => {
  console.log(user);
  
  return (
    <div className='bg-primary-100 h-screen'>
        hi
    </div>
  )
}

export default Conversation