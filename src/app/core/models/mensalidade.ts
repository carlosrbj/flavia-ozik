export interface Mensalidade {
  id?: number;
  alunoId: number;
  
  // Informações da Mensalidade
  mes: number; // 1-12
  ano: number;
  vencimento: string; // ISO yyyy-MM-dd
  valor: number;
  desconto?: number;
  multa?: number;
  juros?: number;
  
  // Status e Controle
  status: 'EM_ABERTO' | 'PAGO_PARCIAL' | 'PAGO' | 'VENCIDA' | 'CANCELADA';
  dataPagamento?: string;
  valorPago?: number;
  
  // Forma de Pagamento
  formaPagamento?: 'PIX' | 'CARTAO' | 'DINHEIRO' | 'TRANSFERENCIA';
  comprovante?: string;
  
  // Aulas Vinculadas
  aulasGeradas: number; // Quantidade de aulas (padrão: 4)
  aulasRealizadas: number;
  
  // Metadados
  criadoEm?: string;
  atualizadoEm?: string;
  observacoes?: string;
}
