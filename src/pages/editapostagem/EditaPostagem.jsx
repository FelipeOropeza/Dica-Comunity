import React, { useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Formpost from "../../components/formpost/Formpost";
import { AuthContext } from "../../context/AuthContext";

const apiUrl = import.meta.env.VITE_API;

function EditaPostagem() {
  const { token, userId } = useContext(AuthContext);
  const { id } = useParams();
  const [postagem, setPostagem] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isValidId = (id) => {
    const uuidPattern = /^[0-9a-f]{24}$/;
    return uuidPattern.test(id);
  };

  const fetchPostagem = async () => {
    try {
      const response = await axios.get(`${apiUrl}postagem/id/${id}`);

      setPostagem(response.data);
      setTitulo(response.data.titulo);
      setBody(response.data.body);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      setIsError(true);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Erro ao carregar a postagem.";
      setError(errorMessage);

      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePostagem = async (formData) => {
    try {
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      const response = await axios.put(
        `${apiUrl}postagem/${id}`,
        {
          titulo: formDataObject.titulo,
          body: formDataObject.body,
          imageUrl: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      queryClient.invalidateQueries(["postagens"]);

      setSuccessMessage(response.data.message);
      setTimeout(() => {
        navigate(`/minhas-postagens/${userId}`);
      }, 2000);

      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      setIsError(true);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Erro ao atualizar a postagem.";
      setError(errorMessage);

      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (!isValidId(id)) {
      setError("ID inválido");
      navigate("/not-found");
      return;
    }
    fetchPostagem();
  }, [id]);

  if (isLoading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg mt-12">
        <h1 className="text-2xl font-bold mb-6 text-center">Editar Postagem</h1>

        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            {successMessage}
          </div>
        )}

        {isError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            {error}
          </div>
        )}

        {postagem && (
          <Formpost
            onSubmit={updatePostagem}
            titulo={titulo}
            body={body}
            setTitulo={setTitulo}
            setBody={setBody}
            buttonText="Atualizar Postagem"
          />
        )}
      </div>
    </div>
  );
}

export default EditaPostagem;
