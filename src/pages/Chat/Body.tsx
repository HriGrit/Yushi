import { useSelector } from "react-redux";
import useAuthListener from "../../utils/useAuthListener"
import Contacts from "./Contacts"
import Conversation from "./Conversation"
import { RootState } from "../../store/store";

const Body = () => {
  useAuthListener();
  const user = useSelector((state: RootState) => state.user);
  
  return (
    <div className="flex h-screen">
        <div className="w-1/4">
            <Contacts user={user}/>
        </div>
        <div className="w-3/4">
            <Conversation user={user}/>
        </div>
    </div>
  )
}

export default Body