import { ref as dbref, get } from 'firebase/database';
import { database } from './firebase';

const fetchUserData = async (userId: string) => {
  try {
    const userRef = dbref(database, `contacts/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      console.log('User data fetched:', userData);
      return userData;
    } else {
    //   console.log('No data available');
      return null;
    }
  } catch (error: any) {
    // console.error('Error fetching user data:', error);
    return null;
  }
};

export default fetchUserData;