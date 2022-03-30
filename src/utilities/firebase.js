import { useState, useEffect} from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyB0PU4k1U80LIsa2sRgXNPdh4MbP6zQSeA",
    authDomain: "cs394reacttutorial-eb176.firebaseapp.com",
    databaseURL: "https://cs394reacttutorial-eb176-default-rtdb.firebaseio.com",
    projectId: "cs394reacttutorial-eb176",
    storageBucket: "cs394reacttutorial-eb176.appspot.com",
    messagingSenderId: "373890989957",
    appId: "1:373890989957:web:d4bdb8f6e27f5a1a244eec"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase)

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };