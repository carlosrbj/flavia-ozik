export interface Mensalidade {
  id?: number;
  alunoId: number;
  vencimento: string; // ISO yyyy-MM-dd
  valor: number;
  desconto?: number;
  status: 'EM_ABERTO' | 'FINALIZADA';
  totalPago?: number;
}
