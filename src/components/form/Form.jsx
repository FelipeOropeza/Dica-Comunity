import React, { useState } from "react";
import { Link } from "react-router-dom";

function Form({ onSubmit, isLoginMode }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [nome, setNome] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto p-4 bg-white shadow-md rounded">
      {!isLoginMode && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2">Senha:</label>
        <input
          type={showPassword ? "text" : "password"}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 px-3 text-gray-600 focus:outline-none"
        >
          {showPassword ? "👁️" : "👁️‍🗨️"}
        </button>
      </div>

      {!isLoginMode && (
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">Confirme a Senha:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            required
            className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      )}

      {isLoginMode && (
        <div className="flex justify-between items-center mb-4">
          <Link to="../cadastro" className="text-blue-500 text-sm hover:underline">Criar conta</Link>
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
      >
        {isLoginMode ? "Entrar" : "Cadastrar"}
      </button>
    </form>
  );
}

export default Form;
