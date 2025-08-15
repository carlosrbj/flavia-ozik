export interface Student {
  id?: number;
  fotoUrl?: string;
  nome: string;
  dataNascimento?: string; // ISO yyyy-MM-dd
  dataInicio?: string; // ISO yyyy-MM-dd
  telefone?: string;
  email?: string;
  valorMensalidade?: number;
  ativo: boolean;
  observacoes?: string;
}
