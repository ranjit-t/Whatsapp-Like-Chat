import React, { useEffect, useContext, useState, useRef } from "react";
import { db, auth } from "../firebaseconfig/firebaseconfig";
import { Context } from "../Context";
import { doc, onSnapshot } from "firebase/firestore";

export default function Messages() {
  //if the images is broken
  const handleImageError = (event) => {
    event.target.style.visibility = "hidden";
  };

  const [messages, setMessages] = useState([]);
  const { currentChatUserID, currentChatUserphotoURL } = useContext(Context);
  useEffect(() => {
    const combinedID =
      auth.currentUser.uid > currentChatUserID
        ? auth.currentUser.uid + currentChatUserID
        : currentChatUserID + auth.currentUser.uid;
    const unsub = onSnapshot(doc(db, "chats", combinedID), (doc) => {
      // console.log("Current data: ", doc.data());
      doc.exists() && setMessages(doc.data().messages);
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

  const instructions = [
    "Hello, Welcome to Texapp!",
    "These are the instructions to use the App",
    "You can find new users by searching their email address",
    "Then open a new conversation by clicking on their profile when searched",
    "amailtoranjith@gmail.com ",
    "is a demo user to explore our Textapp",
    "Enjoy Texting!",
  ];

  return (
    <div className="messages">
      {!currentChatUserID &&
        instructions.map((instr) => {
          return (
            <div className="message" key={Math.random()}>
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="avatar"
              />
              <div className="message-content">
                <p>{instr}</p>
              </div>
            </div>
          );
        })}
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
                    <img
                      src={m.imgURL}
                      alt="Sent a file"
                      onError={handleImageError}
                    />
                    <a
                      href={m.imgURL}
                      className="download-link"
                      target="_blank"
                      rel="noreferrer"
                      download
                    >
                      Download File
                    </a>
                  </div>
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
                </div>
              )}
            </div>
          );
        })}
      <div ref={messagesContainerRef}></div>
    </div>
  );
}
