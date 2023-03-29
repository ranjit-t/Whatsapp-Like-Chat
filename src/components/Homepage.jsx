import React, { useEffect, useState } from "react";
import Chat from "../componentssub/Chat";
import Users from "../componentssub/Users";

export default function Chatpage() {
  const [windowWidth, setwindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setwindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {windowWidth > 600 ? (
        <div className="home-page">
          <h1>Textapp</h1>
          <div className="chat-wrapper">
            <Users></Users>
            <Chat></Chat>
          </div>
        </div>
      ) : (
        <div className="mobile-home-page">
          <h1>Textapp</h1>
          <div className="chat-wrapper">
            <Users></Users>
          </div>
        </div>
      )}
    </div>
  );
}
