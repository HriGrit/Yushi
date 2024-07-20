// import React, { useState, useEffect } from 'react';
// import { UserState } from '../../store/userSlice';
// import toast, { Toaster } from 'react-hot-toast';
// import { ref, set, get, query, orderByChild, equalTo, push } from 'firebase/database';
// import { database } from '../../utils/firebase';
// import tick from "../../assets/Tick.svg"
// // import cross from "../../assets/Cross.svg"

// interface FeaturesProps {
//   showInput: boolean;
//   setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
//   showFriends: boolean;
//   setFriends: React.Dispatch<React.SetStateAction<boolean>>;
//   user: UserState;
// }

// interface Data {
//   userId: string;
//   username: string;
//   email: string;
//   profile_picture: string;
// }

// interface Uid {
//   user: string;
// }

// const Description: React.FC<FeaturesProps> = ({ user, showInput, showFriends }) => {
//   const [uids, setUids] = useState<Uid[]>([]);
//   const [userData, setUserData] = useState<Data[]>([]);
//   const [email, setEmail] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   function validateEmail(email: string): boolean {
//     return emailRegex.test(email);
//   }

//   async function findUser(email: string): Promise<string | null> {
//     try {
//       const usersRef = ref(database, 'users');
//       const emailQuery = query(usersRef, orderByChild('email'), equalTo(email));
//       const snapshot = await get(emailQuery);
      
//       if (snapshot.exists()) {
//         const userData = snapshot.val();
//         const userId = Object.keys(userData)[0];
//         return userId;
//       }
//     } catch (error) {
//       console.error('Error finding user:', error);
//     }
//     return null;
//   }

//   async function alreadyApplied(uid: string): Promise<boolean> {
//     try {
//       const contactsRef = ref(database, `requests/${user.id}`);
//       const snapshot = await get(contactsRef);
      
//       if (snapshot.exists()) {
//         const contacts = snapshot.val();    
//         const data = Object.values(contacts);
//         data.some((data: any) => data.userId === uid);
//         if (data) {
//           return true;
//         }
//       }
//     } catch (error) {
//       console.error('Error checking if request already sent:', error);
//     }
//     return false;
//   }

//   async function extractIds(userId: string): Promise<void> {
//     try {
//       const userRequestsRef = ref(database, `requests/${userId}`);
//       const snapshot = await get(userRequestsRef);
      
//       if (snapshot.exists()) {
//         const userRequestsData = snapshot.val();
//         setUids(Object.values(userRequestsData));
//       }
//     } catch (error) {
//       console.error('Error extracting ids:', error);
//     }
//   }

//   useEffect(() => {
//     if (showFriends) {
//       extractIds(user.id || '');
//     }
//   }, [showFriends]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const promises = uids.map(async uid => {
//         const snapshot = await get(ref(database, `users/${uid.user}`));
//         if (snapshot.exists()) {
//           return snapshot.val();
//         }
//       });

//       const results = await Promise.all(promises);
//       setUserData(results.filter(data => data !== null) as Data[]);
//     }

//     if (uids.length > 0) {
//       fetchUserData();
//     }
//   }, [uids]);

//   const handleAddContact = async () => {
//     if (!validateEmail(email)) {
//       toast.error('Invalid Email');
//       return;
//     } 
    
//     if (email === user.email) {
//       toast.error('Cannot add yourself');
//       return;
//     }
    
//     const userId = await findUser(email);
//     if (!userId) {
//       toast.error('User not found');
//       return;
//     }
    
//     const contactAlreadyAdded = await alreadyApplied(userId);
//     if (contactAlreadyAdded) {
//       toast.error('Request already sent');
//       return;
//     }
    
//     try {
//       const databaseRef = ref(database, `requests/${user.id}`);
//       const newRequestRef = push(databaseRef);
//       await set(newRequestRef, { user: userId });
//       toast.success('Request sent successfully');
//     } catch (error) {
//       toast.error('Error sending request');
//       console.error('Error sending request:', error);
//     }
//   }

//   const handleReset = () => {
//     setEmail('');
//   }

//   const handleAccept = async (userId: string) => {
//     try{
//       const docRef = ref(database, `requests/${user.id}`);
//       const getUser = query(docRef, equalTo(userId));
//       const snapshot = await get(getUser);
      
//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         const key = Object.keys(data)[0];
//         const userRef = ref(database, `requests/${user.id}/${key}`);
//         await set(userRef, null);
//         const friendRef = ref(database, `friends/${user.id}`);
//         await set(friendRef, { user: userId });
//         toast.success('Request accepted successfully');
//       }
//     }catch (error) {
//       toast.error('Error accepting request');
//       console.error('Error accepting request:', error);
//     }
//   }

//   const HandleAcceptRequest = (userId: string) =>{
//     // console.log(userId);
    
//     return () => handleAccept(userId);
//   };
  
