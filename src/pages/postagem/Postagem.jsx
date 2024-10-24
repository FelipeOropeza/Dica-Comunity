import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NotFound from "../notfound/NotFound";
import Card from "../../components/card/Card";
import Comentario from "../../components/comentario/Comentario";
import { AuthContext } from "../../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

const apiUrl = import.meta.env.VITE_API;

function Postagem() {
  const { userId, token } = useContext(AuthContext);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [postagem, setPostagem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchPostagem = async () => {
      try {
        const response = await axios.get(`${apiUrl}postagem/slug/${slug}`);

        if (!response.data || response.status !== 200) {
          throw new Error("Postagem não encontrada");
        }
        setPostagem(response.data);
      } catch (error) {
        setError("Postagem não encontrada");
      } finally {
        setLoading(false);
      }
    };

    if (!slug || slug.trim() === "") {
      setError("Slug inválido");
      navigate("/not-found");
      return;
    }

    fetchPostagem();
  }, [slug, navigate]);

  const handleAddComment = async (newComment) => {
    try {
      const response = await axios.post(
        `${apiUrl}comentario`,
        {
          conteudo: newComment,
          autorId: userId,
          postId: postagem.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      queryClient.invalidateQueries(["postagens"]);

      const responsePost = await axios.get(`${apiUrl}postagem/slug/${slug}`);
      setPostagem(responsePost.data);

      setSuccessMessage("Comentário inserido com sucesso!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 1500);
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  };

  const handleDeleteComment = async (idComment) => {
    try {
      await axios.delete(`${apiUrl}comentario/${idComment}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      queryClient.invalidateQueries(["postagens"]);

      const responsePost = await axios.get(`${apiUrl}postagem/slug/${slug}`);
      setPostagem(responsePost.data);

      setSuccessMessage("Comentário excluido com sucesso!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 1500);
    } catch (error) {
      console.error("Erro ao excluir comentário:", error);
    }
  };

  const handleUpdateComment = async (idComment, updateComment) => {
    try {
      await axios.put(
        `${apiUrl}comentario/${idComment}`,
        {
          conteudo: updateComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      queryClient.invalidateQueries(["postagens"]);

      const responsePost = await axios.get(`${apiUrl}postagem/slug/${slug}`);
      setPostagem(responsePost.data);

      setSuccessMessage("Comentário atualizado com sucesso!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 1500);
    } catch (error) {
      console.error("Erro ao atualizar comentário:", error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col items-center p-4">
      {successMessage && (
        <div className="bg-green-500 text-white p-2 rounded mb-4">
          {successMessage}
        </div>
      )}
      <ul className="flex flex-col gap-6 w-full max-w-2xl">
        <li key={postagem.id} className="w-full">
          {postagem && (
            <Card
              postId={postagem.id}
              titulo={postagem.titulo}
              body={postagem.body}
              comments={postagem.comentarios.length}
              imageUrl={postagem.imageUrl}
            />
          )}
          <Comentario
            comentarios={postagem.comentarios}
            onComment={handleAddComment}
            onDelete={handleDeleteComment}
            onEdit={handleUpdateComment}
          />
        </li>
      </ul>
    </div>
  );
}

export default Postagem;
