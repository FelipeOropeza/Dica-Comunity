import React, { useEffect, useState } from "react";
import Card from "../components/card/Card";
import axios from "axios";
import "./Home.css";

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
            <Card titulo={postagem.titulo} body={postagem.body}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
