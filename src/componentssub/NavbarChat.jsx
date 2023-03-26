import React from "react";
import call from "../images/call.png";
import videocall from "../images/video-call.png";

export default function NavbarChat() {
  return (
    <div className="navbar-chat">
      <p className="friend-name">Dua</p>
      <div className="calling-friend">
        <img src={call} alt="call" />
        <img src={videocall} alt="videocall" />
        <p>⋮</p>
      </div>
    </div>
  );
}
