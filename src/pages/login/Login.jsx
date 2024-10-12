import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API;

function Login() {
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async ({ email, senha }) => {
    try {
      const response = await axios.post(`${apiUrl}auth/login`, {
        email,
        senha,
      });
      
      setErrorMessage("");
      setSuccessMessage("Login feito com sucesso! Redirecionando...");

      setTimeout(() => {
        login(response.data);
        navigate("/");
      }, 2000); 
    } catch (error) {
      const message = error.response
        ? error.response.data
        : "Erro desconhecido. Tente novamente mais tarde.";
      setErrorMessage(message);
      setSuccessMessage(""); 
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {errorMessage && (
          <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 text-green-600 bg-green-100 p-3 rounded">
            {successMessage}
          </div>
        )}

        <Form onSubmit={handleLogin} isLoginMode={true} />
      </div>
    </div>
  );
}

export default Login;
