import React, { useState } from "react";
import user from "../images/user.png";

import { auth, db, storage } from "../firebaseconfig/firebaseconfig";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
// import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { toast } from "react-toastify";

export default function Signup({ handleAccount }) {
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
                      photoURL: profileImage
                        ? downloadURL
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
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
                    await setDoc(doc(db, "userChats", userUID), {});
                  }
                );
              }
            );

            toast.success("You are Registered");
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
            console.log(profileImage);
          }}
        />
        <label htmlFor="avatar">
          <img src={user} alt="avatar" className="avatar-alt" />
          <span>Profile Picture</span>
        </label>
        <p
          style={{
            marginTop: "-20px",
            marginBottom: "-20px",
            fontSize: "15px",
            color: "black",
            maxWidth: "50px",
          }}
        >
          {profileImage !== null && profileImage.name}
        </p>
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
