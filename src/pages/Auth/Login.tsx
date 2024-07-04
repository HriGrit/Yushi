import React, { useEffect, useState } from 'react';
import { getAuth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

import logo from '../../assets/Logo.webp';
import loginImage from '../../assets/Login2.webp';
import { Navigate } from 'react-router-dom';
import UploadImage from './UploadImage';
import { auth } from '../../utils/firebase';
import Loader from '../../components/Loader';

const Login: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

    return () => unsubscribe();
  }, []);

  // const checkUser = async () => {
    
  //   try {
  //     const result = await getRedirectResult(auth);
  //     if (result?.user) {
  //       console.log('Checking user');
  //       setUser(result.user);
  //     }
  //   } catch (error) {
  //     setError('An error occurred while trying to login');
  //   }
  // };

  // useEffect(() => {
  //   checkUser();
  // }, []);
  
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
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200 dark:bg-gray-800">
      <Toaster />
      <div className="absolute top-4 left-4 xl:top-8 xl:right-8">
        <img src={logo} alt="Yushi Logo" className="w-40" />
      </div>
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        {loading ? <Loader /> : 
          <>
            {user ? (
              <UploadImage user={user} />
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
          </>
        }
      </div>
    </div>
  );
};

export default Login;