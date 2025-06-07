import React from 'react';
import { Link } from 'react-router-dom';
import './OficinaPages.css';

const VerAgendamentosPage: React.FC = () => {
    return (
        <div className="oficina-page-container">
            <header className="oficina-header">
                <h1>Agendamentos Recebidos</h1>
                <nav>
                    <Link to="/oficina/dashboard">Dashboard</Link>
                    <Link to="/oficina/servicos">Gerenciar Serviços</Link>
                </nav>
            </header>
            <main className="oficina-content">
                <p>Lista de todos os agendamentos feitos para sua oficina.</p>
                {/* Tabela ou lista de agendamentos, com filtros por data, status, etc. */}
                <p>Nenhum agendamento para exibir (protótipo).</p>
            </main>
        </div>
    );
};

export default VerAgendamentosPage;