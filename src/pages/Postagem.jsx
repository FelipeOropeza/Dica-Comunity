import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NotFound from "./NotFound";
import Card from "../components/card/Card";

const apiUrl = import.meta.env.VITE_API;

function Postagem() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [postagem, setPostagem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <div>
      {postagem && (
        <Card
          titulo={postagem.titulo}
          body={postagem.body}
          likes={postagem.likes}
          comments={postagem.comments}
        />
      )}
    </div>
  );
}

export default Postagem;
