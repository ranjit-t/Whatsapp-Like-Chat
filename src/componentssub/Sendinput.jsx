import React, { useContext, useState } from "react";

import sendimage from "../images/sendimage.png";
import senddocument from "../images/senddocument.png";
import sendbutton from "../images/sendbutton.png";

import { db, auth } from "../firebaseconfig/firebaseconfig";
import { Context } from "../Context";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";

export default function Sendinput() {
  const { currentChatUserID } = useContext(Context);

  const [sendingText, setSendingText] = useState("");
  // const [sendingIMG, setSendingIMG] = useState(null);
  // const [sendingImgURL, setSendingImgURL] = useState("");

  const combinedID =
    auth.currentUser.uid > currentChatUserID
      ? auth.currentUser.uid + currentChatUserID
      : currentChatUserID + auth.currentUser.uid;

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
