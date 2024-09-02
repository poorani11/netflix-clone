import React, { useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import './App.css';
import LoginScreen from './screens/LoginScreen';
import { auth } from './app/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }));
      } else {
        //Logged out
        dispatch(logout);
      }
    });
    return unsubscribe;
  }, [])
  return (
    <div className="App">
      {!user ? (<LoginScreen />) : (
        <Router>
          <Routes>
            <Route path="/" element={<HomeScreen />} />

          </Routes>
        </Router>
      )}

    </div>
  );
}

export default App;
