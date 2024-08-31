import React from "react";
import Form from "../components/form/Form";

import "./Login.css"

function Login() {
  const handleLogin = ({ email, password }) => {
    // Lógica de Login (por exemplo, chamar a API de login)
    console.log("Login com:", { email, password });
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <Form onSubmit={handleLogin} isLoginMode={true} />
    </div>
  );
};

export default Login;
