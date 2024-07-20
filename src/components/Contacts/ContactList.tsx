import { get, ref } from "firebase/database";
import { database } from "../../utils/firebase";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import dots from "../../assets/Dots.svg";

import { setId } from "../../store/msgSlice";
import { useAppDispatch } from '../../store/hooks';

interface ContactListProps {
    data: any;
}

const ContactList: React.FC<ContactListProps> = ({ data }) => {
    const keys = Object.keys(data ? data : {});
    const [contacts, setContacts] = useState<any[]>([]);
    const [openPopup, setOpenPopup] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    
    
    async function fetchContacts(keys: string[]) {
        try {
            const contacts: any = [];
            for (let i = 0; i < keys.length; i++) {
                const userRef = ref(database, `users/${keys[i]}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    userData.id = keys[i];
                    contacts.push(userData);
                }
            }
            setContacts(contacts);
        } catch (error: any) {
            toast.error("Failed to fetch contacts");
        }
    }

    useEffect(() => {
        fetchContacts(keys);
    }, [data]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as HTMLElement).closest('.popup-content')) {
                setOpenPopup(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    
    const handleClick = (e: any, id: string, flag: boolean) => {
        
        const valuesArray = Object.values(keys);
        const valueIndex = valuesArray.indexOf(id);
        
        const userData = contacts[valueIndex];

        if (!userData) return;
        dispatch(setId({ id: userData.id, email: userData.email, name: userData.username, profile: userData.profile_picture }));
        
        if (flag) return;

        e.stopPropagation();
        setOpenPopup(openPopup === id ? null : id);
    }

    return (
        <div>
            {contacts.map((contact: any) => (
                <div key={contact.id} className="flex items-center p-4 border-b border-gray-200 relative cursor-pointer" onClick={(e) => handleClick(e, contact.id, true)}>
                    <img src={contact.profile_picture} alt={contact.username} className="w-12 h-12 rounded-full" />
                    <div className="ml-4 flex justify-between gap-4 w-full">
                        <h2 className="text-lg font-semibold line-clamp-1">{contact.username}</h2>
                        <img
                            src={dots}
                            onClick={(e) => handleClick(e, contact.id, false)}
                            alt="dots"
                            className="w-4 h-4 cursor-pointer"
                        />
                    </div>
                    {openPopup === contact.id && (
                        <div className="popup-content absolute bg-primary-100 text-nowrap border border-gray-200 rounded-lg right-0 top-12">
                            <p className="text-sm cursor-pointer hover:bg-primary-400 p-4 pb-1 rounded-t-lg">View Profile</p>
                            <p className="text-sm cursor-pointer hover:bg-primary-400 p-4 pt-1 rounded-b-lg">Delete Chat</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default ContactList;