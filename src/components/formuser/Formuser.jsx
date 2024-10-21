import React, { useState } from "react";

function Formuser({ nome, email, senha, setNome, setEmail, setSenha, onEdit, onDelete }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { nome, email, senha };
    onEdit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nome:</label>
        <input
          type="text"
          value={nome}
          placeholder="Digite seu nome"
          onChange={(e) => setNome(e.target.value)}
          className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">E-mail:</label>
        <input
          type="email"
          value={email}
          placeholder="Digite seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2">Senha:</label>
        <input
          type={showPassword ? "text" : "password"}
          value={senha}
          placeholder="Digite sua senha"
          onChange={(e) => setSenha(e.target.value)}
          className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 px-3 text-gray-600 focus:outline-none"
        >
          {showPassword ? "👁️" : "👁️‍🗨️"}
        </button>
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Excluir Conta
        </button>
      </div>
    </form>
  );
}

export default Formuser;
