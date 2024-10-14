import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import LoginCadastro from "./pages/cadastro/Cadastro";
import CriaPostagem from "./pages/criapostagem/CriaPostagem";
import EditaPostagem from "./pages/editapostagem/EditaPostagem";
import MinhasPostagens from "./pages/minhaspostagens/MinhasPostagens";
import Postagem from "./pages/postagem/Postagem";
import NotFound from "./pages/notfound/NotFound";

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
              path="cria-postagem"
              element={
                <Privateroute>
                  <CriaPostagem />
                </Privateroute>
              }
            />
            <Route
              path="minhas-postagens/:id"
              element={
                <Privateroute>
                  <MinhasPostagens />
                </Privateroute>
              }
            />
            <Route
              path="minhas-postagens/editar-postagem/:id"
              element={
                <Privateroute>
                  <EditaPostagem />
                </Privateroute>
              }
            />
            <Route
              path="postagem/:slug"
              element={
                <Privateroute>
                  <Postagem />
                </Privateroute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
