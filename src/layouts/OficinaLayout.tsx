// src/layouts/OficinaLayout.tsx
import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import './OficinaLayout.css';

const OficinaLayout: React.FC = () => {
    return (
        <div className="oficina-layout-ofix">
            <header className="oficina-header-ofix">
                <Link to="/oficina/dashboard" className="logo-link-ofix"> {/* Mudado para Link */}
                    <img src="/ofix-logo.png" alt="OFIX Logo" className="logo-image-ofix" />
                    <span className="logo-subtitle-ofix">Painel</span>
                </Link>
                <nav className="oficina-nav-ofix">
                    {/* ... seus NavLinks ... */}
                    <NavLink to="/oficina/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/oficina/agendamentos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Agendamentos
                    </NavLink>
                    <NavLink to="/oficina/servicos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Serviços
                    </NavLink>
                    <NavLink to="/oficina/perfil" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Perfil Oficina
                    </NavLink>
                    <Link to="/cliente" className="nav-link switch-role-ofix">
                        Área do Cliente
                    </Link>
                </nav>
            </header>
            <main className="oficina-content-area-ofix">
                <Outlet />
            </main>
            <footer className="oficina-footer-ofix">
                <p>© {new Date().getFullYear()} OFIX. Painel da Oficina.</p>
            </footer>
        </div>
    );
};

export default OficinaLayout;