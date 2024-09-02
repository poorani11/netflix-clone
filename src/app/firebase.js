import firebase from "./firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyB3wT3b2AjmFO7mTscAYwwP36y3tsNtcu0",
    authDomain: "netflix-clone-poorni.firebaseapp.com",
    databaseURL: "https://netflix-clone-poorni-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "netflix-clone-poorni",
    storageBucket: "netflix-clone-poorni.appspot.com",
    messagingSenderId: "157843041797",
    appId: "1:157843041797:web:d77d11591c46305dc5f66c"
};

const defaultApp = initializeApp(firebaseConfig);
const defaultAuth = getAuth(defaultApp);
const defaultFirestore = getFirestore(defaultApp);

export {
    defaultApp as app, // these are class instances
    defaultAuth as auth,
    defaultFirestore as firestore // i.e. you can't use firestore.doc(), import it using `import { doc } from "firebase/firestore"` and then call `doc(firestore, ...)`
}

