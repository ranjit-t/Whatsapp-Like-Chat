import "./App.css";
import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Chatpage from "./components/Chatpage";

function App() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    setUser(false);
  }, []);
  return (
    <div className="App">
      {user ? <Chatpage></Chatpage> : <Signup></Signup>}
    </div>
  );
}

export default App;
