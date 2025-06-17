// src/layouts/OficinaLayout.tsx
import React, { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import ChatWidget from '../../components/MathiasChat/ChatWidget'; // Adjust path as needed
import { FaComments } from 'react-icons/fa'; // Example icons
import './OficinaLayout.css'; // Make sure this CSS file exists or is created

const OficinaLayout: React.FC = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  // URL for the Mathias AI Proxy.
  // For development, this points to the local proxy.
  // For production, this should point to the deployed proxy URL.
  const mathiasProxyUrl = process.env.NODE_ENV === 'production'
    ? 'YOUR_DEPLOYED_PROXY_URL_HERE/api/chat' // Replace with actual deployed URL
    : 'http://localhost:3001/api/chat';

  const handleUserMessage = async (message: string): Promise<string> => {
    try {
      const response = await fetch(mathiasProxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        // Try to parse error message from proxy if available
        const errorData = await response.json().catch(() => null); // Catch if error response is not JSON
        const errorMessage = errorData?.error || `Error from AI service: ${response.status} ${response.statusText}`;
        console.error('Error calling Mathias AI Proxy:', errorMessage);
        return `Mathias: Sorry, I encountered an issue. (${errorMessage})`;
      }

      const data = await response.json();
      return data.reply || "Mathias: I didn't receive a valid response.";

    } catch (error: any) {
      console.error('Network or other error calling Mathias AI Proxy:', error);
      return `Mathias: Sorry, I'm having trouble connecting. Please check your connection or try again later. (${error.message || 'Network error'})`;
    }
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