import React, { useState } from "react";

import { toast } from "react-toastify";
import { auth } from "../firebaseconfig/firebaseconfig";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [profileClick, setProfileClick] = useState(false);
  // console.log(auth.currentUser.photoURL);
  return (
    <div
      className="navbar"
      onClick={() => {
        setProfileClick((prev) => !prev);
      }}
    >
      <img src={auth.currentUser.photoURL} alt="avatar" />
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
