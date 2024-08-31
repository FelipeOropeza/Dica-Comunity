import React, { useState } from "react";

import "./Form.css"

function Form({ onSubmit, isLoginMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nome, setNome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLoginMode && password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    
    const formData = isLoginMode ? { email, password } : { email, password, nome };
    
    onSubmit(formData);

    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {!isLoginMode && (
        <div>
          <label>Confirme a Senha:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      )}

      <button type="submit">{isLoginMode ? "Entrar" : "Cadastrar"}</button>
    </form>
  );
};

export default Form;
