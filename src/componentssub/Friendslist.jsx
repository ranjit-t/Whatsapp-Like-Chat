import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebaseconfig/firebaseconfig";

export default function Friendslist() {
  const [chats, setChats] = useState([]);

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
      {Object.entries(chats).map((chat) => {
        return (
          <div className="friend" key={chat[1].userInfo.uid}>
            <img
              src={chat[1].userInfo.photoURL}
              alt="friend"
              className="friend-image"
            />
            <div>
              <p className="friend-name">{chat[1].userInfo.displayName}</p>
              <p className="friend-last-message">H</p>
            </div>
          </div>
        );
      })}
      {/* <div className="friend">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
          alt="friend"
          className="friend-image"
        />
        <div>
          <p className="friend-name">Dua</p>
          <p className="friend-last-message">
            Hey Yo, How is it going ? Hey Yo, How is it going ?
          </p>
        </div>
      </div>
      <div className="friend">
        <img
          src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
          alt="friend"
          className="friend-image"
        />
        <div>
          <p className="friend-name">Lorenzo</p>
          <p className="friend-last-message">Coming here ? or not tell me</p>
        </div>
      </div>
      <div className="friend">
        <img
          src="https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt="friend"
          className="friend-image"
        />
        <div>
          <p className="friend-name">Ram</p>
          <p className="friend-last-message">Yep, That is nice 😃</p>
        </div>
      </div> */}
    </div>
  );
}
