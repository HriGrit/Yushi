import React, { FC } from 'react';

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface NavbarProps {
        user: any;
}

const Navbar: FC<NavbarProps> = ({ user }) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [active, setActive] = React.useState<boolean>(false);
    const msg = useSelector((state: RootState) => state.msg);

    React.useEffect(() => {
        if (user) {
            setLoading(false);
        }
        if (msg.id !== null) {
            setActive(true);
        }
    }, [user]);
    
    return (
        <div className='bg-primary-700 h-16 flex items-center justify-between px-4 border-l-2 border-black'>
            <div className='flex items-center w-full'>
                {/* <h1 className='text-white text-lg font-bold'>Chats</h1> */}
                {(loading && active) && (
                    <>
                        <div className="w-8 h-8 rounded-full mr-4 bg-gray-100 animate-pulse" />
                        <div className='flex justify-between w-full'>
                            <h1 className='text-white text-lg font-bold bg-gray-100 animate-pulse'>{user?.name}</h1>
                            <h1 className='text-white text-sm my-auto bg-gray-100 animate-pulse'>{user?.email}</h1>
                        </div>
                    </>
                )}
                {(!loading && active) && (
                    <>
                        <img src={user?.profile || "../../assets/Logo.webp"} alt="profile pic" className="w-8 h-8 rounded-full mr-4" />
                        <div className='flex justify-between w-full'>
                            <h1 className='text-white text-lg font-bold'>{user?.name}</h1>
                            <h1 className='text-white text-sm my-auto'>{user?.email}</h1>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
