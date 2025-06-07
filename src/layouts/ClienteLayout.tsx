// src/layouts/ClienteLayout.tsx
import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import ChatWidget from '../components/OficinaCard/ChatWidget'; 
import './ClienteLayout.css';

const ClienteLayout: React.FC = () => {
    return (
        <div className="cliente-layout-ofix">
            <header className="cliente-header-ofix">
                <Link to="/cliente" className="logo-link-ofix"> {/* Mudado para Link */}
                    <img src="/ofix-logo.png" alt="OFIX Logo" className="logo-image-ofix" />
                </Link>
                <nav className="cliente-nav-ofix">
                    {/* ... seus NavLinks ... */}
                    <NavLink to="/cliente" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Buscar
                    </NavLink>
                    <NavLink to="/cliente/agendamentos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Agendamentos
                    </NavLink>
                    <NavLink to="/cliente/perfil" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Perfil
                    </NavLink>
                    <Link to="/oficina/dashboard" className="nav-link switch-role-ofix">
                        Sou Oficina
                    </Link>
                </nav>
            </header>
            <main className="cliente-content-area-ofix">
                <Outlet />
            </main>
            <footer className="cliente-footer-ofix">
                <p>© {new Date().getFullYear()} OFIX. Para Clientes.</p>
            </footer>
            <ChatWidget /> {/* <<< ADICIONAR O WIDGET AQUI */}
        </div>
    );
};

export default ClienteLayout;