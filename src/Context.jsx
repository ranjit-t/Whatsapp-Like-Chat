import { createContext, useState } from "react";

export const Context = createContext(null);

export function ContextProvider({ children }) {
  const [currentChatUserName, setCurrentChatUserName] = useState("");
  const [currentChatUserID, setCurrentChatUserID] = useState("");
  const [currentChatUserphotoURL, setCurrentChatUserphotoURL] = useState("");

  const [mobileChatSelect, setMobileChatSelect] = useState(false);

  return (
    <Context.Provider
      value={{
        currentChatUserName,
        setCurrentChatUserName,
        currentChatUserID,
        setCurrentChatUserID,
        currentChatUserphotoURL,
        setCurrentChatUserphotoURL,
        mobileChatSelect,
        setMobileChatSelect,
      }}
    >
      {children}
    </Context.Provider>
  );
}
