import { createContext, useState } from "react";

export const Context = createContext(null);

export function ContextProvider({ children }) {
  const [currentChatUserName, setCurrentChatUserName] = useState("");

  return (
    <Context.Provider value={{ currentChatUserName, setCurrentChatUserName }}>
      {children}
    </Context.Provider>
  );
}
