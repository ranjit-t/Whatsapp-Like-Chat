import React from "react";
import "../styles.scss";

export default function Signup({ handleUser, handleAccount }) {
  return (
    <div className="sign-up">
      <form>
        <h1>Login</h1>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="file" id="avatar" style={{ display: "none" }} />
        <button>Signup</button>
      </form>

      <p>Don't Have An Account</p>
      <button
        onClick={() => {
          handleAccount();
        }}
      >
        Signup
      </button>
      <button
        onClick={() => {
          handleUser();
        }}
      >
        Login Done
      </button>
    </div>
  );
}
