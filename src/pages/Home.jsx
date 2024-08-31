import React from "react";
import Card from "../components/card/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./Home.css";

const apiUrl = import.meta.env.VITE_API;

const fetchPostagens = async () => {
  const response = await axios.get(`${apiUrl}postagem`);
  return response.data;
};

function Home(){
  const { data: postagens, isLoading, isError, error } = useQuery({
    queryKey: ["postagens"],
    queryFn: fetchPostagens,
    staleTime: 5 * 60 * 1000,  // 5 minutos antes de os dados serem considerados "stale"
    refetchOnWindowFocus: true,  // Re-fetch quando a janela ganha foco
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar postagens: {error.message}</div>;
  }

  return (
    <div className="container">
      <h1>Postagens</h1>
      <ul>
        {postagens.map((postagem) => (
          <li key={postagem.id}>
            <Card titulo={postagem.titulo} body={postagem.body} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
