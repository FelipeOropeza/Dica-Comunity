import React from "react";
import { Link } from "react-router-dom";

function Card({ titulo, body, likes, comments, slug }) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-8 mt-5 max-w-2xl mx-auto shadow-md transition-transform duration-200 transform hover:-translate-y-1 hover:shadow-xl">
      {" "}
      {/* Ajustes com Tailwind */}
      {slug ? (
        <Link
          to={`/postagem/${slug}`}
          className="text-gray-800 no-underline transition-colors duration-200 hover:text-blue-600"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{titulo}</h2>{" "}
          {/* Título estilizado */}
          <p className="text-lg text-gray-600 leading-relaxed mb-5">
            {body}
          </p>{" "}
          {/* Corpo do texto estilizado */}
          <div className="card-stats flex justify-start gap-5 mt-5">
            {" "}
            {/* Estilização do stats */}
            <div className="likes flex items-center text-gray-800 text-base">
              <span className="text-lg">👍</span>
              <span className="ml-2">{likes} curtidas</span>
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
          <p className="text-lg text-gray-600 leading-relaxed mb-5">{body}</p>
          <div className="card-stats flex justify-start gap-5 mt-5">
            <div className="likes flex items-center text-gray-800 text-base">
              <span className="text-lg">👍</span>
              <span className="ml-2">{likes} curtidas</span>
            </div>
            <div className="comments flex items-center text-gray-800 text-base">
              <span className="text-lg">💬</span>
              <span className="ml-2">{comments} comentários</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
