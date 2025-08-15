import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { Mensalidade } from '../models/mensalidade';
import { Aula } from '../models/aula';
import { Queima } from '../models/queima';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  private alunos: Student[] = [
    { 
      id: 1, 
      nome: 'Ana Souza', 
      telefone: '(11) 99999-1111', 
      email: 'ana@example.com', 
      valorMensalidade: 400, 
      ativo: true, 
      dataInicio: '2024-01-10',
      nivel: 'INTERMEDIARIO',
      formaPagamento: 'PIX',
      diaVencimento: 10,
      criadoEm: '2024-01-10T10:00:00Z'
    },
    { 
      id: 2, 
      nome: 'Bruno Lima', 
      telefone: '(11) 98888-2222', 
      email: 'bruno@example.com', 
      valorMensalidade: 350, 
      ativo: true, 
      dataInicio: '2024-03-05',
      nivel: 'INICIANTE',
      formaPagamento: 'CARTAO',
      diaVencimento: 15,
      criadoEm: '2024-03-05T14:00:00Z'
    },
    { 
      id: 3, 
      nome: 'Carla Mendes', 
      telefone: '(11) 97777-3333', 
      email: 'carla@example.com', 
      valorMensalidade: 0, 
      ativo: false, 
      dataInicio: '2023-09-15',
      nivel: 'AVANCADO',
      dataInativo: '2024-06-01',
      motivoInativo: 'Mudança de cidade',
      criadoEm: '2023-09-15T09:00:00Z'
    }
  ];

  private mensalidades: Mensalidade[] = [];
  private aulas: Aula[] = [];
  private queimas: Queima[] = [];

  private seqAluno = 100;
  private seqMensalidade = 1000;
  private seqAula = 5000;
  private seqQueima = 8000;

  // ===== CRUD ALUNOS =====
  listar(): Student[] {
    return [...this.alunos];
  }

  buscarPorId(id: number): Student | undefined {
    return this.alunos.find(a => a.id === id);
  }

  cadastrar(novo: Student): Student {
    const toCreate: Student = { 
      ...novo, 
      id: ++this.seqAluno,
      criadoEm: new Date().toISOString(),
      ativo: novo.ativo ?? true
    };
    
    this.alunos.push(toCreate);
    this.gerarMensalidadesIniciais(toCreate);
    return toCreate;
  }

  atualizar(id: number, dados: Partial<Student>): Student | null {
    const index = this.alunos.findIndex(a => a.id === id);
    if (index === -1) return null;

    const atualizado = {
      ...this.alunos[index],
      ...dados,
      atualizadoEm: new Date().toISOString()
    };

    this.alunos[index] = atualizado;
    return atualizado;
  }

  excluir(id: number): boolean {
    const index = this.alunos.findIndex(a => a.id === id);
    if (index === -1) return false;

    this.alunos.splice(index, 1);
    return true;
  }

  // ===== GESTÃO DE MENSAIDADES =====
  gerarMensalidadesIniciais(aluno: Student): void {
    if (!aluno.dataInicio || !aluno.valorMensalidade) return;

    const dataInicio = new Date(aluno.dataInicio);
    const mesAtual = dataInicio.getMonth() + 1;
    const anoAtual = dataInicio.getFullYear();
    const diaVencimento = aluno.diaVencimento || 10;

    // Gera mensalidades para o ano atual
    for (let mes = mesAtual; mes <= 12; mes++) {
      const vencimento = new Date(anoAtual, mes - 1, diaVencimento);
      const mensalidade: Mensalidade = {
        id: ++this.seqMensalidade,
        alunoId: aluno.id!,
        mes,
        ano: anoAtual,
        vencimento: vencimento.toISOString().split('T')[0],
        valor: aluno.valorMensalidade!,
        status: 'EM_ABERTO',
        aulasGeradas: 4,
        aulasRealizadas: 0,
        criadoEm: new Date().toISOString()
      };

      this.mensalidades.push(mensalidade);
      this.gerarAulasParaMensalidade(mensalidade);
    }
  }

  gerarMensalidade(alunoId: number, mes: number, ano: number): Mensalidade | null {
    const aluno = this.buscarPorId(alunoId);
    if (!aluno || !aluno.valorMensalidade) return null;

    const diaVencimento = aluno.diaVencimento || 10;
    const vencimento = new Date(ano, mes - 1, diaVencimento);
    
    const mensalidade: Mensalidade = {
      id: ++this.seqMensalidade,
      alunoId,
      mes,
      ano,
      vencimento: vencimento.toISOString().split('T')[0],
      valor: aluno.valorMensalidade,
      status: 'EM_ABERTO',
      aulasGeradas: 4,
      aulasRealizadas: 0,
      criadoEm: new Date().toISOString()
    };

    this.mensalidades.push(mensalidade);
    this.gerarAulasParaMensalidade(mensalidade);
    return mensalidade;
  }

  // ===== GESTÃO DE AULAS =====
  gerarAulasParaMensalidade(mensalidade: Mensalidade): void {
    const aluno = this.buscarPorId(mensalidade.alunoId);
    if (!aluno) return;

    // Gera 4 aulas para a mensalidade
    for (let i = 0; i < 4; i++) {
      const dataAula = new Date(mensalidade.vencimento);
      dataAula.setDate(dataAula.getDate() + (i * 7)); // Uma aula por semana

      const aula: Aula = {
        id: ++this.seqAula,
        alunoId: mensalidade.alunoId,
        mensalidadeId: mensalidade.id,
        data: dataAula.toISOString().split('T')[0],
        horarioInicio: '14:00',
        horarioFim: '17:00',
        duracao: 180, // 3 horas
        status: 'AGENDADA',
        presenca: 'PENDENTE',
        tipo: 'TEORICO_PRATICA',
        criadoEm: new Date().toISOString()
      };

      this.aulas.push(aula);
    }
  }

  registrarPresenca(aulaId: number, presenca: 'PRESENTE' | 'AUSENTE' | 'JUSTIFICADA'): boolean {
    const aula = this.aulas.find(a => a.id === aulaId);
    if (!aula) return false;

    aula.presenca = presenca;
    aula.atualizadoEm = new Date().toISOString();

    if (presenca === 'PRESENTE') {
      aula.status = 'REALIZADA';
      this.atualizarAulasRealizadas(aula.mensalidadeId!);
    }

    return true;
  }

  private atualizarAulasRealizadas(mensalidadeId: number): void {
    const mensalidade = this.mensalidades.find(m => m.id === mensalidadeId);
    if (mensalidade) {
      const aulasRealizadas = this.aulas.filter(a => 
        a.mensalidadeId === mensalidadeId && a.presenca === 'PRESENTE'
      ).length;
      mensalidade.aulasRealizadas = aulasRealizadas;
    }
  }

  // ===== GESTÃO DE QUEIMAS =====
  agendarQueima(queima: Omit<Queima, 'id' | 'criadoEm'>): Queima {
    const novaQueima: Queima = {
      ...queima,
      id: ++this.seqQueima,
      criadoEm: new Date().toISOString()
    };

    this.queimas.push(novaQueima);
    return novaQueima;
  }

  // ===== RELATÓRIOS E ESTATÍSTICAS =====
  contarMensalidadesAtrasadas(): number {
    const hoje = new Date().toISOString().split('T')[0];
    return this.mensalidades.filter(m => 
      m.status === 'EM_ABERTO' && m.vencimento < hoje
    ).length;
  }

  calcularReceitaMensal(mes: number, ano: number): number {
    return this.mensalidades
      .filter(m => m.mes === mes && m.ano === ano && m.status === 'PAGO')
      .reduce((sum, m) => sum + (m.valorPago || 0), 0);
  }

  calcularReceitaTotal(): number {
    return this.mensalidades
      .filter(m => m.status === 'PAGO')
      .reduce((sum, m) => sum + (m.valorPago || 0), 0);
  }

  listarAlunosAtivos(): Student[] {
    return this.alunos.filter(a => a.ativo);
  }

  listarMensalidadesPorAluno(alunoId: number): Mensalidade[] {
    return this.mensalidades.filter(m => m.alunoId === alunoId);
  }

  listarAulasPorAluno(alunoId: number): Aula[] {
    return this.aulas.filter(a => a.alunoId === alunoId);
  }

  listarQueimasPorAluno(alunoId: number): Queima[] {
    return this.queimas.filter(q => q.alunoId === alunoId);
  }

  // ===== VALIDAÇÕES =====
  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validarTelefone(telefone: string): boolean {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    return telefoneLimpo.length >= 10 && telefoneLimpo.length <= 11;
  }
}
