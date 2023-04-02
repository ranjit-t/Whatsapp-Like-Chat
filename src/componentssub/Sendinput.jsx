import React, { useContext, useState } from "react";
import { auth, db, storage } from "../firebaseconfig/firebaseconfig";

import sendimage from "../images/sendimage.png";
// import senddocument from "../images/senddocument.png";
import sendbutton from "../images/sendbutton.png";

import { Context } from "../Context";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";

export default function Sendinput() {
  const { currentChatUserID, currentChatUserName, currentChatUserphotoURL } =
    useContext(Context);

  const [sendingText, setSendingText] = useState("");
  const [sendingIMG, setSendingIMG] = useState(null);
  const [sendingImgURL, setSendingImgURL] = useState("");

  const combinedID =
    auth.currentUser.uid > currentChatUserID
      ? auth.currentUser.uid + currentChatUserID
      : currentChatUserID + auth.currentUser.uid;

  //
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  //
  const handleSendMessage = async () => {
    if (sendingText !== "" || sendingIMG) {
      if (sendingIMG) {
        const imageRef = ref(
          storage,
          `sentImages/${sendingIMG.name + Math.random()}`
        );

        try {
          const uploadTask = uploadBytesResumable(imageRef, sendingIMG);

          await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (error) => {
                reject(new Error("Oops, an unexpected error"));
              },
              async () => {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                setSendingImgURL(downloadURL);

                await updateDoc(doc(db, "chats", combinedID), {
                  messages: arrayUnion({
                    user: auth.currentUser.uid,
                    message: sendingText,
                    imgURL: downloadURL,
                    time: Timestamp.now(),
                  }),
                });

                await updateDoc(doc(db, "userChats", auth.currentUser.uid), {
                  [combinedID + ".userInfo"]: {
                    uid: currentChatUserID,
                    displayName: currentChatUserName,
                    photoURL: currentChatUserphotoURL,
                    lastMessage: sendingText ? sendingText : "sent a photo",
                  },
                  [combinedID + ".date"]: serverTimestamp(),
                });
                await updateDoc(doc(db, "userChats", currentChatUserID), {
                  [combinedID + ".userInfo"]: {
                    uid: auth.currentUser.uid,
                    displayName: auth.currentUser.displayName,
                    photoURL: auth.currentUser.photoURL,
                    lastMessage: sendingText ? sendingText : "sent a photo",
                  },
                  [combinedID + ".date"]: serverTimestamp(),
                });

                setSendingText("");
                setSendingImgURL("");
                setSendingIMG(null);

                resolve();
              }
            );
          });
        } catch (e) {
          if (!currentChatUserID) {
            toast.error("You can't send messages to Admin");
          } else {
            toast.error("Oops, there is an error!");
          }
        }
      } else {
        try {
          await updateDoc(doc(db, "chats", combinedID), {
            messages: arrayUnion({
              user: auth.currentUser.uid,
              message: sendingText,
              imgURL: sendingImgURL,
              time: Timestamp.now(),
            }),
          });

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

          setSendingText("");
          setSendingImgURL("");
        } catch (e) {
          if (!currentChatUserID) {
            toast.error("You can't send messages to Admin");
          } else {
            toast.error("Oops, there is an error!");
          }
        }
      }
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
        <input
          type="file"
          id="sendPhoto"
          style={{ display: "none" }}
          onChange={(e) => {
            setSendingIMG(e.target.files[0]);
          }}
        />
        {sendingIMG && (
          <p
            style={{ color: "black", marginLeft: "-20px", marginRight: "20px" }}
          >
            {sendingIMG.name.slice(0, 5) + "..."}
          </p>
        )}

        <label htmlFor="sendPhoto">
          <img src={sendimage} alt="sendimage" />
        </label>

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
