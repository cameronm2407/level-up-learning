import { createContext, useContext, useEffect, useState } from "react";
import { getSession, setSession, clearSession } from "./lib/session";

const AuthCtx = createContext(null);

export function Authentication({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getSession());
  }, []);

  const signIn = (username) => {
    const u = { username };
    setSession(u);
    setUser(u);
  };

  const signOut = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
