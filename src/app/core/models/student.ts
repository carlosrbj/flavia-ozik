export interface Student {
  id?: number;
  
  // Informações Pessoais
  fotoUrl?: string;
  nome: string;
  
  // Contato
  telefone?: string;
  telefone2?: string;
  email?: string;
  
  // Informações do Curso
  dataInicio?: string; // ISO yyyy-MM-dd
  nivel?: 'INICIANTE' | 'INTERMEDIARIO' | 'AVANCADO';
  valorMensalidade?: number;
  formaPagamento?: 'PIX' | 'CARTAO' | 'DINHEIRO' | 'TRANSFERENCIA';
  diaVencimento?: number; // Dia do mês para vencimento
  
  // Status e Controle
  ativo: boolean;
  dataInativo?: string;
  motivoInativo?: string;
  
  // Observações
  observacoes?: string;
  
  // Metadados
  criadoEm?: string;
  atualizadoEm?: string;
}
