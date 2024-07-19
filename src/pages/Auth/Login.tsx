import React, { useEffect, useState, lazy } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { Navigate } from 'react-router-dom';
import { database } from '../../utils/firebase';
import { ref as docRef, get } from 'firebase/database';

import logo from '../../assets/Logo.webp';
import loginImage from '../../assets/Login2.webp';
import Loader from '../../components/Loader';

const UploadImage = lazy(() => import('./UploadImage'));

const Login: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [existingUser, setExistingUser] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingImage, setLoadingImage] = useState<boolean>(false);

    // const navigate = useNavigate();
    // console.log(navigate);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                checkIfUserHasProfileImage(user);
            } else {
                setUser(null);
                setLoading(false);
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const checkIfUserHasProfileImage = async (user: any) => {
        setLoadingImage(true);
        try {
            const contactRef = docRef(database, `contacts/${user?.uid}`);
            get(contactRef).then((snapshot) => {
                if (snapshot.exists())
                    setExistingUser(true);
                else
                    setExistingUser(false);
            });
        } catch (error) {
            setExistingUser(false);
        } finally {
            setLoadingImage(false);
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
            setUser(res.user);
            checkIfUserHasProfileImage(res.user);
        } catch (error) {
            toast.error('An error occurred while trying to login');
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="h-screen bg-gray-200">
            <div className="flex flex-col items-center justify-center h-screen my-auto">
                <Toaster />
                <div className="w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                    <div className="absolute top-4 left-4 xl:top-8 xl:right-8">
                        <img src={logo} alt="Yushi Logo" className="w-40" />
                    </div>
                    {user ? (
                        loadingImage ? (
                            <Loader />
                        ) : (
                            existingUser ? (
                                <Navigate to="/dashboard" />
                            ) : (
                                <React.Suspense fallback={<Loader />}>
                                    <UploadImage user={user} />
                                </React.Suspense>
                            )
                        )
                    ) : (
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-primary-500 mb-2">Login Page</h1>
                            <h2 className="text-2xl text-primary-500 mb-6">Welcome to Messenger Yushi</h2>
                            <div className="mb-4 font-semibold">
                                <h3 className="text-xl mb-2 text-gray-900 dark:text-primary-300">
                                    Instantly establish communication with your loved ones using Messenger Yushi
                                </h3>
                            </div>
                            <img src={loginImage} alt="Login Stock Img" className="mx-auto mb-4" />
                            <div className="mb-8">
                                <h3 className="text-lg text-center text-primary-300">
                                    Free from all distractions and enjoy the moment
                                </h3>
                            </div>
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in"
                                onClick={handleLogin}
                            >
                                Login with Google
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;