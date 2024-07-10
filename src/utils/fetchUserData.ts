import { ref as dbref, get } from 'firebase/database';
import { database } from './firebase';

const fetchUserData = async (userId: string) => {
  try {
    const userRef = dbref(database, `contacts/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      return userData;
    } else {
      return null;
    }
  } catch (error: any) {
    return null;
  }
};

export default fetchUserData;