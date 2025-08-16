import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Student } from '../../../core/models/student';
import { Mensalidade } from '../../../core/models/mensalidade';
import { Aula } from '../../../core/models/aula';
import { Queima } from '../../../core/models/queima';
import { AlunosService } from '../../../core/services/alunos.service';

@Component({
  selector: 'app-aluno-view',
  templateUrl: './aluno-view.component.html',
  styleUrl: './aluno-view.component.scss'
})
export class AlunoViewComponent implements OnInit {
  @Input() aluno!: Student;
  @Output() editarAluno = new EventEmitter<Student>();
  @Output() excluirAluno = new EventEmitter<Student>();
  @Output() gerarMensalidade = new EventEmitter<number>();
  @Output() agendarAula = new EventEmitter<number>();
  @Output() agendarQueima = new EventEmitter<number>();

  mensalidades: Mensalidade[] = [];
  aulas: Aula[] = [];
  queimas: Queima[] = [];

  // Estatísticas
  totalMensalidades = 0;
  mensalidadesPagas = 0;
  mensalidadesAtrasadas = 0;
  totalAulas = 0;
  aulasRealizadas = 0;
  totalQueimas = 0;
  queimasConcluidas = 0;

  constructor(private alunosService: AlunosService) {}

  ngOnInit(): void {
    this.carregarDados();
    this.calcularEstatisticas();
  }

  carregarDados(): void {
    if (this.aluno.id) {
      this.mensalidades = this.alunosService.listarMensalidadesPorAluno(this.aluno.id);
      this.aulas = this.alunosService.listarAulasPorAluno(this.aluno.id);
      this.queimas = this.alunosService.listarQueimasPorAluno(this.aluno.id);
    }
  }

  calcularEstatisticas(): void {
    this.totalMensalidades = this.mensalidades.length;
    this.mensalidadesPagas = this.mensalidades.filter(m => m.status === 'PAGO').length;
    this.mensalidadesAtrasadas = this.mensalidades.filter(m => m.status === 'VENCIDA').length;
    
    this.totalAulas = this.aulas.length;
    this.aulasRealizadas = this.aulas.filter(a => a.status === 'REALIZADA').length;
    
    this.totalQueimas = this.queimas.length;
    this.queimasConcluidas = this.queimas.filter(q => q.status === 'CONCLUIDA').length;
  }

  // Métodos para Mensalidades
  onGerarNovaMensalidade(): void {
    if (this.aluno.id) {
      this.gerarMensalidade.emit(this.aluno.id);
    }
  }

  visualizarMensalidade(mensalidade: Mensalidade): void {
    console.log('Visualizar mensalidade:', mensalidade);
    // TODO: Implementar dialog de visualização de mensalidade
  }

  editarMensalidade(mensalidade: Mensalidade): void {
    console.log('Editar mensalidade:', mensalidade);
    // TODO: Implementar dialog de edição de mensalidade
  }

  getStatusMensalidadeLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'EM_ABERTO': 'Em Aberto',
      'PAGO_PARCIAL': 'Pago Parcial',
      'PAGO': 'Pago',
      'VENCIDA': 'Vencida',
      'CANCELADA': 'Cancelada'
    };
    return labels[status] || status;
  }

  getStatusMensalidadeSeverity(status: string): string {
    const severities: { [key: string]: string } = {
      'EM_ABERTO': 'warning',
      'PAGO_PARCIAL': 'info',
      'PAGO': 'success',
      'VENCIDA': 'danger',
      'CANCELADA': 'secondary'
    };
    return severities[status] || 'info';
  }

  // Métodos para Aulas
  onAgendarNovaAula(): void {
    if (this.aluno.id) {
      this.agendarAula.emit(this.aluno.id);
    }
  }

  visualizarAula(aula: Aula): void {
    console.log('Visualizar aula:', aula);
    // TODO: Implementar dialog de visualização de aula
  }

  editarAula(aula: Aula): void {
    console.log('Editar aula:', aula);
    // TODO: Implementar dialog de edição de aula
  }

  getPresencaLabel(presenca: string): string {
    const labels: { [key: string]: string } = {
      'PRESENTE': 'Presente',
      'AUSENTE': 'Ausente',
      'JUSTIFICADA': 'Justificada',
      'PENDENTE': 'Pendente'
    };
    return labels[presenca] || presenca;
  }

  getPresencaSeverity(presenca: string): string {
    const severities: { [key: string]: string } = {
      'PRESENTE': 'success',
      'AUSENTE': 'danger',
      'JUSTIFICADA': 'warning',
      'PENDENTE': 'info'
    };
    return severities[presenca] || 'info';
  }

  // Métodos para Queimas
  onAgendarNovaQueima(): void {
    if (this.aluno.id) {
      this.agendarQueima.emit(this.aluno.id);
    }
  }

  visualizarQueima(queima: Queima): void {
    console.log('Visualizar queima:', queima);
    // TODO: Implementar dialog de visualização de queima
  }

  editarQueima(queima: Queima): void {
    console.log('Editar queima:', queima);
    // TODO: Implementar dialog de edição de queima
  }

  getStatusQueimaLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'AGENDADA': 'Agendada',
      'EM_ANDAMENTO': 'Em Andamento',
      'CONCLUIDA': 'Concluída',
      'CANCELADA': 'Cancelada'
    };
    return labels[status] || status;
  }

  getStatusQueimaSeverity(status: string): string {
    const severities: { [key: string]: string } = {
      'AGENDADA': 'info',
      'EM_ANDAMENTO': 'warning',
      'CONCLUIDA': 'success',
      'CANCELADA': 'danger'
    };
    return severities[status] || 'info';
  }

  // Métodos existentes
  onEditar(): void {
    this.editarAluno.emit(this.aluno);
  }

  onExcluir(): void {
    this.excluirAluno.emit(this.aluno);
  }

  getNivelLabel(nivel?: string): string {
    if (!nivel) return 'Não informado';
    const labels: { [key: string]: string } = {
      'INICIANTE': 'Iniciante',
      'INTERMEDIARIO': 'Intermediário',
      'AVANCADO': 'Avançado'
    };
    return labels[nivel] || nivel;
  }

  getFormaPagamentoLabel(forma?: string): string {
    if (!forma) return 'Não informado';
    const labels: { [key: string]: string } = {
      'PIX': 'PIX',
      'CARTAO': 'Cartão',
      'DINHEIRO': 'Dinheiro',
      'TRANSFERENCIA': 'Transferência'
    };
    return labels[forma] || forma;
  }
}
