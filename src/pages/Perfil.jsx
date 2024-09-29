import { useQueryClient } from "@tanstack/react-query";
import Formpost from "../components/formpost/Formpost";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

import "./Perfil.css";

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
    <div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <Formpost onSubmit={handlePostagem} />
    </div>
  );
}

export default Perfil;