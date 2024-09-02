import React, { useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom";
import './App.css';
import LoginScreen from './screens/LoginScreen';
import { auth } from './app/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const user = null;
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log(userAuth);
      } else {
        //Logged out
      }
    });
    return unsubscribe;
  }, [])
  return (
    <div className="App">
      {!user ? (<LoginScreen />) : (
        <Router>
          <Routes>
            <Route exact path="/">
              <HomeScreen />
            </Route>
          </Routes>
        </Router>
      )}

    </div>
  );
}

export default App;