//   return (
//     <div className="bg-primary-500 h-screen flex flex-col items-center p-8 md:p-0 md:justify-center text-white">
//       <div className="flex items-center gap-8 p-6 bg-primary-600 rounded-lg shadow-lg">
//         <Toaster />
//         <img 
//           src={user.profile || "https://via.placeholder.com/150"} 
//           alt={user.name || "User"} 
//           className="w-24 h-24 rounded-full border-4 border-white object-cover"
//         />
//         <p className="text-3xl font-semibold">Welcome, {user.name}</p>
//       </div>
//       {!showInput && !showFriends ? (
//         <div className="mt-8 p-6 bg-primary-700 rounded-lg shadow-md max-w-lg text-pretty">
//           <p className="text-lg mb-4">We invite you to this secure encrypted site created specifically for your needs.</p>
//           <p className="text-lg mb-4">Here you can chat with your friends, family, and colleagues. While keeping the clutter limited.</p>
//           <p className="text-lg">Start by adding a contact from the left side</p>
//         </div>
//       ) : showInput && !showFriends ? (
//         <div className="flex gap-4 items-center mt-4">
//           <input 
//             type="email" 
//             placeholder="Enter the Email" 
//             value={email} 
//             onChange={handleChange} 
//             className="p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border-blue-500"
//           />
//           <button 
//             onClick={handleAddContact} 
//             className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//           >
//             Add
//           </button>
//           <button 
//             onClick={handleReset} 
//             className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
//           >
//             Reset
//           </button>
//         </div>
//       ) : (
//         <div className='min-w-2/5'>
//           <h2 className="text-2xl mt-4">Friends:</h2>
//           {userData.length === 0 && <p className="text-lg">No friends found, its okay lets add them now</p>}
//           <div className='bg-white text-black p-2 rounded-xl'>
//             <ul>
//               {userData.map((friend, index) => (
//                 <div className='flex'>
//                   <li key={index} className="flex items-center gap-4 p-2">
//                     <img 
//                       src={friend?.profile_picture || "https://via.placeholder.com/50"} 
//                       alt={friend?.username} 
//                       className="w-12 h-12 rounded-full border-2 border-white object-cover"
//                     />
//                     <div>
//                       <p className="text-lg font-bold text-ellipsis overflow-hidden text-wrap">{friend.username}</p>
//                       <p className="text-sm text-gray-600">{friend.email}</p>
//                     </div>
//                   </li>
//                   <div className='flex gap-3 my-auto'>
//                   <img src={tick} alt="Tick" className="w-6 h-6" onClick={HandleAcceptRequest(friend.username)} />
//                   </div>
//                 </div>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Description;
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { UserState } from '../../store/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import { ref, set, get, query, orderByChild, equalTo, push } from 'firebase/database';
import { database } from '../../utils/firebase';
import tick from "../../assets/Tick.svg"
import cross from "../../assets/Cross.svg"
import { useNavigate } from 'react-router-dom';

interface FeaturesProps {
  showInput: boolean;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  showFriends: boolean;
  setFriends: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserState;
}

interface Data {
  userId: string;
  username: string;
  email: string;
  profile_picture: string;
}

interface Uid {
  user: string;
}

