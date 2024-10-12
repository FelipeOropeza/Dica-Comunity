import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API;

function Cadastro() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async ({ email, senha, nome }) => {
    try {
      const response = await axios.post(`${apiUrl}usuario`, {
        nome,
        email,
        senha,
      });
      console.log(response.data);
      setErrorMessage("");
      setSuccessMessage("Usuário criado com sucesso!");

      // Redireciona para a página de login após 3 segundos
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      const message = error.response
        ? error.response.data
        : "Erro desconhecido. Tente novamente mais tarde.";
      setErrorMessage(message);
      setSuccessMessage(""); // Limpa a mensagem de sucesso em caso de erro
    }
  };

  return (
    <div className="flex justify-center p-1">
      <div className="w-full max-w-lg bg-white p-6 shadow-lg rounded-lg mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>

        {errorMessage && (
          <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 text-green-600 bg-green-100 p-3 rounded">
            {successMessage}
          </div>
        )}

        <Form onSubmit={handleCadastro} isLoginMode={false} />
      </div>
    </div>
  );
}

export default Cadastro;
