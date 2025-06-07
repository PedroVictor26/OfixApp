// src/pages/cliente/DetalhesAgendamentoPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Oficina, Mecanico, ServicoOficina, HorarioDisponivel } from '../../types';
import { mockOficinasData } from './HomePage'; // <<< Esta linha está tentando importar
import './DetalhesAgendamentoPage.css';

// Dados mock adicionais para uma oficina específica (para fins de protótipo)
// Idealmente, isso viria de uma busca baseada no oficinaId
const mockMecanicosDaOficina: Mecanico[] = [
    { id: 'm1', nome: 'Carlos Alberto', especialidades: ['Motor', 'Suspensão'], fotoUrl: 'https://via.placeholder.com/100.png?text=Carlos' },
    { id: 'm2', nome: 'Fernanda Lima', especialidades: ['Injeção Eletrônica', 'Elétrica'], fotoUrl: 'https://via.placeholder.com/100.png?text=Fernanda' },
];
const mockServicosDetalhadosDaOficina: ServicoOficina[] = [
    { id: 'sd1', nome: 'Troca de Óleo Completa (Sintético)', descricao: 'Inclui óleo sintético 5W-30 e filtro de óleo.', precoEstimado: 'R$ 250,00', duracaoEstimada: '1h' },
    { id: 'sd2', nome: 'Diagnóstico Avançado de Injeção', descricao: 'Uso de scanner e osciloscópio para identificar falhas.', precoEstimado: 'R$ 180,00', duracaoEstimada: '1h30min' },
    { id: 'sd3', nome: 'Revisão de Freios (Dianteiros)', descricao: 'Verificação e troca de pastilhas, se necessário.', precoEstimado: 'A partir de R$ 300,00', duracaoEstimada: '2h' },
];
const mockHorariosDaOficina: HorarioDisponivel[] = [
    { diaDaSemana: 'Segunda', horarios: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
    { diaDaSemana: 'Terça', horarios: ['09:00', '10:00', '14:00', '15:00'] },
    // ... outros dias
];


const DetalhesAgendamentoPage: React.FC = () => {
    const { oficinaId } = useParams<{ oficinaId: string }>(); // Pega o ID da URL
    const navigate = useNavigate();
    const [oficina, setOficina] = useState<Oficina | null>(null);
    const [mecanicos, setMecanicos] = useState<Mecanico[]>([]);
    const [servicos, setServicos] = useState<ServicoOficina[]>([]);
    const [horarios, setHorarios] = useState<HorarioDisponivel[]>([]);

    const [servicoSelecionado, setServicoSelecionado] = useState<string>('');
    const [mecanicoSelecionado, setMecanicoSelecionado] = useState<string>('');
    const [dataHoraSelecionada, setDataHoraSelecionada] = useState<string>(''); // Formato: "Dia - HH:MM"
    const [observacoes, setObservacoes] = useState<string>('');


    useEffect(() => {
        // Simular busca de dados da oficina
        if (oficinaId) {
            const oficinaEncontrada = mockOficinasData.find(o => o.id === oficinaId);
            if (oficinaEncontrada) {
                setOficina(oficinaEncontrada);
                // Para o protótipo, usamos mocks fixos para detalhes, mas idealmente seria:
                // setMecanicos(oficinaEncontrada.mecanicos || mockMecanicosDaOficina);
                // setServicos(oficinaEncontrada.servicosDetalhados || mockServicosDetalhadosDaOficina);
                // setHorarios(oficinaEncontrada.horariosDisponiveis || mockHorariosDaOficina);
                setMecanicos(mockMecanicosDaOficina);
                setServicos(mockServicosDetalhadosDaOficina);
                setHorarios(mockHorariosDaOficina);

            } else {
                // Oficina não encontrada, redirecionar ou mostrar erro
                navigate('/cliente'); // Volta para a home do cliente
            }
        }
    }, [oficinaId, navigate]);

    const handleConfirmarAgendamento = () => {
        if (!servicoSelecionado || !dataHoraSelecionada) {
            alert('Por favor, selecione um serviço e um horário.');
            return;
        }
        alert(`Agendamento Simulado:
      Oficina: ${oficina?.nome}
      Serviço: ${servicos.find(s => s.id === servicoSelecionado)?.nome}
      Mecânico: ${mecanicos.find(m => m.id === mecanicoSelecionado)?.nome || 'Qualquer um'}
      Data/Hora: ${dataHoraSelecionada}
      Observações: ${observacoes || 'Nenhuma'}
      
      Redirecionando para "Meus Agendamentos"...`);
        // Aqui você faria a chamada API para salvar o agendamento
        // e depois navegaria para a página de confirmação ou meus agendamentos.
        navigate('/cliente/agendamentos');
    };

    if (!oficina) {
        return <div className="loading-state">Carregando informações da oficina...</div>;
    }

    return (
        <div className="detalhes-agendamento-container-ofix">
            <button onClick={() => navigate(-1)} className="back-button-ofix">
                {/* <FaChevronLeft /> */} Voltar
            </button>

            <h1 className="page-title-detalhes">{oficina.nome}</h1>
            <p className="oficina-endereco-detalhes">{oficina.endereco}</p>

            <form onSubmit={(e) => { e.preventDefault(); handleConfirmarAgendamento(); }} className="agendamento-form-ofix">
                <section className="form-section-ofix">
                    <h2>{/* <FaWrench /> */} Selecione o Serviço</h2>
                    <select value={servicoSelecionado} onChange={e => setServicoSelecionado(e.target.value)} required>
                        <option value="" disabled>Escolha um serviço...</option>
                        {servicos.map(s => <option key={s.id} value={s.id}>{s.nome} ({s.precoEstimado})</option>)}
                    </select>
                </section>

                <section className="form-section-ofix">
                    <h2>{/* <FaUserCog /> */} Escolha o Mecânico (Opcional)</h2>
                    <div className="mecanicos-grid-ofix">
                        {mecanicos.map(m => (
                            <button
                                type="button"
                                key={m.id}
                                className={`mecanico-card-ofix ${mecanicoSelecionado === m.id ? 'selected' : ''}`}
                                onClick={() => setMecanicoSelecionado(m.id === mecanicoSelecionado ? '' : m.id)}
                            >
                                <img src={m.fotoUrl || 'https://via.placeholder.com/80.png?text=Mec'} alt={m.nome} />
                                <strong>{m.nome}</strong>
                                <span>{m.especialidades.join(', ')}</span>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="form-section-ofix">
                    <h2>{/* <FaCalendarAlt /> */} Escolha Data e Horário</h2>
                    {/* Para um protótipo, um select simples. Em produção, um calendário real. */}
                    <select value={dataHoraSelecionada} onChange={e => setDataHoraSelecionada(e.target.value)} required>
                        <option value="" disabled>Escolha um horário...</option>
                        {horarios.map(dia =>
                            dia.horarios.map(hora => (
                                <option key={`${dia.diaDaSemana}-${hora}`} value={`${dia.diaDaSemana} - ${hora}`}>
                                    {dia.diaDaSemana} - {hora}
                                </option>
                            ))
                        )}
                    </select>
                    {/* <FaClock /> {dataHoraSelecionada && <p>Selecionado: {dataHoraSelecionada}</p>} */}
                </section>

                <section className="form-section-ofix">
                    <h2>Observações Adicionais (Opcional)</h2>
                    <textarea
                        placeholder="Ex: Barulho estranho ao frear, luz do motor acesa..."
                        value={observacoes}
                        onChange={e => setObservacoes(e.target.value)}
                    />
                </section>

                <button type="submit" className="confirmar-agendamento-button-ofix">
                    Confirmar Agendamento
                </button>
            </form>
        </div>
    );
};

export default DetalhesAgendamentoPage;