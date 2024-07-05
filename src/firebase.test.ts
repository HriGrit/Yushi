// // tests/firebase.test.ts
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';
// import { getStorage } from 'firebase/storage';
// import { auth, db, storage } from '../src/utils/firebase';

// jest.mock('firebase/app', () => {
//   return {
//     initializeApp: jest.fn(),
//   };
// });

// jest.mock('firebase/auth', () => ({
//   getAuth: jest.fn(),
// }));

// jest.mock('firebase/database', () => ({
//   getDatabase: jest.fn(),
// }));

// jest.mock('firebase/storage', () => ({
//   getStorage: jest.fn(),
// }));

// describe('Firebase Configuration', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should initialize Firebase app with the correct configuration', () => {
//     const firebaseConfig = {
//       apiKey: process.env.VITE_FIREBASE_API_KEY,
//       authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
//       projectId: process.env.VITE_FIREBASE_PROJECT_ID,
//       storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
//       messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//       appId: process.env.VITE_FIREBASE_APP_ID,
//       measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
//     };

//     expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
//   });

//   it('should export Firebase auth module', () => {
//     expect(getAuth).toHaveBeenCalledWith(expect.anything());
//     expect(auth).toBeTruthy();
//   });

//   it('should export Firebase database module', () => {
//     expect(getDatabase).toHaveBeenCalledWith(expect.anything());
//     expect(db).toBeTruthy();
//   });

//   it('should export Firebase storage module', () => {
//     expect(getStorage).toHaveBeenCalledWith(expect.anything());
//     expect(storage).toBeTruthy();
//   });
// });