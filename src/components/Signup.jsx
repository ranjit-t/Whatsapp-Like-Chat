import React, { useState } from "react";
import user from "../images/user.png";

import { auth, db, storage } from "../firebaseconfig/firebaseconfig";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { serverTimestamp, setDoc, doc, collection } from "firebase/firestore";
// import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { toast } from "react-toastify";

export default function Signup({ handleUser, handleAccount }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [DisplayName, setDisplayName] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  return (
    <div className="sign-up">
      <h1 style={{ marginTop: "-50px" }}>Textapp</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const userCred = await createUserWithEmailAndPassword(
              auth,
              Email,
              Password
            );

            const imageRef = ref(storage, `${Email}.jpg`);

            const uploadTask = uploadBytesResumable(imageRef, profileImage);

            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (error) => {
                toast.error("Oops, an unexpected error");
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                  async (downloadURL) => {
                    // console.log("File available at", downloadURL);
                    await updateProfile(auth.currentUser, {
                      displayName: DisplayName.trim(),
                      photoURL: downloadURL,
                    });
                    const userUID = userCred.user.uid;
                    const formData = {
                      uid: userUID,
                      name: DisplayName,
                      email: Email,
                      photoURL: downloadURL,
                      timestamp: serverTimestamp(),
                    };

                    await setDoc(doc(db, "users", userUID), formData);
                    const chatRef = doc(collection(db, `chat-${Email}`));
                    await setDoc(chatRef, {});
                  }
                );
              }
            );

            toast.success("You are Registered");
            handleUser();
          } catch (e) {
            toast.error(e.message.slice(10, 100));
          }
        }}
      >
        <h1>Signup</h1>
        <input
          type="text"
          placeholder="Display Name"
          required
          value={DisplayName}
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={Password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="file"
          id="avatar"
          style={{ display: "none" }}
          onChange={(e) => {
            setProfileImage(e.target.files[0]);
          }}
        />
        <label htmlFor="avatar">
          <img src={user} alt="avatar" className="avatar-alt" />
          <span>Profile Picture</span>
        </label>
        <button>Signup</button>
      </form>
      <p>Already Have An Account ?</p>
      <button
        onClick={() => {
          handleAccount();
        }}
      >
        Login
      </button>
    </div>
  );
}
