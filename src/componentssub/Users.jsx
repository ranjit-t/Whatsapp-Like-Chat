import React from "react";
import Friendslist from "./Friendslist";
import Navbar from "./Navbar";
import SearchUsers from "./SearchUsers";

export default function Users() {
  return (
    <div className="chat-users">
      <Navbar></Navbar>
      <SearchUsers></SearchUsers>
      <Friendslist></Friendslist>
    </div>
  );
}
