import { createContext } from "react";
import { auth } from "../firebaseconfig/firebaseconfig";

export const ContextMessages = createContext(null);

export function ContextProvider({ children }) {
  const intialState = {
    messageID: null,
    user: {},
  };

  const messagesReducer = (state, action) => {
    switch (action.type) {
      case "changeUser":
        return {
          messageID:
            auth.currentUser.uid > action.payload.uid
              ? auth.currentUser.uid + action.payload.uid
              : action.payload.uid + auth.currentUser.uid,
          user: action.payload,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(messagesReducer, intialState);

  return (
    <ContextMessages.Provider value={{}}>{children}</ContextMessages.Provider>
  );
}
