import React, { useState } from "react";
import Form from "../components/form/Form";
import axios from "axios";

import "./Login.css";

const apiUrl = import.meta.env.VITE_API;

function Login() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async ({ email, senha }) => {
    try {
      const response = await axios.post(`${apiUrl}auth/login`, {
        email,
        senha,
      });
      console.log(response.data);
      setErrorMessage("");
    } catch (error) {
      const message = error.response
        ? error.response.data
        : "Erro desconhecido. Tente novamente mais tarde.";
      setErrorMessage(message);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Form onSubmit={handleLogin} isLoginMode={true} />
    </div>
  );
}

export default Login;

