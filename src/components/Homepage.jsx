import React from "react";
import Chat from "../componentssub/Chat";
import Users from "../componentssub/Users";

export default function Chatpage() {
  return (
    <div className="home-page">
      <h1>Textapp</h1>
      <div className="chat-wrapper">
        <Users></Users>
        <Chat></Chat>
      </div>
    </div>
  );
}
