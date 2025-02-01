import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(
    JSON.parse(localStorage.getItem("isLogin")) || false
  );

  useEffect(() => {
    localStorage.setItem("isLogin", JSON.stringify(isLogin));
  }, [isLogin]);

  return (
    <AuthContext.Provider value={{ isLogin, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};