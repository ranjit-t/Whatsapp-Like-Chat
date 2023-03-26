import React from "react";
import Friendslist from "./Friendslist";
import Navbar from "./Navbar";

export default function Users() {
  return (
    <div className="chat-users">
      <Navbar></Navbar>
      <Friendslist></Friendslist>
    </div>
  );
}
