import { get, ref } from 'firebase/database';
import React, { useEffect } from 'react'
import { database } from '../../utils/firebase';
import Send from "../../assets/Send.svg"
import { MessageState } from '../../store/msgSlice';
import TypingAnim from '../Home/TypingAnimation';
import AI from "../../assets/AI.svg"

interface TextAreaProps {
    user: MessageState;
}

const TextArea: React.FC<TextAreaProps> = ({user}) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [newConvo, setNewConvo] = React.useState<boolean>(true);
    console.log(loading);
    
    useEffect(() => {
        async function fetchConvo(id: string) {
            const convoRef = ref(database, `conversations/${id}`);
            const snapshot = await get(convoRef);

            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                setNewConvo(true);
            }
        }

        fetchConvo(user.id || "");
        return () => {
            setLoading(false);
        }
    }, [user]);

    return (
        <div className='relative w-full h-full flex flex-col bg-primary-100'>
            {newConvo && (
                <>
                    <h1 className='text-2xl p-4 font-bold text-center'>Start a new conversation</h1>
                    <div className='p-4 text-center'>
                        <p className='text-lg'>Talk about</p>
                        <TypingAnim words={['Work', 'School', 'Hobbies']}/>
                    </div>
                    <h2 className='text-center my-4'>Or use the AI tool to get a topic to break the ice</h2>
                    <img src={AI} alt="AI" className='w-16 h-16 mx-auto mb-4' />
                    <div className='absolute bottom-14 w-full p-4'>
                        <div className='flex gap-4'>
                            <textarea 
                                className="w-full bg-primary-200 outline-primary-700 resize-none p-2 border rounded-md"
                                placeholder={`Message ${user.name}`}
                            />
                            <button className="bg-primary-700 rounded-full text-white w-12 h-12 flex items-center justify-center">
                                <img src={Send} alt="send" className='w-6 h-6' />    
                            </button>    
                        </div>                    
                    </div>
                </>
            )}
        </div>
    )
}

export default TextArea