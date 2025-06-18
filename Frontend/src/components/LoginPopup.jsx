import React, { useState } from "react";
import "./LoginPopup.css";


const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");

  return (
    <div className="login-popup">
      <form className="login-popup-container">

        <div className="login-popup-title">
          <h2>{currState}</h2>
          <button onClick={() => setShowLogin(false)} type="button">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="close-icon"
            >
              <path d="M18 6L6 18M6 6l12 12" stroke="black" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Input Fields */}
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input type="text" placeholder="Enter your name" required />
          )}
          <input type="email" placeholder="Enter your email" required />
          <input type="password" placeholder="Password" required />
        </div>

        {/* Action Button */}
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        {/* Terms and Conditions */}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By continuing, I agree to the terms of use & privacy policy
          </p>
        </div>

        {/* Switch between Login and Sign Up */}
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
