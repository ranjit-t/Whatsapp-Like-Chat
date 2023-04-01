import React from "react";
import Messages from "./Messages";
import NavbarChat from "./NavbarChat";
import Sendinput from "./Sendinput";

export default function Chat() {
  return (
    <div className="chat-conversations">
      <NavbarChat></NavbarChat>
      <Messages></Messages>
      <Sendinput></Sendinput>
    </div>
  );
}
