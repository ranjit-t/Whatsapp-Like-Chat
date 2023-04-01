import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import { db, auth } from "../firebaseconfig/firebaseconfig";
import { Context } from "../Context";

export default function Friendslist() {
  const [chats, setChats] = useState([]);

  const {
    setCurrentChatUserName,
    setCurrentChatUserID,
    setCurrentChatUserphotoURL,
    setMobileChatSelect,
  } = useContext(Context);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userChats", auth.currentUser.uid),
      (doc) => {
        // console.log("Current data: ", doc.data());
        setChats(doc.data());
      }
    );
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="friends-list">
      {chats !== undefined &&
        Object.entries(chats)
          .sort((a, b) => b[1].date - a[1].date)
          .map((chat) => {
            return (
              <div
                className="friend"
                key={Math.random()}
                onClick={() => {
                  //sending current clicked friend to Chat conversation
                  setCurrentChatUserphotoURL(chat[1].userInfo.photoURL);
                  setCurrentChatUserName(chat[1].userInfo.displayName);
                  setCurrentChatUserID(chat[1].userInfo.uid);
                  setMobileChatSelect(true);
                }}
              >
                <img
                  src={chat[1].userInfo.photoURL}
                  alt="friend"
                  className="friend-image"
                />
                <div>
                  <p className="friend-name">{chat[1].userInfo.displayName}</p>
                  <p className="friend-last-message">
                    {chat[1].userInfo.lastMessage}
                  </p>
                </div>
              </div>
            );
          })}
    </div>
  );
}
