import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign Up");

  return (
    <div className='login-popup'>
      <form className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img  src={assets.cross_icon} alt="close" onClick={() => setShowLogin(false)} />

        </div>

        <div className="login-popup-input">
          {currentState === "Login" ? null : <input type="text" placeholder='Your Name' required />}
          <input type="email" placeholder='Your email' required />
          <input type="password" placeholder='Enter Password' required />
        </div>

        <button>{currentState === "Sign Up" ? "Create account" : "Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the T&C</p>
        </div>

        {currentState === "Login" ? (
          <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
