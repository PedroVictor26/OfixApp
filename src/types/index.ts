// src/types/index.ts
export interface Oficina {
    id: string;
    nome: string;
    endereco: string;
    distancia?: string;
    servicos: string[];
    avaliacao?: number;
    imagemUrl?: string;
    horario?: string;
    telefone?: string;
    tiposVeiculo?: string[];
}

export interface Agendamento {
    id: string;
    oficinaId: string;
    oficinaNome: string;
    clienteId: string; // Futuramente, um ID de usuário real
    clienteNome?: string; // Para exibição
    servico: string;
    dataHora: string; // Considerar usar tipo Date ou uma biblioteca de datas
    status: 'Pendente' | 'Confirmado' | 'Cancelado' | 'Concluído' | 'Em Andamento';
    observacoesCliente?: string;
    observacoesOficina?: string;
    mecanicoId?: string;
    mecanicoNome?: string;
    veiculoInfo?: string; // Ex: "Ford Ka 2019 - Placa ABC-1234"
}

export interface ServicoOficina {
    id: string;
    nome: string;
    descricao?: string;
    precoEstimado?: string; // Ou number
    duracaoEstimada?: string; // Ex: "1h30min"
}

// Outros tipos podem ser adicionados aqui: Usuario, Mecanico, etc.

// ... (outros tipos existentes: Oficina, Agendamento, ServicoOficina) ...

export interface Mecanico {
  id: string;
  nome: string;
  especialidades: string[]; // Ex: ['Motor', 'Injeção Eletrônica']
  fotoUrl?: string;
}

export interface HorarioDisponivel { // Exemplo simples
  diaDaSemana: 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado' | 'Domingo';
  horarios: string[]; // Ex: ['08:00', '09:00', '14:00']
}

// Adicionar aos dados da Oficina (se relevante para esta página)
export interface Oficina {
  // ... (campos existentes)
  mecanicos?: Mecanico[];
  servicosDetalhados?: ServicoOficina[]; // Pode ser o mesmo que ServicoOficina ou mais detalhado
  horariosDisponiveis?: HorarioDisponivel[]; // Ou uma estrutura mais complexa
}