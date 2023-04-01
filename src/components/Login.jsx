import React, { useState } from "react";

import { auth } from "../firebaseconfig/firebaseconfig";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { toast } from "react-toastify";

export default function Signup({ handleAccount }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  return (
    <div className="sign-up">
      <h1 style={{ marginTop: "-50px" }}>Textapp</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await signInWithEmailAndPassword(auth, Email, Password);
            toast.success("Welcome Back");
          } catch (e) {
            toast.error(e.message.slice(10, 100));
          }
        }}
      >
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          required
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={Password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input type="file" id="avatar" style={{ display: "none" }} />
        <button>Login</button>
      </form>

      <p>Don't Have An Account</p>
      <button
        onClick={() => {
          handleAccount();
        }}
      >
        Signup
      </button>
      <button onClick={() => {}}>Demo without Login</button>
    </div>
  );
}
