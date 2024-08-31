import React from "react";
import Form from "../components/form/Form";

import "./Cadastro.css";

function Cadastro() {
  const handleCadastro = ({ email, password, nome }) => {
    // Lógica de Cadastro (por exemplo, chamar a API de cadastro)
    console.log("Cadastro com:", { email, password, nome });
  };

  return (
    <div className="login-cadastro">
      <h2>Cadastro</h2>
      <Form onSubmit={handleCadastro} isLoginMode={false} />
    </div>
  );
}

export default Cadastro;
