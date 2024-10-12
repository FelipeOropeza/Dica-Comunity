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
  const { data: postagens, isLoading, isError, error } = useQuery({
    queryKey: ["postagens"],
    queryFn: fetchPostagens,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <div className="text-center">Carregando...</div>; // Centraliza o texto de carregando
  }

  if (isError) {
    return <div className="text-center">Erro ao carregar postagens: {error.message}</div>; // Centraliza o texto de erro
  }

  return (
    <div className="flex flex-col items-center p-4"> {/* Flexbox para centralizar e dar padding */}
      <ul className="flex flex-col gap-6 w-full max-w-2xl"> {/* Flex para empilhar os cards verticalmente */}
        {postagens.map((postagem) => (
          <li key={postagem.id} className="w-full"> {/* A largura do card será 100% do seu container */}
            <Card 
              titulo={postagem.titulo} 
              body={postagem.body} 
              likes={postagem.likes} 
              comments={postagem.comments} 
              slug={postagem.slug}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
