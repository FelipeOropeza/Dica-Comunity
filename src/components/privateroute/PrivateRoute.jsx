import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; 

const Privateroute = ({ children }) => {
  const { userId, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  return userId ? children : <Navigate to="/login" />;
};

export default Privateroute;
