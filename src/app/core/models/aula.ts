export interface Aula {
  id?: number;
  alunoId: number;
  mensalidadeId?: number;
  
  // Informações da Aula
  data: string; // ISO yyyy-MM-dd
  horarioInicio: string; // HH:mm
  horarioFim: string; // HH:mm
  duracao: number; // em minutos (padrão: 180 = 3h)
  
  // Status e Controle
  status: 'AGENDADA' | 'EM_ANDAMENTO' | 'REALIZADA' | 'CANCELADA' | 'REPROGRAMADA';
  presenca: 'PRESENTE' | 'AUSENTE' | 'JUSTIFICADA' | 'PENDENTE';
  
  // Conteúdo da Aula
  tipo: 'TEORICA' | 'PRATICA' | 'TEORICO_PRATICA';
  tecnica?: string; // Técnica ensinada
  material?: string; // Material utilizado
  observacoes?: string;
  
  // Avaliação
  nota?: number; // 0-10
  feedback?: string;
  
  // Metadados
  criadoEm?: string;
  atualizadoEm?: string;
  registradaPor?: string; // Nome do instrutor
}
