

import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { connectDatabaseEmulator, getDatabase, onValue, ref, update } from 'firebase/database';
import { connectAuthEmulator, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {

    apiKey: "AIzaSyBgjXXo4Z3p5b6sHysO34b5zrvmw39gJAY",
  
    authDomain: "cs392-tutorial.firebaseapp.com",
  
    databaseURL: "https://cs392-tutorial-default-rtdb.firebaseio.com",
  
    projectId: "cs392-tutorial",
  
    storageBucket: "cs392-tutorial.appspot.com",
  
    messagingSenderId: "8957555862",
  
    appId: "1:8957555862:web:ad38a1d3e01bebc7b87eb7"
  
  };
  
  


const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase);


export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};
if (!globalThis.EMULATION && import.meta.env.MODE === 'development') {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);

  signInWithGoogle(auth, GoogleAuthProvider.credential(
    '{"sub": "qEvli4msW0eDz5mSVO6j3W7i8w1k", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
  ));
  
  // set flag to avoid connecting twice, e.g., because of an editor hot-reload
  globalThis.EMULATION = true;
}
const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  
  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ), []);

  return [user];
};
export const useDbData = (path) => {
const [data, setData] = useState();
const [error, setError] = useState(null);

useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
    setData( snapshot.val() );
    }, (error) => {
    setError(error);
    })
), [ path ]);

return [ data, error ];
};

const makeResult = (error) => {
const timestamp = Date.now();
const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
const [result, setResult] = useState();
const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
}, [database, path]);

return [updateData, result];
};
