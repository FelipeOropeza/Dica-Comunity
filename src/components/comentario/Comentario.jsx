import React, { useState } from "react";

function Comentario({ comentarios, onComment }) {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (onComment && newComment.trim()) {
      onComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="mt-8">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Escreva um comentário..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Comentar
        </button>
      </div>
      <div className="space-y-4">
        {comentarios.map((comentario) => (
          <div key={comentario.id} className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                <span className="text-gray-700 font-bold">{comentario.autorId.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-gray-600 font-semibold">{comentario.autorId}</span>
            </div>
            <p className="text-gray-800">{comentario.conteudo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comentario;
