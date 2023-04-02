import React, { useEffect, useState, useContext } from "react";
import call from "../images/call.png";
import videocall from "../images/video-call.png";

import { Context } from "../Context";

export default function NavbarChat() {
  const { currentChatUserName, setMobileChatSelect } = useContext(Context);
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setwindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <div className="navbar-chat">
      <p className="friend-name">
        {currentChatUserName ? currentChatUserName : "Textapp Admin"}
      </p>
      <div className="calling-friend">
        <img src={call} alt="call" />
        <img src={videocall} alt="videocall" />
        {windowWidth > 600 ? (
          <p>⋮</p>
        ) : (
          <p
            onClick={() => {
              setMobileChatSelect(false);
            }}
          >
            ←
          </p>
        )}
      </div>
    </div>
  );
}
