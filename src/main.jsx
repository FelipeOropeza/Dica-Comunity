import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginCadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";

import Privateroute from "./components/privateroute/Privateroute";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="cadastro" element={<LoginCadastro />} />
            <Route
              path="perfil"
              element={
                <Privateroute>
                  <Perfil />
                </Privateroute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
