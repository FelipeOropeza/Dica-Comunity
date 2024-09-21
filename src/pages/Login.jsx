import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/form/Form";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

import "./Login.css";

const apiUrl = import.meta.env.VITE_API;

function Login() {
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async ({ email, senha }) => {
    try {
      const response = await axios.post(`${apiUrl}auth/login`, {
        email,
        senha,
      });
      
      setErrorMessage("");
      setSuccessMessage("Login feito com sucesso! Redirecionando...");

      setTimeout(() => {
        login(response.data);
        navigate("/");
      }, 2000); 
    } catch (error) {
      const message = error.response
        ? error.response.data
        : "Erro desconhecido. Tente novamente mais tarde.";
      setErrorMessage(message);
      setSuccessMessage(""); 
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <Form onSubmit={handleLogin} isLoginMode={true} />
    </div>
  );
}

export default Login;