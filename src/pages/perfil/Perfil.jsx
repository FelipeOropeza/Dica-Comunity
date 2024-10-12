import { useQueryClient } from "@tanstack/react-query";
import Formpost from "../../components/formpost/Formpost";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";

const apiUrl = import.meta.env.VITE_API;

function Perfil() {
  const { userId, token } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handlePostagem = async ({ titulo, body }) => {
    try {
      const response = await axios.post(
        `${apiUrl}postagem`,
        {
          titulo,
          body,
          autorId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setErrorMessage("");
      setSuccessMessage(`${response.data} Redirecionando...`);

      queryClient.invalidateQueries(["postagens"]);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      const message = error.response
        ? error.response.data
        : "Erro ao criar postagem. Tente novamente.";
      setErrorMessage(message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Postagem</h2>

        {errorMessage && (
          <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">
            <strong className="font-bold">Erro! </strong>
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 text-green-600 bg-green-100 p-3 rounded">
            <strong className="font-bold">Sucesso! </strong>
            <span>{successMessage}</span>
          </div>
        )}

        <Formpost onSubmit={handlePostagem} />
      </div>
    </div>
  );
}

export default Perfil;
