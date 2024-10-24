import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const apiUrl = import.meta.env.VITE_API;

function Card({
  postId,
  titulo,
  body,
  comments,
  slug,
  isOwner,
  onEdit,
  onDelete,
  imageUrl,
}) {
  const { userId, token } = useContext(AuthContext);
  const [like, setLike] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const getLikes = async () => {
    const response = await axios.get(`${apiUrl}post/${postId}/likes`);
    setLike(response.data.likeCount);
  };

  useEffect(() => {
    getLikes();
  }, [postId]);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}like/${postId}`,
        {
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHasLiked(true);
      getLikes();
    } catch (error) {
      setFeedbackMessage("Você já curtiu essa postagem!");
      setTimeout(() => {
        setFeedbackMessage("");
      }, 3000);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-8 mt-5 max-w-2xl mx-auto shadow-md transition-transform duration-200 transform">
      {isOwner ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{titulo}</h2>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={titulo}
              className="w-full h-auto mb-4 rounded"
            />
          )}
          <p className="text-lg text-gray-600 leading-relaxed mb-5">{body}</p>
          <div className="card-stats flex justify-start gap-5 mt-5">
            <div className="likes flex items-center text-gray-800 text-base">
              <span className="text-lg">👍</span>
              <span className="ml-2">{like} likes</span>
            </div>
            <div className="comments flex items-center text-gray-800 text-base">
              <span className="text-lg">💬</span>
              <span className="ml-2">{comments} comentários</span>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-5">
            <button
              onClick={onEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Editar
            </button>
            <button
              onClick={onDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Excluir
            </button>
          </div>
        </>
      ) : slug ? (
        <Link
          to={`/postagem/${slug}`}
          className="text-gray-800 no-underline transition-colors duration-200 hover:text-blue-600"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{titulo}</h2>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={titulo}
              className="w-full h-auto mb-4 rounded"
            />
          )}
          <p className="text-lg text-gray-600 leading-relaxed mb-5">{body}</p>
          <div className="card-stats flex justify-start gap-5 mt-5">
            <div className="likes flex items-center text-gray-800 text-base">
              <span className="text-lg">👍</span>
              <span className="ml-2">{like} likes</span>
            </div>
            <div className="comments flex items-center text-gray-800 text-base">
              <span className="text-lg">💬</span>
              <span className="ml-2">{comments} comentários</span>
            </div>
          </div>
        </Link>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{titulo}</h2>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={titulo}
              className="w-full h-auto mb-4 rounded"
            />
          )}
          <p className="text-lg text-gray-600 leading-relaxed mb-5">{body}</p>
          <div className="card-stats flex justify-start gap-5 mt-5">
            <div className="likes flex items-center text-gray-800 text-base">
              <span className="text-lg">👍</span>
              <span className="ml-2">{like} likes</span>
            </div>
            <div className="comments flex items-center text-gray-800 text-base">
              <span className="text-lg">💬</span>
              <span className="ml-2">{comments} comentários</span>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-end gap-4 mt-5">
        {/* Botão de Curtir */}
        {!isOwner && (
          <FontAwesomeIcon
            icon={hasLiked ? filledHeart : emptyHeart}
            onClick={handleLike}
            className={`w-8 h-8 cursor-pointer ${
              hasLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          />
        )}
      </div>

      {/* Mensagem de Feedback */}
      {feedbackMessage && (
        <div className="mt-3 text-green-500">{feedbackMessage}</div>
      )}
    </div>
  );
}

export default Card;
