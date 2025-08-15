export interface Queima {
  id?: number;
  alunoId: number;
  
  // Informações da Queima
  dataQueima: string; // ISO yyyy-MM-dd
  horarioInicio: string; // HH:mm
  horarioFim: string; // HH:mm
  tipo: 'BISCOITO' | 'ESMALTE' | 'RAKU' | 'OUTRO';
  
  // Controle de Temperatura
  temperaturaMaxima?: number; // em Celsius
  tempoTotal?: number; // em minutos
  programa?: string; // Programa de queima utilizado
  
  // Status e Controle
  status: 'AGENDADA' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';
  resultado?: 'SUCESSO' | 'PARCIAL' | 'FALHA';
  
  // Peças e Materiais
  quantidadePecas?: number;
  material?: string;
  esmalte?: string;
  observacoes?: string;
  
  // Custos
  valor?: number;
  pago?: boolean;
  dataPagamento?: string;
  
  // Metadados
  criadoEm?: string;
  atualizadoEm?: string;
  responsavel?: string; // Nome do responsável pela queima
}
