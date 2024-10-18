import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserId = localStorage.getItem("userId");
    const token = Cookies.get("token");

    if (storedUser && storedUserId && token) {
      try {
        setUser(JSON.parse(storedUser));
        setUserId(JSON.parse(storedUserId));
        setToken(token);
      } catch (error) {
        console.error("Erro ao carregar dados do localStorage", error);
        logout();
      }
    } else {
      logout();
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    const { nome, id, token } = userData;
    setUser(nome);
    setUserId(id);
    setToken(token);
    Cookies.set("token", token, { expires: 7 });

    localStorage.setItem("userId", JSON.stringify(id));
    localStorage.setItem("user", JSON.stringify(nome));
  };

  const logout = () => {
    setUser(null);
    setUserId(null);
    setToken(null);
    Cookies.remove("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
  };

  const updateUser = (userData) => {
    const { nome } = userData;
    setUser(nome);

    localStorage.setItem("user", JSON.stringify(nome));
  };

  return (
    <AuthContext.Provider
      value={{ user, userId, token, login, logout, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
