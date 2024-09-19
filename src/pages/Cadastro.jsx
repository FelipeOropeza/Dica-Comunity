import React, { useState } from "react";
import Form from "../components/form/Form";
import axios from "axios";

import "./Cadastro.css";

const apiUrl = import.meta.env.VITE_API;

function Cadastro() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleCadastro = async ({ email, senha, nome }) => {
    try {
      const response = await axios.post(`${apiUrl}usuario`, {
        nome,
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
      return { error: message };
    }
  };

  return (
    <div className="login-cadastro">
      <h2>Cadastro</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Form onSubmit={handleCadastro} isLoginMode={false} />
    </div>
  );
}

export default Cadastro;
