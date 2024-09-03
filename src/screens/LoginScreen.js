import React from 'react';
import { useState } from 'react';
import "./LoginScreen.css"
import SignUpScreen from './SignUpScreen';

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className='loginScreen'>
      <div className="loginScreen__background">
        <img className="loginScreen__logo" src="https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png" alt="" />
        <button className="loginScreen__button" onClick={() => setSignIn(true)}>Sign In</button>
        <div className="loginScreen__gradient" />
      </div>
      <div className="loginScreen__body">
        {
          signIn ? (
            <SignUpScreen />
          ) : (
            <>
              <h1>Unlimited films, Tv Programmes and more.</h1>
              <h2>Watch anywhere. Cancel at any time.</h2>
              <h3>Ready to watch. Enter your email to create or restart your membership.</h3>
              <div className="loginScreen__input">
                <form>
                  <input type="email" placeholder="Email Address" />
                  <button className="loginScreen__getStarted" onClick={() => setSignIn(true)}>Get Started</button>
                </form>
              </div>
            </>
          )
        }

      </div>
    </div>
  )
}

export default LoginScreen;
