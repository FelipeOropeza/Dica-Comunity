import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Formuser from "../../components/formuser/FomrUser";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const apiUrl = import.meta.env.VITE_API;

function Perfil() {
  const { id } = useParams();
  const { token, updateUser, logout } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}usuario/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNome(response.data.nome);
        setEmail(response.data.email);
      } catch (error) {
        setError("Erro ao buscar os dados do usuário.");
        setTimeout(() => {
          setError("");
        }, 1500);
      }
    };

    fetchUserData();
  }, [id, token]);

  const handleEdit = async () => {
    try {
      await axios.put(
        `${apiUrl}usuario/${id}`,
        {
          nome,
          email,
          senha,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      updateUser({ nome });

      setMessage("Usuário editado com sucesso.");
      setError("");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setError("Erro ao editar o usuário.");
      setMessage("");

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}usuario/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Usuário excluído com sucesso. Redirecionando...");
      setError("");

      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError("Erro ao excluir o usuário.");
      setMessage("");

      setTimeout(() => {
        setError("");
      }, 1500);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Perfil</h2>
        {message && (
          <div className="mb-4 text-green-600 bg-green-100 p-3 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">
            {error}
          </div>
        )}
        <Formuser
          nome={nome}
          email={email}
          senha={senha}
          setNome={setNome}
          setEmail={setEmail}
          setSenha={setSenha}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default Perfil;
