import { useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Card from "../../components/card/Card";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API;

function MinhasPostagens() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { userId, token } = useContext(AuthContext); 
  const [postagens, setPostagens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidId = (id) => {
    const uuidPattern = /^[0-9a-f]{24}$/;
    return uuidPattern.test(id);
  };

  const editarPostagem = (postagemId) => {
    navigate(`../minhas-postagens/editar-postagem/${postagemId}`);
  };

  const excluirPostagem = async (postagemId) => {
    try {
      await axios.delete(`${apiUrl}postagem/${postagemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      queryClient.invalidateQueries(["postagens"]);

      setPostagens(postagens.filter((postagem) => postagem.id !== postagemId));
    } catch (error) {
      console.error("Erro ao excluir postagem:", error);
    }
  };

  useEffect(() => {
    const fetchPostagens = async () => {
      if (!isValidId(id)) {
        setIsError(true);
        setError("ID inválido");
        navigate("/not-found");
        return;
      }

      if (id !== userId) {
        setIsError(true);
        setError("Você não tem permissão para ver as postagens de outro usuário.");
        navigate("/not-found");
        return;
      }

      try {
        const response = await axios.get(
          `${apiUrl}postagem/minhas-postagens/${id}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data || response.status !== 200) {
          throw new Error("Postagens não encontradas");
        }

        setPostagens(response.data);
      } catch (error) {
        setIsError(true);
        const errorMessage =
          error.response?.data?.message || error.message || "Erro desconhecido.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostagens();
  }, [apiUrl, token, id, userId, navigate]);

  if (isLoading) {
    return <div className="text-center">Carregando...</div>;
  }

  if (isError) {
    return (
      <div className="text-center">Erro ao carregar postagens: {error}</div>
    );
  }

  if (postagens.length === 0) {
    return <h1 className="text-center">Nenhuma postagem encontrada</h1>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <ul className="flex flex-col gap-6 w-full max-w-2xl">
        {postagens.map((postagem) => (
          <li key={postagem.id} className="w-full">
            <Card
              titulo={postagem.titulo}
              body={postagem.body}
              likes={postagem.likes}
              comments={postagem.comments}
              isOwner={true}
              onEdit={() => editarPostagem(postagem.id)}
              onDelete={() => excluirPostagem(postagem.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MinhasPostagens;
