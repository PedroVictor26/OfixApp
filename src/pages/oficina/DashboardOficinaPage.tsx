// src/pages/oficina/DashboardOficinaPage.tsx
import React from 'react';
// import { Link } from 'react-router-dom'; // Links estão no OficinaLayout
import './OficinaPages.css'; // Estilos comuns
import type { Agendamento } from '../../types'; // Exemplo se for listar agendamentos

const DashboardOficinaPage: React.FC = () => {
    const agendamentosRecentes: Agendamento[] = [ /* ... mock ... */];
    return (
        <div className="page-content-padding-oficina">
            <h1 className="page-title-oficina">Dashboard da Oficina</h1>
            <div className="dashboard-grid-oficina">
                <section className="dashboard-card-ofix">
                    <h2>Novos Agendamentos</h2>
                    <p className="metric-ofix">{agendamentosRecentes.filter(a => a.status === 'Pendente').length}</p>
                    {/* Link para ver todos */}
                </section>
                <section className="dashboard-card-ofix">
                    <h2>Serviços em Andamento</h2>
                    <p className="metric-ofix">{agendamentosRecentes.filter(a => a.status === 'Em Andamento').length}</p>
                </section>
                {/* Mais cards de métricas */}
            </div>
            <section className="recent-activity-ofix">
                <h2>Atividade Recente</h2>
                {/* Lista de atividades ou agendamentos */}
                <p>Nenhuma atividade recente (protótipo).</p>
            </section>
        </div>
    );
};
export default DashboardOficinaPage;