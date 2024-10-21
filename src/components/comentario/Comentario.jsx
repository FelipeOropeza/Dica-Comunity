import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function Comentario({ comentarios, onComment, onDelete, onEdit }) {
  const { userId } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
    setErrorMessage("");
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) {
      setErrorMessage("O comentário não pode estar vazio!");
      setTimeout(() => {
        setErrorMessage("")
      }, 2000);
      return;
    }
    if (onComment) {
      onComment(newComment);
      setNewComment("");
    }
  };

  const toggleDropdown = (commentId) => {
    setDropdownVisible(dropdownVisible === commentId ? null : commentId);
  };

  const openEditModal = (commentId, commentContent) => {
    setEditingCommentId(commentId);
    setEditedComment(commentContent);
    setModalVisible(true);
  };

  const handleEdit = () => {
    if (onEdit && editedComment.trim()) {
      onEdit(editingCommentId, editedComment);
      setEditedComment("");
      setModalVisible(false);
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
          className={`w-full p-2 border ${errorMessage ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:border-blue-500`}
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Comentar
        </button>
      </div>

      {errorMessage && (
        <p className="text-red-500 mb-4">{errorMessage}</p> // Exibe a mensagem de erro
      )}

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
                        onClick={() =>
                          openEditModal(comentario.id, comentario.conteudo)
                        }
                        className="text-blue-500 hover:bg-blue-100 w-full text-left p-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          onDelete(comentario.id);
                          setDropdownVisible(null);
                        }}
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

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Editar Comentário</h2>
            <textarea
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              rows="4"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setModalVisible(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comentario;
