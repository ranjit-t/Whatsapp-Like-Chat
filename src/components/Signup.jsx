import React from "react";
import "../styles.scss";
import user from "../images/user.png";

export default function Signup() {
  return (
    <div className="sign-up">
      <form>
        <h2>Signup</h2>
        <input type="text" placeholder="Display Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="password" required />
        <input type="file" id="avatar" style={{ display: "none" }} />
        <label htmlFor="avatar">
          <img src={user} alt="avatar" className="avatar-alt" />
          <span>Add an Avatar</span>
        </label>
        <button>Signup</button>
      </form>
    </div>
  );
}
