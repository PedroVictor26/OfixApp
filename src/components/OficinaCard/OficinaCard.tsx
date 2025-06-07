// src/components/OficinaCard/OficinaCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // <<< IMPORTAR useNavigate
import './OficinaCard.css';
import type { Oficina } from '../../types';

interface OficinaCardProps {
    oficina: Oficina;
}

const OficinaCard: React.FC<OficinaCardProps> = ({ oficina }) => {
    const navigate = useNavigate(); // <<< USAR O HOOK

    const handleAgendarClick = () => {
        // Navegar para a nova página de detalhes/agendamento
        navigate(`/cliente/oficina/${oficina.id}/agendar`);
    };
    const handleLigarClick = () => {
        if (oficina.telefone) {
            // Em um app mobile real, usaria Linking para abrir o discador
            alert(`Simulação: Ligando para ${oficina.telefone}`);
        }
    };

    return (
        <article className="oficina-card-ofix">
            <div className="card-image-container-ofix">
                <img
                    src={oficina.imagemUrl || 'https://via.placeholder.com/400x250.png?text=OFIX'}
                    alt={`Fachada da ${oficina.nome}`}
                    className="oficina-imagem-ofix"
                />
                {oficina.avaliacao && (
                    <div className="avaliacao-badge-ofix">
                        {/* <FaStar className="star-icon"/> */}
                        ★ {oficina.avaliacao.toFixed(1)}
                    </div>
                )}
            </div>
            <div className="card-content-ofix">
                <h3>{oficina.nome}</h3>
                <p className="endereco-ofix">
                    {/* <FaMapMarkerAlt className="content-icon"/>  */}
                    {oficina.endereco} {oficina.distancia && `(${oficina.distancia})`}
                </p>

                {oficina.tiposVeiculo && oficina.tiposVeiculo.length > 0 && (
                    <div className="tipos-veiculo-ofix">
                        {/* <FaCar className="content-icon" /> */}
                        <span>Atende: {oficina.tiposVeiculo.join(', ')}</span>
                    </div>
                )}

                <div className="servicos-tags-ofix">
                    {/* <FaWrench className="content-icon"/> */}
                    {oficina.servicos.slice(0, 3).map(servico => ( // Mostrar apenas os 3 primeiros
                        <span key={servico} className="servico-tag-ofix">{servico}</span>
                    ))}
                    {oficina.servicos.length > 3 && <span className="servico-tag-ofix">...</span>}
                </div>

                {oficina.horario && <p className="horario-ofix">Horário: {oficina.horario}</p>}
            </div>
            <div className="card-actions-ofix">
                {oficina.telefone && (
                    <button onClick={handleLigarClick} className="action-button-ofix secondary-action-ofix">
                        Ligar
                    </button>
                )}
                <button onClick={handleAgendarClick} className="action-button-ofix primary-action-ofix">
                    Agendar Serviço
                </button>
            </div>
        </article>
    );
};

export default OficinaCard;