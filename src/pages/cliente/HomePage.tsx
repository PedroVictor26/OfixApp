import React, { useState } from 'react';
import OficinaCard from '../../components/OficinaCard/OficinaCard'; // Caminho correto para o componente de card
import type { Oficina } from '../../types'; // Caminho correto para a interface/tipo
import './HomePage.css'; // Estilos específicos para esta página
// import { FaMapMarkerAlt, FaWrench, FaSearch } from 'react-icons/fa'; // Descomente se for usar ícones
// ... outras importações
// Exportar os dados mock para que outras páginas possam usá-los no protótipo
// ... resto do arquivo
// Definindo constantes que estavam faltando no seu snippet
const RAIOS_DISTANCIA = ['3', '5', '10', '15', '25', '50'];
const SERVICOS_COMUNS = ['Mecânica Geral', 'Injeção Eletrônica', 'Funilaria', 'Pintura', 'Retífica de Motores', 'Troca de Óleo', 'Elétrica', 'Suspensão', 'Freios', 'Pneus'];

// Dados mock para oficinas (você já tinha algo similar, estou expandindo um pouco)
export const mockOficinasData: Oficina[] = [
    { id: '1', nome: 'Mecânica Ágil Tech', endereco: 'Rua da Inovação, 100, Vila Tech', distancia: '2.5 km', servicos: ['Injeção Eletrônica', 'Diagnóstico Computadorizado', 'Troca de Óleo Premium', 'Freios ABS'], avaliacao: 4.8, imagemUrl: 'https://images.pexels.com/photos/4488636/pexels-photo-4488636.jpeg?auto=compress&cs=tinysrgb&w=400', horario: 'Seg-Sex: 8h-18h', telefone: '(11) 98888-1000', tiposVeiculo: ['Carros', 'SUVs'] },
    { id: '2', nome: 'Funilaria Estrela Dourada', endereco: 'Av. da Restauração, 200, Bairro Novo', distancia: '4.0 km', servicos: ['Funilaria Completa', 'Pintura Especializada', 'Polimento Cristalizado', 'Martelinho de Ouro'], avaliacao: 4.5, imagemUrl: 'https://images.pexels.com/photos/8986037/pexels-photo-8986037.jpeg?auto=compress&cs=tinysrgb&w=400', horario: 'Seg-Sáb: 9h-17h', telefone: '(11) 98888-2000', tiposVeiculo: ['Carros', 'Pick-ups', 'Vans'] },
    { id: '3', nome: 'Retífica Motor Forte', endereco: 'Praça da Potência, 30, Centro Industrial', distancia: '1.2 km', servicos: ['Retífica de Motores', 'Manutenção Preventiva Diesel', 'Troca de Correias', 'Cabeçotes'], avaliacao: 4.2, imagemUrl: 'https://images.pexels.com/photos/7333633/pexels-photo-7333633.jpeg?auto=compress&cs=tinysrgb&w=400', horario: 'Seg-Sex: 7h30-18h30', telefone: '(11) 98888-3000', tiposVeiculo: ['Carros', 'Caminhões Leves', 'Motos'] },
    { id: '4', nome: 'Speedy Oil & Trucks', endereco: 'Rodovia dos Gigantes, Km 50, Distrito Industrial', distancia: '12 km', servicos: ['Troca de Óleo para Caminhões', 'Mecânica Pesada', 'Freios a Ar', 'Diagnóstico Eletrônico Diesel'], avaliacao: 4.6, imagemUrl: 'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&cs=tinysrgb&w=400', horario: 'Seg-Sex: 24h', telefone: '(11) 98888-4000', tiposVeiculo: ['Caminhões', 'Ônibus', 'Máquinas Agrícolas'] },
];


const HomePageCliente: React.FC = () => {
    const [raioBusca, setRaioBusca] = useState<string>(RAIOS_DISTANCIA[1]); // Padrão 5km
    const [localizacaoInput, setLocalizacaoInput] = useState<string>('');
    const [tipoServicoFiltro, setTipoServicoFiltro] = useState<string>('');
    const [oficinasExibidas, setOficinasExibidas] = useState<Oficina[]>(mockOficinasData);

    const handleBuscarOficinas = () => {
        console.log(`Buscando: Local: ${localizacaoInput}, Raio: ${raioBusca}km, Serviço: ${tipoServicoFiltro}`);
        let oficinasFiltradas = mockOficinasData;

        // Filtro por tipo de serviço
        if (tipoServicoFiltro) {
            oficinasFiltradas = oficinasFiltradas.filter(oficina =>
                oficina.servicos.some(s => s.toLowerCase().includes(tipoServicoFiltro.toLowerCase()))
            );
        }

        // Filtro por nome/localização (simples, busca no nome ou endereço)
        if (localizacaoInput) {
            oficinasFiltradas = oficinasFiltradas.filter(oficina =>
                oficina.nome.toLowerCase().includes(localizacaoInput.toLowerCase()) ||
                oficina.endereco.toLowerCase().includes(localizacaoInput.toLowerCase())
            );
        }

        // Futuramente: Adicionar lógica de filtro por raio com base em coordenadas reais.
        // Por enquanto, o raio é apenas um valor selecionado.

        setOficinasExibidas(oficinasFiltradas);
    };

    // Efeito para buscar quando os filtros mudam, exceto o input de localização (para não buscar a cada letra)
    // useEffect(() => {
    //   handleBuscarOficinas();
    // }, [tipoServicoFiltro, raioBusca]); // Removido localizacaoInput daqui

    return (
        <>
            <section className="hero-section-ofix">
                <h1>Sua Oficina de Confiança, a um Clique.</h1>
                <p>Encontre os melhores serviços automotivos perto de você.</p>
            </section>

            <section className="search-section-ofix">
                <div className="search-controls-ofix">
                    <div className="form-group-ofix input-with-icon">
                        {/* <FaMapMarkerAlt className="input-icon-ofix" /> */}
                        <input
                            type="text"
                            value={localizacaoInput}
                            onChange={(e) => setLocalizacaoInput(e.target.value)}
                            placeholder="Nome da oficina ou endereço/CEP"
                        />
                    </div>
                    <div className="form-group-ofix">
                        {/* <FaWrench className="input-icon-ofix" /> */}
                        <select value={tipoServicoFiltro} onChange={(e) => setTipoServicoFiltro(e.target.value)}>
                            <option value="">Todos os Serviços</option>
                            {SERVICOS_COMUNS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="form-group-ofix">
                        <select value={raioBusca} onChange={(e) => setRaioBusca(e.target.value)}>
                            {RAIOS_DISTANCIA.map(r => <option key={r} value={r}>Raio {r} km</option>)}
                        </select>
                    </div>
                    <button onClick={handleBuscarOficinas} className="search-button-ofix">
                        {/* <FaSearch style={{ marginRight: '8px' }} /> */}
                        Buscar
                    </button>
                </div>
            </section>

            <main className="results-section-ofix-cliente">
                <h2>
                    {oficinasExibidas.length > 0
                        ? `${oficinasExibidas.length} Oficina(s) Encontrada(s)`
                        : 'Nenhuma Oficina Encontrada'}
                </h2>
                {oficinasExibidas.length > 0 ? (
                    <div className="oficinas-grid-ofix">
                        {oficinasExibidas.map(oficina => (
                            <OficinaCard key={oficina.id} oficina={oficina} />
                        ))}
                    </div>
                ) : (
                    <p className="no-results-ofix">
                        Não encontramos oficinas com os critérios selecionados. Tente ampliar sua busca ou remover filtros.
                    </p>
                )}
            </main>
        </>
    );
};

export default HomePageCliente;