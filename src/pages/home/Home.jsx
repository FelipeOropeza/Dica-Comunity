import React from "react";
import Card from "../../components/card/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API;

const fetchPostagens = async () => {
  const response = await axios.get(`${apiUrl}postagem`);
  return response.data;
};

function Home() {
  const {
    data: postagens,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["postagens"],
    queryFn: fetchPostagens,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <div className="text-center">Carregando...</div>;
  }

  if (isError) {
    return (
      <div className="text-center">
        Erro ao carregar postagens: {error.message}
      </div>
    );
  }

  const postagensArray = Array.isArray(postagens)
    ? postagens
    : postagens.data || postagens.results || [];

  return (
    <div className="flex flex-col items-center p-4">
      <ul className="flex flex-col gap-6 w-full max-w-2xl">
        {postagensArray.map((postagem) => (
          <li key={postagem.id} className="w-full">
            <Card
              titulo={postagem.titulo}
              body={postagem.body}
              comments={postagem.comentarios.length}
              slug={postagem.slug}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
