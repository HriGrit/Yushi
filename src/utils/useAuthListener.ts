import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { auth, database } from './firebase';
import { setUser } from '../store/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { ref as dbref, get } from 'firebase/database';

const useAuthListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleAuthChange = async (user: any) => {
      if (user) {
        const userId = user.uid;
        const usernameRef = dbref(database, `users/${userId}`);
        const snapshot = await get(usernameRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          dispatch(setUser({ id: userId, email: user.email, name: userData.username, profile: userData.profile_picture }));
          return;
        }
      } else {
        dispatch(setUser({ id: null, email: null, name: null, profile: null }));
      }
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);

    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuthListener;