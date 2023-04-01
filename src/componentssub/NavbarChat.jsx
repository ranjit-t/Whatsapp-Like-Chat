import React, { useContext } from "react";
import call from "../images/call.png";
import videocall from "../images/video-call.png";

import { Context } from "../Context";

export default function NavbarChat() {
  const { currentChatUserName } = useContext(Context);
  return (
    <div className="navbar-chat">
      <p className="friend-name">
        {currentChatUserName ? currentChatUserName : ""}
      </p>
      <div className="calling-friend">
        <img src={call} alt="call" />
        <img src={videocall} alt="videocall" />
        <p>⋮</p>
      </div>
    </div>
  );
}
