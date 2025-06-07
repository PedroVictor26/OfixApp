// src/App.tsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Layouts
import ClienteLayout from './layouts/ClienteLayout';
import OficinaLayout from './layouts/OficinaLayout';

// Páginas
import LandingPage from './pages/LandingPage';
import HomePageCliente from './pages/cliente/HomePage';
import MeusAgendamentosClientePage from './pages/cliente/MeusAgendamentosClientePage';
import PerfilClientePage from './pages/cliente/PerfilClientePage';
import DashboardOficinaPage from './pages/oficina/DashboardOficinaPage';
import GerenciarServicosPage from './pages/oficina/GerenciarServicosPage';
import VerAgendamentosPage from './pages/oficina/VerAgendamentosPage';
import PerfilOficinaPage from './pages/oficina/PerfilOficinaPage';

import './App.css'; // Estilos globais da aplicação, se houver
import DetalhesAgendamentoPage from './pages/cliente/DetalhesAgendamentoPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      {/* Rotas do Cliente com Layout Cliente */}
      <Route path="/cliente" element={<ClienteLayout />}>
        <Route index element={<HomePageCliente />} /> {/* Rota padrão para /cliente */}
        <Route path="agendamentos" element={<MeusAgendamentosClientePage />} />
        <Route path="perfil" element={<PerfilClientePage />} />
        {/* Adicionar rotas para detalhes da oficina, etc., aqui dentro */}
        {/* Ex: <Route path="oficina/:id" element={<DetalhesOficinaPage />} /> */}
        <Route path="oficina/:oficinaId/agendar" element={<DetalhesAgendamentoPage />} />
      </Route>

      {/* Rotas da Oficina/Mecânico com Layout Oficina */}
      <Route path="/oficina" element={<OficinaLayout />}>
        <Route path="dashboard" element={<DashboardOficinaPage />} />
        <Route path="servicos" element={<GerenciarServicosPage />} />
        <Route path="agendamentos" element={<VerAgendamentosPage />} />
        <Route path="perfil" element={<PerfilOficinaPage />} />
      </Route>
      
      {/* Página Não Encontrada (404) */}
      <Route path="*" element={
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '100vh', 
            backgroundColor: 'var(--fundo-principal)', 
            color: 'var(--texto-primario)',
            padding: '20px',
            textAlign: 'center'
          }}>
          <h1 style={{ fontSize: '3em', color: 'var(--ofix-vermelho)'}}>Erro 404</h1>
          <h2 style={{fontSize: '1.5em', margin: '20px 0'}}>Página não encontrada</h2>
          <p>A página que você está procurando não existe ou foi movida.</p>
          <Link to="/" style={{ 
              marginTop: '30px', 
              padding: '10px 25px', 
              backgroundColor: 'var(--ofix-azul)', 
              color: 'var(--ofix-branco)', 
              borderRadius: '5px', 
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
            Voltar para a Página Inicial
          </Link>
        </div>
      } />
    </Routes>
  );
}

export default App;