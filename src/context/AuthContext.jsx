import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserId = localStorage.getItem("userId");
    if (storedUser && storedUserId) {
      setUser(JSON.parse(storedUser));
      setUserId(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    const { nome, id, token } = userData;

    setUser(nome);
    setUserId(id);

    localStorage.setItem("userId", JSON.stringify(id));
    localStorage.setItem("user", JSON.stringify(nome));
    Cookies.set("token", token, { expires: 7 });
  };

  const logout = () => {
    setUser(null);
    setUserId(null);

    localStorage.removeItem("userId");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
