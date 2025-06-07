// src/pages/cliente/PerfilClientePage.tsx
import React from 'react';
// import { Link } from 'react-router-dom';
import './ClientesPages.css';

const PerfilClientePage: React.FC = () => {
    return (
        <div className="page-content-padding-cliente">
            <h1 className="page-title-cliente">Meu Perfil</h1>
            <section className="profile-section-cliente">
                <h2>Informações Pessoais</h2>
                {/* ... (conteúdo do perfil - já definido) ... */}
            </section>
            <section className="profile-section-cliente">
                <h2>Meus Veículos</h2>
                {/* ... (conteúdo dos veículos - já definido) ... */}
            </section>
        </div>
    );
};

export default PerfilClientePage;