import React from "react";
import { useSelector } from "react-redux";
import useAuthListener from "../../utils/useAuthListener"
import { RootState } from "../../store/store";
import Features from "../../components/Profile/Features";
import Description from "../../components/Profile/Description";

const ProfileBody = () => {
  useAuthListener();
  const user = useSelector((state: RootState) => state.user);
  const [showInput, setShowInput] = React.useState(false);
  const [showFriends, setFriends] = React.useState(false);
  
  return (
    <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/4">
          <Features showFriends={showFriends} setFriends={setFriends} showInput={showInput} setShowInput={setShowInput}  />
        </div>
        <div className="w-full md:w-3/4">
            <Description showFriends={showFriends} setFriends={setFriends} showInput={showInput} setShowInput={setShowInput} user={user}/>
        </div>
    </div>
  )
}

export default ProfileBody;