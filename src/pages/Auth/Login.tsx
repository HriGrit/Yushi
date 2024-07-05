import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { ref, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../../utils/firebase';

import Loader from '../../components/Loader';

import logo from '../../assets/Logo.webp';
import loginImage from '../../assets/Login2.webp';
import UploadImage from './UploadImage';

const Login: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [existingUser, setExistingUser] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      setLoading2(true);
      const storageRef = ref(storage, `images/${user?.uid}`);
      getDownloadURL(storageRef)
        .then((url) => {
          if (url) {
            setExistingUser(true);
          }
          setLoading2(false);
        })
        .catch(() => {
          setExistingUser(false);
          setLoading2(false);
        });
    }
  }, [user]);
  
  const handleLogin = async() => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      setUser(res);
    } catch (error) {
      toast.error('An error occurred while trying to login');
    }
  };
  // console.log(user);
  console.log(existingUser);
  
  
  return (
    <div className='h-screen bg-gray-200'>
      <div className="flex flex-col items-center justify-center h-screen my-auto">
        <Toaster />

        {loading ? 
          <Loader /> : 
          <div className="w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
            <div className="absolute top-4 left-4 xl:top-8 xl:right-8">
              <img src={logo} alt="Yushi Logo" className="w-40" />
            </div>
            {user ? (
              <div>
                {loading2 ? <div>
                  <Loader />
                </div>
                : <>
                  {!existingUser ? <UploadImage user={user} /> : <Navigate to='/dashboard' />}
                </>} 
              </div>
            ) : (
              <div className='text-center'>
                <h1 className="text-4xl font-bold text-primary-500 mb-2">Login Page</h1>
                <h2 className="text-2xl text-primary-500 mb-6">Welcome to Messenger Yushi</h2>
                
                <div className="mb-4 font-semibold">
                  <h3 className="text-xl mb-2 text-gray-900 dark:text-primary-300 text-pretty">Instantly establish communication with your loved ones using Messenger Yushi</h3>
                </div>

                <img src={loginImage} alt="Login Stock Img" className="mx-auto mb-4" />

                <div className="mb-8">
                  <h3 className="text-lg text-centertext-primary-300">Free from all distractions and enjoy the moment</h3>
                </div>

                <button 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in"
                  onClick={handleLogin}
                >
                  Login with Google
                </button>
              </div>
            )}
            </div>}
      </div>
    </div>
  );
};

export default Login;