const Description: React.FC<FeaturesProps> = ({ user, showInput, showFriends }) => {
  const [uids, setUids] = useState<Uid[]>([]);
  const [userData, setUserData] = useState<Data[]>([]);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function validateEmail(email: string): boolean {
    return emailRegex.test(email);
  }

  async function findUser(email: string): Promise<string | null> {
    try {
      const usersRef = ref(database, 'users');
      const emailQuery = query(usersRef, orderByChild('email'), equalTo(email));
      const snapshot = await get(emailQuery);
      
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userId = Object.keys(userData)[0];
        return userId;
      }
    } catch (error) {
      console.error('Error finding user:', error);
    }
    return null;
  }

  async function alreadyApplied(uid: string): Promise<boolean> {
    try {
      const contactsRef = ref(database, `requests/${user.id}`);
      const snapshot = await get(contactsRef);
      
      if (snapshot.exists()) {
        const contacts = snapshot.val();    
        const data = Object.values(contacts);
        return data.some((data: any) => data.userId === uid);
      }
    } catch (error) {
      console.error('Error checking if request already sent:', error);
    }
    return false;
  }

  const extractIds = useCallback(async (userId: string): Promise<void> => {
    try {
      setIsLoading(true);
      const userRequestsRef = ref(database, `requests/${userId}`);
      const snapshot = await get(userRequestsRef);
      
      if (snapshot.exists()) {
        const userRequestsData = snapshot.val();
        setUids(Object.values(userRequestsData));
      } else {
        setUids([]);
      }
    } catch (error) {
      console.error('Error extracting ids:', error);
      toast.error('Failed to load friend requests');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFriends(uid: string) {
      try {
        const friendsRef = ref(database, `friends/${uid}`);
        const snapshot = await get(friendsRef);
        // console.log(snapshot.val());
        if (snapshot.exists()) {
          navigate('/chats');
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    }

    return () => {
      fetchFriends(user.id || '');
    }
  }, [isLoading]);
  
  useEffect(() => {
    if (showFriends) {
      extractIds(user.id || '');
    }
  }, [showFriends, user.id, extractIds]);

  useEffect(() => {
    const fetchUserData = async () => {
      const promises = uids.map(async uid => {
        const snapshot = await get(ref(database, `users/${uid.user}`));
        if (snapshot.exists()) {
          return { ...snapshot.val(), userId: uid.user };
        }
      });

      const results = await Promise.all(promises);
      setUserData(results.filter(data => data !== null) as Data[]);
    }

    if (uids.length > 0) {
      fetchUserData();
    }
  }, [uids]);

  const handleAddContact = async () => {
    if (!validateEmail(email)) {
      toast.error('Invalid Email');
      return;
    } 
    
    if (email === user.email) {
      toast.error('Cannot add yourself');
      return;
    }
    
    const userId = await findUser(email);
    if (!userId) {
      toast.error('User not found');
      return;
    }
    
    const contactAlreadyAdded = await alreadyApplied(userId);
    if (contactAlreadyAdded) {
      toast.error('Request already sent');
      return;
    }
    
    try {
      const databaseRef = ref(database, `requests/${userId}`);
      const newRequestRef = push(databaseRef);
      await set(newRequestRef, { user: user.id });
      toast.success('Request sent successfully');
      handleReset();
    } catch (error) {
      toast.error('Error sending request');
      console.error('Error sending request:', error);
    }
  }

  const handleReset = () => {
    setEmail('');
  }

  const handleAccept = async (userId: string) => {
    try {
      const docRef = ref(database, `requests/${user.id}`);
      const snapshot = await get(docRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const key = Object.keys(data).find(key => data[key].user === userId);
        
        if (key) {
          await set(ref(database, `requests/${user.id}/${key}`), null);
          
          await set(ref(database, `friends/${user.id}/${userId}`), true);
          await set(ref(database, `friends/${userId}/${user.id}`), true);
          
          toast.success('Request accepted successfully');
          extractIds(user.id || '');
        }
      }
    } catch (error) {
      toast.error('Error accepting request');
      console.error('Error accepting request:', error);
    }
  };

  const handleReject = async (userId: string) => {
    try {
      const docRef = ref(database, `requests/${user.id}`);
      const snapshot = await get(docRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const key = Object.keys(data).find(key => data[key].user === userId);
        
        if (key) {
          await set(ref(database, `requests/${user.id}/${key}`), null);
          toast.success('Request rejected');
          extractIds(user.id || '');
        }
      }
    } catch (error) {
      toast.error('Error rejecting request');
      console.error('Error rejecting request:', error);
    }
  };

  const memoizedUserData = useMemo(() => {
    return userData.map(friend => (
      <div key={friend.userId} className='flex'>
        <li className="flex items-center gap-4 p-2">
          <img 
            src={friend?.profile_picture || "https://via.placeholder.com/50"} 
            alt={friend?.username} 
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
          />
          <div>
            <p className="text-lg font-bold text-ellipsis overflow-hidden text-wrap">{friend.username}</p>
            <p className="text-sm text-gray-600">{friend.email}</p>
          </div>
        </li>
        <div className='flex gap-3 my-auto'>
          <img src={tick} alt="Accept" className="w-6 h-6 cursor-pointer" onClick={() => handleAccept(friend.userId)} />
          <img src={cross} alt="Reject" className="w-6 h-6 cursor-pointer" onClick={() => handleReject(friend.userId)} />
        </div>
      </div>
    ));
  }, [userData, handleAccept, handleReject]);
  
  return (
    <div className="bg-primary-500 h-screen flex flex-col items-center p-8 md:p-0 md:justify-center text-white">
      <div className="flex items-center gap-8 p-6 bg-primary-600 rounded-lg shadow-lg">
        <Toaster />
        <img 
          src={user.profile || "https://via.placeholder.com/150"} 
          alt={user.name || "User"} 
          className="w-24 h-24 rounded-full border-4 border-white object-cover"
        />
        <p className="text-3xl font-semibold">Welcome, {user.name}</p>
      </div>
      {!showInput && !showFriends ? (
        <div className="mt-8 p-6 bg-primary-700 rounded-lg shadow-md max-w-lg text-pretty">
          <p className="text-lg mb-4">We invite you to this secure encrypted site created specifically for your needs.</p>
          <p className="text-lg mb-4">Here you can chat with your friends, family, and colleagues. While keeping the clutter limited.</p>
          <p className="text-lg">Start by adding a contact from the left side</p>
        </div>
      ) : showInput && !showFriends ? (
        <div className="flex gap-4 items-center mt-4">
          <input 
            type="email" 
            placeholder="Enter the Email" 
            value={email} 
            onChange={handleChange} 
            className="p-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={handleAddContact} 
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add
          </button>
          <button 
            onClick={handleReset} 
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      ) : (
        <div className='min-w-2/5'>
          <h2 className="text-2xl mt-4">Friend Requests:</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : userData.length === 0 ? (
            <p className="text-lg">No friend requests found. Why not add some friends?</p>
          ) : (
            <div className='bg-white text-black p-2 rounded-xl'>
              <ul>
                {memoizedUserData}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Description;