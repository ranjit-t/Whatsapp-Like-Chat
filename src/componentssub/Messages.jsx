import React, { useEffect, useContext, useState } from "react";
import { db, auth } from "../firebaseconfig/firebaseconfig";
import { Context } from "../Context";
import { doc, onSnapshot } from "firebase/firestore";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const { currentChatUserID, currentChatUserphotoURL } = useContext(Context);
  // currentChatUserName, currentChatUserphotoURL
  useEffect(() => {
    const combinedID =
      auth.currentUser.uid > currentChatUserID
        ? auth.currentUser.uid + currentChatUserID
        : currentChatUserID + auth.currentUser.uid;
    const unsub = onSnapshot(doc(db, "chats", combinedID), (doc) => {
      // console.log("Current data: ", doc.data());
      doc.exists() && setMessages(doc.data().messages);
      // console.log(messages.length);
    });

    return () => {
      unsub();
    };
  }, [currentChatUserID]);

  return (
    <div className="messages">
      {messages &&
        messages.map((m) => {
          return (
            <div
              className={
                m.user === auth.currentUser.uid ? "message owner" : "message"
              }
              key={Math.random()}
            >
              <img
                src={
                  m.user === auth.currentUser.uid
                    ? auth.currentUser.photoURL
                    : currentChatUserphotoURL
                }
                alt="avatar"
              />
              <div className="message-content">
                <p>{m.message}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
