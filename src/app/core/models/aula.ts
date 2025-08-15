export interface Aula {
  id?: number;
  alunoId: number;
  mensalidadeId?: number;
  data?: string; // ISO yyyy-MM-dd
  horas: number; // 3h padrão
  status: 'EM_ABERTO' | 'REALIZADA' | 'CANCELADA';
  registradaEm?: string;
}
