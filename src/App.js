import "./App.css";
import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import "./styles.scss";
import "./stylesmobile.scss";

import { auth } from "./firebaseconfig/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RiseLoader from "react-spinners/RiseLoader";

function App() {
  const [user, setUser] = useState(false);
  const [account, setAccount] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 1000);
  }, []);

  const handleAccount = () => {
    setAccount((prev) => !prev);
  };

  return (
    <div>
      {pageLoading ? (
        <div className="loader">
          <RiseLoader color="rgb(28, 75, 59)" />
        </div>
      ) : (
        <div className="App">
          {user ? (
            <Homepage></Homepage>
          ) : account ? (
            <Login handleAccount={handleAccount}></Login>
          ) : (
            <Signup handleAccount={handleAccount}></Signup>
          )}
          <ToastContainer
            position="top-center"
            autoClose={3000}
            draggable
            pauseOnHover
          ></ToastContainer>
          <div className="developer">
            <p>Made with ❤️ by Ranjit Thota</p>
            <a
              className="git-hub"
              href="https://github.com/ranjit-t"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
