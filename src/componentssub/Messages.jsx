import React, { useEffect, useContext, useState, useRef } from "react";
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

  //to scroll down
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the messages container
    messagesContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // useEffect(() => {
  //   console.log(messages[0].imgURL.length);
  // }, [messages]);

  return (
    <div className="messages">
      {messages &&
        messages.map((m) => {
          return (
            <div key={Math.random()}>
              {m.imgURL !== "" && (
                <div
                  className={
                    m.user === auth.currentUser.uid
                      ? "message owner"
                      : "message"
                  }
                >
                  <img
                    src={
                      m.user === auth.currentUser.uid
                        ? auth.currentUser.photoURL
                        : currentChatUserphotoURL
                    }
                    alt="avatar"
                  />
                  <div className="photo-content">
                    <img src={m.imgURL} alt="sent" />
                  </div>

                  {/* <div ref={messagesContainerRef}></div> */}
                </div>
              )}
              {m.message && (
                <div
                  className={
                    m.user === auth.currentUser.uid
                      ? "message owner"
                      : "message"
                  }
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

                  {/* <div ref={messagesContainerRef}></div> */}
                </div>
              )}
            </div>
          );
        })}
      <div ref={messagesContainerRef}></div>
    </div>
  );
}
