// AuthStatus.tsx
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';

const Land: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (user) {
    return <div>Signed in as {user.email}</div>;
  }

  return <div>Not signed in</div>;
};

export default Land;