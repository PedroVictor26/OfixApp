// src/pages/cliente/MeusAgendamentosClientePage.tsx
import React from 'react';
// import { Link } from 'react-router-dom'; // Pode não precisar de links internos se o header do layout já tem
import './ClientesPages.css'; // Estilos comuns para páginas de cliente
import type { Agendamento } from '../../types'; // Importar tipo

const MeusAgendamentosClientePage: React.FC = () => {
    const agendamentos: Agendamento[] = [ /* ... seus dados mock de agendamento ... */];

    return (
        // O container e header são fornecidos pelo ClienteLayout
        <div className="page-content-padding-cliente"> {/* Adiciona padding interno */}
            <h1 className="page-title-cliente">Meus Agendamentos</h1>
            {agendamentos.length > 0 ? (
                <ul className="lista-agendamentos">
                    {/* ... (renderização dos agendamentos - já definido) ... */}
                </ul>
            ) : (
                <p className="empty-state-cliente">Você ainda não possui agendamentos.</p>
            )}
        </div>
    );
};

export default MeusAgendamentosClientePage;