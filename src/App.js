import "./App.css";
import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Chatpage from "./components/Homepage";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(false);
  const [account, setAccount] = useState(true);

  useEffect(() => {
    setUser(false);
    setAccount(false);
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
    </div>
  );
}

export default App;
