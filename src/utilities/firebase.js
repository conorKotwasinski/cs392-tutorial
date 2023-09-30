

import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

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


export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

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
