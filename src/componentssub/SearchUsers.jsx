import React, { useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebaseconfig/firebaseconfig";
import { toast } from "react-toastify";

import { Context } from "../Context";

export default function SearchUsers() {
  const [searchUserEmail, setSearchUserEmail] = useState("");
  const [searchUserPhoto, setSearchUserPhoto] = useState(null);
  const [searchUserDisplayName, setSearchUserDisplayName] = useState(null);
  const [searchUserUID, setSearchUserUID] = useState(null);
  const [userExists, setuserExists] = useState(false);

  const {
    setCurrentChatUserName,
    setCurrentChatUserID,
    setCurrentChatUserphotoURL,
  } = useContext(Context);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (searchUserEmail === auth.currentUser.email) {
        toast.error("Searched Email is yours");
      } else {
        try {
          const q = query(
            collection(db, "users"),
            where("email", "==", searchUserEmail)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            if (doc.data().name !== null) {
              setSearchUserPhoto(doc.data().photoURL);
              setSearchUserDisplayName(doc.data().name);
              setSearchUserUID(doc.data().uid);
              //

              //
              setSearchUserEmail("");
              setuserExists(true);
            }
          });
        } catch (e) {
          toast.error("User not found");
          setuserExists(false);
          console.log(e.message);
        }
      }
    }
  };
  const handleUserClick = async () => {
    //sending current clicked friend to Chat conversation
    setCurrentChatUserphotoURL(searchUserPhoto);
    setCurrentChatUserName(searchUserDisplayName);
    setCurrentChatUserID(searchUserUID);
    // check if conversation exists
    const combinedID =
      auth.currentUser.uid > searchUserUID
        ? auth.currentUser.uid + searchUserUID
        : searchUserUID + auth.currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedID));

      if (!res.exists()) {
        //Else create chat is chats collection
        await setDoc(doc(db, "chats", combinedID), { messages: [] });
        console.log("done1");

        //create userChats

        await updateDoc(doc(db, "userChats", auth.currentUser.uid), {
          [combinedID + ".userInfo"]: {
            uid: searchUserUID,
            displayName: searchUserDisplayName,
            photoURL: searchUserPhoto,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
        console.log("done2");
        await updateDoc(doc(db, "userChats", searchUserUID), {
          [combinedID + ".userInfo"]: {
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
        console.log("done3");
        setuserExists(false);
      } else {
        setuserExists(false);
      }
    } catch (e) {}
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search User by Email"
        className="search-users"
        value={searchUserEmail}
        onChange={(e) => {
          setSearchUserEmail(e.target.value);
        }}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
      />
      <div className="friends-list">
        {userExists && (
          <div
            className="friend"
            onClick={() => {
              handleUserClick();
            }}
          >
            <img src={searchUserPhoto} alt="friend" className="friend-image" />
            <div>
              <p className="friend-name">{searchUserDisplayName}</p>
              <p className="friend-last-message"></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
