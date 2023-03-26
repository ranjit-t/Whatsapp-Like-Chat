import React from "react";
import "../styles.scss";
import user from "../images/user.png";

export default function Signup({ handleUser, handleAccount }) {
  return (
    <div className="sign-up">
      <form>
        <h1>Signup</h1>
        <input type="text" placeholder="Display Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="file" id="avatar" style={{ display: "none" }} />
        <label htmlFor="avatar">
          <img src={user} alt="avatar" className="avatar-alt" />
          <span>Add an Avatar</span>
        </label>
        <button>Signup</button>
      </form>
      <p>Already Have An Account ?</p>
      <button
        onClick={() => {
          handleAccount();
        }}
      >
        Login
      </button>
    </div>
  );
}
