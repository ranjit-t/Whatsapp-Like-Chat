import React, { useState } from "react";

import { toast } from "react-toastify";
import { auth } from "../firebaseconfig/firebaseconfig";
import { signOut } from "firebase/auth";

export default function Navbar({ handleUser }) {
  const [profileClick, setProfileClick] = useState(false);
  return (
    <div
      className="navbar"
      onClick={() => {
        setProfileClick((prev) => !prev);
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        alt="avatar"
      />
      <p>⋮</p>
      {profileClick && (
        <div className="profile-click">
          <div
            onClick={async (e) => {
              e.preventDefault();
              setProfileClick((prev) => !prev); //Reversing back so that thr tab doesn't close
            }}
          >
            Profile
          </div>
          <div
            onClick={async (e) => {
              e.preventDefault();
              try {
                signOut(auth);
                toast.success("Logged Out, Come Back Soon!");
                handleUser();
              } catch (e) {
                toast.console.error("Oops! there is a problem");
              }
            }}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
