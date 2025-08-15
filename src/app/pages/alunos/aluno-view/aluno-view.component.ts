import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../../../core/models/student';
import { Mensalidade } from '../../../core/models/mensalidade';
import { Aula } from '../../../core/models/aula';
import { Queima } from '../../../core/models/queima';
import { AlunosService } from '../../../core/services/alunos.service';

@Component({
  selector: 'app-aluno-view',
  templateUrl: './aluno-view.component.html',
  styleUrls: ['./aluno-view.component.scss']
})
export class AlunoViewComponent implements OnInit {
  @Input() aluno?: Student;
  @Output() editarAluno = new EventEmitter<Student>();
  @Output() excluirAluno = new EventEmitter<Student>();

  mensalidades: Mensalidade[] = [];
  aulas: Aula[] = [];
  queimas: Queima[] = [];

  // Estatísticas
  mensalidadesEmAberto = 0;
  queimasEmAberto = 0;
  totalPagoMensalidades = 0;
  totalPagoQueimas = 0;
  proximosVencimentos: Mensalidade[] = [];

  constructor(private alunosService: AlunosService) {}

  ngOnInit(): void {
    if (this.aluno) {
      this.carregarDados();
    }
  }

  private carregarDados(): void {
    if (!this.aluno?.id) return;

    // Carregar mensalidades
    this.mensalidades = this.alunosService.listarMensalidadesPorAluno(this.aluno.id);
    
    // Carregar aulas
    this.aulas = this.alunosService.listarAulasPorAluno(this.aluno.id);
    
    // Carregar queimas
    this.queimas = this.alunosService.listarQueimasPorAluno(this.aluno.id);
    
    // Calcular estatísticas
    this.calcularEstatisticas();
  }

  private calcularEstatisticas(): void {
    // Mensalidades em aberto
    this.mensalidadesEmAberto = this.mensalidades.filter(m => 
      m.status === 'EM_ABERTO' || m.status === 'VENCIDA'
    ).length;

    // Queimas em aberto
    this.queimasEmAberto = this.queimas.filter(q => 
      q.status === 'AGENDADA' || q.status === 'EM_ANDAMENTO'
    ).length;

    // Total pago mensalidades
    this.totalPagoMensalidades = this.mensalidades
      .filter(m => m.status === 'PAGO')
      .reduce((sum, m) => sum + (m.valorPago || 0), 0);

    // Total pago queimas
    this.totalPagoQueimas = this.queimas
      .filter(q => q.pago)
      .reduce((sum, q) => sum + (q.valor || 0), 0);

    // Próximos vencimentos (próximos 3 meses)
    const hoje = new Date();
    this.proximosVencimentos = this.mensalidades
      .filter(m => m.status === 'EM_ABERTO' && new Date(m.vencimento) >= hoje)
      .sort((a, b) => new Date(a.vencimento).getTime() - new Date(b.vencimento).getTime())
      .slice(0, 3);
  }

  // Métodos de ação
  editar(): void {
    this.editarAluno.emit(this.aluno!);
  }

  excluir(): void {
    this.excluirAluno.emit(this.aluno!);
  }

  gerarNovaMensalidade(): void {
    // Implementar geração de nova mensalidade
    console.log('Gerar nova mensalidade');
  }

  registrarPagamento(mensalidade: Mensalidade): void {
    // Implementar registro de pagamento
    console.log('Registrar pagamento', mensalidade);
  }

  verAulas(mensalidade: Mensalidade): void {
    // Implementar visualização de aulas
    console.log('Ver aulas', mensalidade);
  }

  editarMensalidade(mensalidade: Mensalidade): void {
    // Implementar edição de mensalidade
    console.log('Editar mensalidade', mensalidade);
  }

  editarAula(aula: Aula): void {
    // Implementar edição de aula
    console.log('Editar aula', aula);
  }

  excluirAula(aula: Aula): void {
    // Implementar exclusão de aula
    console.log('Excluir aula', aula);
  }

  agendarQueima(): void {
    // Implementar agendamento de queima
    console.log('Agendar queima');
  }

  verQueima(queima: Queima): void {
    // Implementar visualização de queima
    console.log('Ver queima', queima);
  }

  editarQueima(queima: Queima): void {
    // Implementar edição de queima
    console.log('Editar queima', queima);
  }

  // Métodos auxiliares para labels
  getNivelLabel(nivel?: string): string {
    const labels: { [key: string]: string } = {
      'INICIANTE': 'Iniciante',
      'INTERMEDIARIO': 'Intermediário',
      'AVANCADO': 'Avançado'
    };
    return labels[nivel || ''] || 'Não informado';
  }

  getPagamentoLabel(forma?: string): string {
    const labels: { [key: string]: string } = {
      'PIX': 'PIX',
      'CARTAO': 'Cartão',
      'DINHEIRO': 'Dinheiro',
      'TRANSFERENCIA': 'Transferência'
    };
    return labels[forma || ''] || 'Não informado';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'EM_ABERTO': 'Em Aberto',
      'PAGO_PARCIAL': 'Pago Parcial',
      'PAGO': 'Pago',
      'VENCIDA': 'Vencida',
      'CANCELADA': 'Cancelada'
    };
    return labels[status] || status;
  }

  getStatusSeverity(status: string): string {
    const severities: { [key: string]: string } = {
      'EM_ABERTO': 'warning',
      'PAGO_PARCIAL': 'info',
      'PAGO': 'success',
      'VENCIDA': 'danger',
      'CANCELADA': 'secondary'
    };
    return severities[status] || 'info';
  }

  getTipoLabel(tipo: string): string {
    const labels: { [key: string]: string } = {
      'TEORICA': 'Teórica',
      'PRATICA': 'Prática',
      'TEORICO_PRATICA': 'Teórico-Prática'
    };
    return labels[tipo] || tipo;
  }

  getStatusAulaLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'AGENDADA': 'Agendada',
      'EM_ANDAMENTO': 'Em Andamento',
      'REALIZADA': 'Realizada',
      'CANCELADA': 'Cancelada',
      'REPROGRAMADA': 'Reprogramada'
    };
    return labels[status] || status;
  }

  getStatusAulaSeverity(status: string): string {
    const severities: { [key: string]: string } = {
      'AGENDADA': 'info',
      'EM_ANDAMENTO': 'warning',
      'REALIZADA': 'success',
      'CANCELADA': 'danger',
      'REPROGRAMADA': 'secondary'
    };
    return severities[status] || 'info';
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

  getTipoQueimaLabel(tipo: string): string {
    const labels: { [key: string]: string } = {
      'BISCOITO': 'Biscoito',
      'ESMALTE': 'Esmalte',
      'RAKU': 'Raku',
      'OUTRO': 'Outro'
    };
    return labels[tipo] || tipo;
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

  getResultadoLabel(resultado?: string): string {
    if (!resultado) return 'N/A';
    const labels: { [key: string]: string } = {
      'SUCESSO': 'Sucesso',
      'PARCIAL': 'Parcial',
      'FALHA': 'Falha'
    };
    return labels[resultado] || resultado;
  }
}
