// src/pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Certifique-se que este arquivo CSS existe

const LandingPage: React.FC = () => {
    return (
        <div className="landing-container-ofix">
            <div className="landing-content-ofix">
                {/* O caminho da imagem foi corrigido abaixo */}
                <img src="/ofix-logo.png" alt="OFIX Logo" className="landing-logo-image-ofix" />
                <h1 className="landing-title-ofix">Conectando Você à Oficina Certa.</h1>
                {/* Adicionei o parágrafo de subtítulo que estava no seu CSS, mas não no JSX */}
                <p className="landing-subtitle-ofix">
                    Seja você um cliente buscando o melhor serviço ou uma oficina querendo expandir seus negócios,
                    a OFIX é a sua plataforma.
                </p>
                <div className="landing-actions-ofix">
                    <Link to="/cliente" className="landing-button-ofix cliente-button-ofix">
                        Sou Cliente
                    </Link>
                    <Link to="/oficina/dashboard" className="landing-button-ofix oficina-button-ofix">
                        Sou Oficina
                    </Link>
                </div>
            </div>
            {/* Movi o footer para fora do landing-actions-ofix e dentro do landing-content-ofix ou landing-container-ofix */}
            <footer className="landing-footer-ofix">
                <p>© {new Date().getFullYear()} OFIX. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default LandingPage;