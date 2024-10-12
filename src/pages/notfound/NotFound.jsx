import React from "react";
import { Link } from "react-router-dom";
import { MdError } from "react-icons/md";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[500px]"> 
      <MdError size={50} className="text-red-500 mb-4" /> 
      <h1 className="text-4xl font-bold mb-2">404 - Página não encontrada</h1>
      <p className="text-lg mb-4">Desculpe, a página que você está procurando não existe.</p>
      <Link to="/" className="text-blue-500 hover:underline text-lg">
        Voltar para a página inicial
      </Link>
    </div>
  );
}

export default NotFound;
