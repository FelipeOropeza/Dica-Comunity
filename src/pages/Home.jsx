import React, { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API;

const Home = () => {
  const [postagens, setPostagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiUrl}postagem`)
      .then((response) => {
        setPostagens(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar postagens: {error.message}</div>;
  }

  return (
    <div>
      <h1>Postagens</h1>
      <ul>
        {postagens.map((postagem) => (
          <li key={postagem.id}>
            <h2>{postagem.titulo}</h2>
            <p>
              <strong>Slug:</strong> {postagem.slug}
            </p>
            <p>
              <strong>Body:</strong> {postagem.body}
            </p>
            <p>
              <strong>Autor ID:</strong> {postagem.autorId}
            </p>
            <p>
              <strong>Likes:</strong> {postagem.likes}
            </p>
            <p>
              <strong>Comentários:</strong>
            </p>
            <ul>
              {postagem.comentarios.map((comentario, index) => (
                <li key={index}>{comentario}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
