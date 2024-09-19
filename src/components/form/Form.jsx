import React, { useState } from "react";

import "./Form.css";
import { Link } from "react-router-dom";

function Form({ onSubmit, isLoginMode }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [nome, setNome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoginMode && senha !== confirmSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const formData = isLoginMode
      ? { email, senha }
      : { email, senha, nome };

    onSubmit(formData);

    setEmail("");
    setSenha("");
    setConfirmSenha("");
    setNome("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isLoginMode && (
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
      )}
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>

      {isLoginMode && <Link to="../cadastro">Criar conta</Link>}

      {!isLoginMode && (
        <div>
          <label>Confirme a Senha:</label>
          <input
            type="password"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            required
          />
        </div>
      )}

      <button type="submit">{isLoginMode ? "Entrar" : "Cadastrar"}</button>
    </form>
  );
}

export default Form;
