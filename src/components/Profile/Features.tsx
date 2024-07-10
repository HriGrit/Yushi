import React from 'react'
import logo from '../../assets/Logo.webp'

interface FeaturesProps {
    showInput: boolean;
    setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
    showFriends: boolean;
    setFriends: React.Dispatch<React.SetStateAction<boolean>>;
}

const Features:React.FC<FeaturesProps> = ({showInput, setShowInput, showFriends, setFriends}) => {
    const[friendRequest, setFriendRequest] = React.useState(0);

    return (
        <div className="p-6 bg-white mx-auto mt-8 flex flex-col items-center">
            <img src={logo} alt="logo" className="w-40 mb-6" />
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Add Contacts</h1>
            <p className="text-gray-600 mb-4">Add a contact by email</p>
            <button 
                onClick={() => {
                    setShowInput(!showInput);
                    setFriends(false);
                }} 
                className="bg-blue-500 text-white py-2 px-4 w-full md:w-2/3 rounded-md hover:bg-blue-600"
            >
                {showInput ? 'Hide' : 'Add Contact'}
            </button>
            <div className={`flex ${friendRequest !== 0 ? "gap-4" : "gap-0" }`}>
                <h1 className="text-2xl font-semibold text-gray-800 my-4">Friend Request</h1>
                {friendRequest !== 0 ? <p className={`bg-primary-500 text-white p-1 rounded-full w-8 h-8 flex justify-center items-center my-auto`}>{friendRequest}</p>:null}
            </div>
            <button 
                onClick={() => {
                    setFriends(!showFriends);
                    setShowInput(false);
                }} 
                className="bg-blue-500 text-white py-2 px-4 w-full md:w-2/3 rounded-md hover:bg-blue-600"
            >
                {showFriends ? 'Hide' : 'Show Friend Request'}
            </button>
        </div>
    )
}

export default Features;