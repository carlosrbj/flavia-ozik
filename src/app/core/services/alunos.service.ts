import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { Mensalidade } from '../models/mensalidade';
import { Aula } from '../models/aula';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  private alunos: Student[] = [
    { id: 1, nome: 'Ana Souza', telefone: '(11) 99999-1111', email: 'ana@example.com', valorMensalidade: 400, ativo: true, dataInicio: '2024-01-10' },
    { id: 2, nome: 'Bruno Lima', telefone: '(11) 98888-2222', email: 'bruno@example.com', valorMensalidade: 350, ativo: true, dataInicio: '2024-03-05' },
    { id: 3, nome: 'Carla Mendes', telefone: '(11) 97777-3333', email: 'carla@example.com', valorMensalidade: 0, ativo: false, dataInicio: '2023-09-15' }
  ];

  private mensalidades: Mensalidade[] = [
    { id: 1, alunoId: 1, vencimento: '2025-08-10', valor: 400, desconto: 0, status: 'EM_ABERTO' },
    { id: 2, alunoId: 1, vencimento: '2025-07-10', valor: 400, desconto: 0, status: 'FINALIZADA', totalPago: 400 },
    { id: 3, alunoId: 2, vencimento: '2025-08-12', valor: 350, desconto: 50, status: 'EM_ABERTO' }
  ];

  private aulas: Aula[] = [];

  private seqAluno = 100;
  private seqMensalidade = 1000;
  private seqAula = 5000;

  listar(): Student[] {
    return [...this.alunos];
  }

  cadastrar(novo: Student): Student {
    const toCreate: Student = { ...novo, id: ++this.seqAluno };
    this.alunos.push(toCreate);
    return toCreate;
  }

  excluir(id: number): void {
    this.alunos = this.alunos.filter(a => a.id !== id);
  }

  contarMensalidadesAtrasadas(): number {
    const hoje = new Date().toISOString().slice(0, 10);
    return this.mensalidades.filter(m => m.status === 'EM_ABERTO' && m.vencimento < hoje).length;
  }

  gerarMensalidade(alunoId: number, vencimento: string, valor: number, desconto = 0, status: 'EM_ABERTO' | 'FINALIZADA' = 'EM_ABERTO'): Mensalidade {
    const mensalidade: Mensalidade = { id: ++this.seqMensalidade, alunoId, vencimento, valor, desconto, status };
    this.mensalidades.push(mensalidade);
    // Gera 4 aulas de 3h em aberto
    for (let i = 0; i < 4; i++) {
      const aula: Aula = { id: ++this.seqAula, alunoId, mensalidadeId: mensalidade.id, horas: 3, status: 'EM_ABERTO', registradaEm: new Date().toISOString() };
      this.aulas.push(aula);
    }
    return mensalidade;
  }

  listarAulasPorAluno(alunoId: number): Aula[] {
    return this.aulas.filter(a => a.alunoId === alunoId);
  }
}
