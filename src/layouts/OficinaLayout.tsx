// src/layouts/OficinaLayout.tsx
import React, { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import ChatWidget from '../../components/MathiasChat/ChatWidget'; // Adjust path as needed
import { FaComments } from 'react-icons/fa'; // Example icons
import './OficinaLayout.css'; // Make sure this CSS file exists or is created

const OficinaLayout: React.FC = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const handleUserMessage = async (message: string): Promise<string> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const lowerCaseMessage = message.toLowerCase();
        if (lowerCaseMessage.includes('tool') || lowerCaseMessage.includes('ferramenta')) {
          resolve("Mathias: I can help with tool identification. What tool are you thinking of?");
        } else if (lowerCaseMessage.includes('stock') || lowerCaseMessage.includes('estoque')) {
          resolve("Mathias: I can provide information about inventory once I'm fully connected. For now, what specific item are you looking for?");
        } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('olá') || lowerCaseMessage.includes('oi')) {
          resolve("Mathias: Hello! How can I assist you today in the workshop?");
        } else if (lowerCaseMessage.includes('help') || lowerCaseMessage.includes('ajuda')) {
          resolve("Mathias: I can help with questions about tools, inventory, and general workshop tasks. What do you need assistance with?");
        }
        else {
          resolve("Mathias: I'm processing your request... I can help with tools, stock, and general questions. How can I assist further?");
        }
      }, 1000); // Simulate network delay
    });
  };

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

            {/* Chat Widget Integration */}
            <button
                onClick={() => setIsChatVisible(true)}
                className="mathias-fab"
                aria-label="Open Mathias AI Chat"
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--ofix-azul)', // Use a color from your theme
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '24px', // Adjust icon size
                    zIndex: 1000, // Ensure it's above other content
                }}
                title="Abrir chat com Mathias"
            >
                <FaComments />
            </button>

            <ChatWidget
                isVisible={isChatVisible}
                onClose={() => setIsChatVisible(false)}
                onSendMessage={handleUserMessage}
            />
        </div>
    );
};

export default OficinaLayout;