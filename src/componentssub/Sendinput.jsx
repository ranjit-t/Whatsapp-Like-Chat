import React, { useContext, useState } from "react";

import sendimage from "../images/sendimage.png";
import senddocument from "../images/senddocument.png";
import sendbutton from "../images/sendbutton.png";

import { db, auth } from "../firebaseconfig/firebaseconfig";
import { Context } from "../Context";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export default function Sendinput() {
  const { currentChatUserID, currentChatUserName, currentChatUserphotoURL } =
    useContext(Context);

  const [sendingText, setSendingText] = useState("");
  // const [sendingIMG, setSendingIMG] = useState(null);
  // const [sendingImgURL, setSendingImgURL] = useState("");

  const combinedID =
    auth.currentUser.uid > currentChatUserID
      ? auth.currentUser.uid + currentChatUserID
      : currentChatUserID + auth.currentUser.uid;
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  const handleSendMessage = async () => {
    try {
      await updateDoc(doc(db, "chats", combinedID), {
        messages: arrayUnion({
          user: auth.currentUser.uid,
          message: sendingText,
          // imgURL: sendingImgURL,
          imgURL: "",
          time: Timestamp.now(),
        }),
      });
      setSendingText("");
      await updateDoc(doc(db, "userChats", auth.currentUser.uid), {
        [combinedID + ".userInfo"]: {
          uid: currentChatUserID,
          displayName: currentChatUserName,
          photoURL: currentChatUserphotoURL,
          lastMessage: sendingText,
        },
        [combinedID + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", currentChatUserID), {
        [combinedID + ".userInfo"]: {
          uid: auth.currentUser.uid,
          displayName: auth.currentUser.displayName,
          photoURL: auth.currentUser.photoURL,
          lastMessage: sendingText,
        },
        [combinedID + ".date"]: serverTimestamp(),
      });
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <div className="send-input">
      <div className="input">
        <input
          type="text"
          placeholder="Type something..."
          value={sendingText}
          onChange={(e) => {
            setSendingText(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="send-icons">
        <img src={sendimage} alt="sendimage" />
        <img src={senddocument} alt="senddocument" />
        <img
          src={sendbutton}
          alt="sendbutton"
          className="send-button"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
}
