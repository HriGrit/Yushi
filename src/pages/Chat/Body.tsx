import { useSelector } from "react-redux";
import useAuthListener from "../../utils/useAuthListener"
import Contacts from "./Contacts"
import Conversation from "./Conversation"
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import fetchUserData from '../../utils/fetchUserData';
import { Navigate } from 'react-router-dom';

const Body = () => {
  useAuthListener();
  const user = useSelector((state: RootState) => state.user);

  const [userData, setUserData] = useState<any>(null);
  let fetched = false;

  useEffect(() => {
    const getUserData = async () => {
      if (user.id) {
        const data = await fetchUserData(user.id);
        setUserData(data);
        fetched=true;
      }
    };
    getUserData();
  }, [user.id]);
  console.log(fetched);
  
  return (
    <div className="flex h-screen">
        {userData?.length === 0 && fetched ? (
          <Navigate to="/profile" />
        ) : (
          <>
            <div className="w-1/4">
                <Contacts user={user}/>
            </div>
            <div className="w-3/4">
                <Conversation user={user}/>
            </div>
          </>
        )}
    </div>
  )
}

export default Body