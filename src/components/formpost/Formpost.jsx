import React, { useState } from "react";

function Formpost({ onSubmit }) {
  const [titulo, setTitulo] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { titulo, body };

    onSubmit(formData);

    setTitulo("");
    setBody("");
  };

  return (
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto p-4 bg-white shadow-md rounded">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Título:</label>
          <input
            type="text"
            value={titulo}
            placeholder="Digite o título do post"
            onChange={(e) => setTitulo(e.target.value)}
            className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Aumentei o padding
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Conteúdo:</label>
          <textarea
            value={body}
            placeholder="Digite o conteúdo do post"
            onChange={(e) => setBody(e.target.value)}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="5"
            required
            style={{ resize: "none" }}
          ></textarea>
        </div>
        <div>
          <input
            type="submit"
            value="Criar Postagem"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
  );
}

export default Formpost;
