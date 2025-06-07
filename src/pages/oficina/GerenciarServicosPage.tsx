// src/pages/oficina/GerenciarServicosPage.tsx
import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // Links de navegação estão no OficinaLayout
import './OficinaPages.css'; // Importa os estilos comuns
import type { ServicoOficina } from '../../types'; // Importa o tipo

const mockServicos: ServicoOficina[] = [
    { id: 's1', nome: 'Troca de Óleo Simples', descricao: 'Troca de óleo e filtro (óleo mineral)', precoEstimado: 'R$ 150,00', duracaoEstimada: '45min' },
    { id: 's2', nome: 'Alinhamento 3D', descricao: 'Alinhamento computadorizado das 4 rodas', precoEstimado: 'R$ 120,00', duracaoEstimada: '1h' },
    { id: 's3', nome: 'Diagnóstico Injeção Eletrônica', descricao: 'Verificação completa com scanner', precoEstimado: 'R$ 200,00', duracaoEstimada: '1h30min' },
];

const GerenciarServicosPage: React.FC = () => {
    const [servicos, setServicos] = useState<ServicoOficina[]>(mockServicos);
    // Estados para o formulário de novo serviço
    const [novoServicoNome, setNovoServicoNome] = useState('');
    const [novoServicoDesc, setNovoServicoDesc] = useState('');
    const [novoServicoPreco, setNovoServicoPreco] = useState('');

    const handleAddServico = (e: React.FormEvent) => {
        e.preventDefault();
        if (!novoServicoNome.trim()) return;
        const novo: ServicoOficina = {
            id: `s${Date.now()}`,
            nome: novoServicoNome,
            descricao: novoServicoDesc,
            precoEstimado: novoServicoPreco,
            // duracaoEstimada: ...
        };
        setServicos(prev => [...prev, novo]);
        // Limpar formulário
        setNovoServicoNome('');
        setNovoServicoDesc('');
        setNovoServicoPreco('');
    };

    return (
        // O div wrapper com padding é opcional se a página já tem seções que o fazem.
        // O título principal já está no OficinaLayout
        <>
            <h1 className="page-title-oficina">Gerenciar Serviços Oferecidos</h1>

            <section className="oficina-section-card">
                <h2>Adicionar Novo Serviço</h2>
                <form onSubmit={handleAddServico} className="form-oficina">
                    <div className="form-group">
                        <label htmlFor="servicoNome">Nome do Serviço:</label>
                        <input type="text" id="servicoNome" value={novoServicoNome} onChange={e => setNovoServicoNome(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="servicoDesc">Descrição (opcional):</label>
                        <textarea id="servicoDesc" value={novoServicoDesc} onChange={e => setNovoServicoDesc(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="servicoPreco">Preço Estimado (opcional):</label>
                        <input type="text" id="servicoPreco" value={novoServicoPreco} onChange={e => setNovoServicoPreco(e.target.value)} placeholder="Ex: R$ 100,00 ou A combinar" />
                    </div>
                    <button type="submit" className="oficina-button primary">Adicionar Serviço</button>
                </form>
            </section>

            <section className="oficina-section-card">
                <h2>Serviços Cadastrados</h2>
                {servicos.length > 0 ? (
                    <ul className="items-list-oficina">
                        {servicos.map(servico => (
                            <li key={servico.id} className="item-card-oficina">
                                <div>
                                    <h3>{servico.nome}</h3>
                                    {servico.descricao && <p>{servico.descricao}</p>}
                                    {servico.precoEstimado && <p><strong>Preço:</strong> {servico.precoEstimado}</p>}
                                </div>
                                <div className="item-actions-oficina">
                                    <button className="oficina-button neutral">Editar</button>
                                    <button className="oficina-button primary" style={{ backgroundColor: 'var(--ofix-vermelho)' /* Exemplo de override */ }}>Excluir</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum serviço cadastrado ainda.</p>
                )}
            </section>
        </>
    );
};

export default GerenciarServicosPage;