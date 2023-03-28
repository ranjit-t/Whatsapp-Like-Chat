import "./App.css";
import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Chatpage from "./components/Homepage";
import Login from "./components/Login";
import "./styles.scss";
import "./stylesmobile.scss";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";

function App() {
  const [user, setUser] = useState(false);
  const [account, setAccount] = useState(true);

  useEffect(() => {
    setUser(false);
    setAccount(true);
  }, []);
  const handleAccount = () => {
    setAccount((prev) => !prev);
  };
  const handleUser = () => {
    setUser((prev) => !prev);
  };
  return (
    <div className="App">
      {user ? (
        <Chatpage handleUser={handleUser}></Chatpage>
      ) : account ? (
        <Login handleUser={handleUser} handleAccount={handleAccount}></Login>
      ) : (
        <Signup handleUser={handleUser} handleAccount={handleAccount}></Signup>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        draggable
        pauseOnHover
      ></ToastContainer>
    </div>
  );
}

export default App;
