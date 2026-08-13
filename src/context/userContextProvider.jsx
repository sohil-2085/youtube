import React, { useState } from "react";
import UserContext from "./userContext";
function userContextProvider({ children }) {
  const [email, setEmail] = useState("");

  return (
    <UserContext.Provider value={email, setEmail}>
      {children}
    </UserContext.Provider>
  );
}

export default userContextProvider;
