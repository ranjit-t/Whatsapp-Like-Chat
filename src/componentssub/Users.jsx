import React from "react";
import Friendslist from "./Friendslist";
import Navbar from "./Navbar";

export default function Users({ handleUser }) {
  return (
    <div className="chat-users">
      <Navbar handleUser={handleUser}></Navbar>
      <Friendslist></Friendslist>
    </div>
  );
}
