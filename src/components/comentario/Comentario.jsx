import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function Comentario({ comentarios, onComment, onDelete, onEdit }) {
  const { userId } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (onComment && newComment.trim()) {
      onComment(newComment);
      setNewComment("");
    }
  };

  const toggleDropdown = (commentId) => {
    setDropdownVisible(dropdownVisible === commentId ? null : commentId);
  };

  const handleEdit = (commentId) => {
    if (onEdit && editedComment.trim()) {
      onEdit(commentId, editedComment);
      setEditedComment("");
      setDropdownVisible(null);
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
          <div
            key={comentario.id}
            className="bg-white shadow-md p-4 rounded-lg border border-gray-200 relative"
          >
            <div className="flex items-center mb-2 justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex items-center justify-center">
                  <span className="text-gray-700 font-bold">
                    {comentario.autorId.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-600 font-semibold">
                  {comentario.autorId}
                </span>
              </div>
              {userId === comentario.autorId && (
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(comentario.id)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Opções"
                  >
                    &#x022EE;
                  </button>
                  {dropdownVisible === comentario.id && (
                    <div className="absolute right-0 top-0 mt-8 bg-white shadow-lg p-2 border border-gray-300 rounded z-10">
                      <button
                        onClick={() => handleEdit(comentario.id)}
                        className="text-blue-500 hover:bg-blue-100 w-full text-left p-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => { onDelete(comentario.id); setDropdownVisible(null); }}
                        className="text-red-500 hover:bg-red-100 w-full text-left p-1 rounded"
                      >
                        Apagar
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <p className="text-gray-800">{comentario.conteudo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comentario;
