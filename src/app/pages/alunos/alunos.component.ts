import { Component, OnInit } from '@angular/core';
import { AlunosService } from '../../core/services/alunos.service';
import { Student } from '../../core/models/student';
import { Mensalidade } from '../../core/models/mensalidade';
import { Aula } from '../../core/models/aula';
import { Queima } from '../../core/models/queima';

// Interface para nova mensalidade
interface NovaMensalidade {
  alunoId?: number;
  mes?: number;
  ano?: number;
  valor?: number;
  desconto?: number;
  diaVencimento?: number;
  observacoes?: string;
}

// Interface para nova aula
interface NovaAula {
  alunoId?: number;
  data?: string;
  horario?: string;
  duracao?: number;
  conteudo?: string;
  observacoes?: string;
}

// Interface para nova queima
interface NovaQueima {
  alunoId?: number;
  data?: string;
  tipo?: string;
  custo?: number;
  observacoes?: string;
}

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss'
})
export class AlunosComponent implements OnInit {
  alunos: Student[] = [];
  totalAlunos = 0;
  totalAtivos = 0;
  receitaMensal = 0;
  mensalidadesAtrasadas = 0;

  // Propriedades para controlar a visualização
  alunoSelecionado: Student | null = null;
  
  // Propriedades para controlar a edição
  modoEdicao = false;
  alunoEmEdicao: Student | null = null;

  // Propriedades para controlar os dialogs
  dialogNovoVisivel = false;
  dialogMensalidadeVisivel = false;
  dialogAulaVisivel = false;
  dialogQueimaVisivel = false;

  // Opções para os dropdowns
  statusOptions = [
    { label: 'Ativo', value: true },
    { label: 'Inativo', value: false }
  ];

  mesesOptions = [
    { label: 'Janeiro', value: 1 },
    { label: 'Fevereiro', value: 2 },
    { label: 'Março', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Maio', value: 5 },
    { label: 'Junho', value: 6 },
    { label: 'Julho', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Setembro', value: 9 },
    { label: 'Outubro', value: 10 },
    { label: 'Novembro', value: 11 },
    { label: 'Dezembro', value: 12 }
  ];

  anosOptions = [
    { label: '2024', value: 2024 },
    { label: '2025', value: 2025 },
    { label: '2026', value: 2026 }
  ];

  tiposQueima = [
    { label: 'Biscoito', value: 'BISCOITO' },
    { label: 'Esmalte', value: 'ESMALTE' },
    { label: 'Raku', value: 'RAKU' },
    { label: 'Outro', value: 'OUTRO' }
  ];

  // Dados para novos registros
  novoAluno: Partial<Student> = {
    ativo: true
  };

  novaMensalidade: NovaMensalidade = {
    desconto: 0,
    diaVencimento: 10
  };

  novaAula: NovaAula = {
    duracao: 3
  };

  novaQueima: NovaQueima = {};

  constructor(private alunosService: AlunosService) {}

  ngOnInit(): void {
    this.alunos = this.alunosService.listar();
    this.atualizarPainel();
  }

  // Getter para alunos ativos
  get alunosAtivos(): Student[] {
    return this.alunos.filter(a => a.ativo);
  }

  atualizarPainel(): void {
    this.totalAlunos = this.alunos.length;
    this.totalAtivos = this.alunos.filter(a => a.ativo).length;
    this.receitaMensal = this.alunos.filter(a => a.ativo).reduce((sum, a) => sum + (a.valorMensalidade || 0), 0);
    this.mensalidadesAtrasadas = this.alunosService.contarMensalidadesAtrasadas();
  }

  abrirDialogNovo(): void { 
    this.dialogNovoVisivel = true; 
  }

  // Métodos para Mensalidades
  abrirDialogMensalidade(alunoId?: number): void {
    this.dialogMensalidadeVisivel = true;
    if (alunoId) {
      this.novaMensalidade.alunoId = alunoId;
    }
    this.resetarNovaMensalidade();
  }

  resetarNovaMensalidade(): void {
    this.novaMensalidade = {
      desconto: 0,
      diaVencimento: 10
    };
  }

  gerarMensalidade(): void {
    if (!this.novaMensalidade.alunoId || !this.novaMensalidade.mes || !this.novaMensalidade.ano || !this.novaMensalidade.valor) {
      return;
    }

    // Buscar o aluno para obter informações adicionais
    const aluno = this.alunos.find(a => a.id === this.novaMensalidade.alunoId);
    if (!aluno) return;

    // Gerar a mensalidade
    const mensalidadeGerada = this.alunosService.gerarMensalidade(
      this.novaMensalidade.alunoId,
      this.novaMensalidade.mes,
      this.novaMensalidade.ano
    );

    if (mensalidadeGerada) {
      // Atualizar o valor e desconto se fornecidos
      if (this.novaMensalidade.valor !== undefined) {
        mensalidadeGerada.valor = this.novaMensalidade.valor;
      }
      if (this.novaMensalidade.desconto !== undefined) {
        mensalidadeGerada.desconto = this.novaMensalidade.desconto;
      }
      if (this.novaMensalidade.diaVencimento) {
        // Recalcular a data de vencimento
        const vencimento = new Date(this.novaMensalidade.ano, this.novaMensalidade.mes - 1, this.novaMensalidade.diaVencimento);
        mensalidadeGerada.vencimento = vencimento.toISOString().split('T')[0];
      }
      if (this.novaMensalidade.observacoes) {
        mensalidadeGerada.observacoes = this.novaMensalidade.observacoes;
      }

      console.log('Mensalidade gerada com sucesso:', mensalidadeGerada);
      this.dialogMensalidadeVisivel = false;
      this.resetarNovaMensalidade();
      
      // Atualizar o painel se necessário
      this.atualizarPainel();
    } else {
      console.error('Erro ao gerar mensalidade');
    }
  }

  // Métodos para Aulas
  abrirDialogAula(alunoId?: number): void {
    this.dialogAulaVisivel = true;
    if (alunoId) {
      this.novaAula.alunoId = alunoId;
    }
    this.resetarNovaAula();
  }

  resetarNovaAula(): void {
    this.novaAula = {
      duracao: 3
    };
  }

  agendarAula(): void {
    if (!this.novaAula.alunoId || !this.novaAula.data || !this.novaAula.horario) {
      return;
    }

    // Criar nova aula
    const aulaGerada = this.alunosService.agendarAula(
      this.novaAula.alunoId,
      this.novaAula.data,
      this.novaAula.horario,
      (this.novaAula.duracao || 3) * 60 // Converter horas para minutos
    );

    if (aulaGerada) {
      if (this.novaAula.conteudo) {
        aulaGerada.tecnica = this.novaAula.conteudo;
      }
      if (this.novaAula.observacoes) {
        aulaGerada.observacoes = this.novaAula.observacoes;
      }

      console.log('Aula agendada com sucesso:', aulaGerada);
      this.dialogAulaVisivel = false;
      this.resetarNovaAula();
    } else {
      console.error('Erro ao agendar aula');
    }
  }

  // Métodos para Queimas
  abrirDialogQueima(alunoId?: number): void {
    this.dialogQueimaVisivel = true;
    if (alunoId) {
      this.novaQueima.alunoId = alunoId;
    }
    this.resetarNovaQueima();
  }

  resetarNovaQueima(): void {
    this.novaQueima = {};
  }

  agendarQueima(): void {
    if (!this.novaQueima.alunoId || !this.novaQueima.data || !this.novaQueima.tipo) {
      return;
    }

    // Criar nova queima
    const queimaGerada = this.alunosService.agendarQueima({
      alunoId: this.novaQueima.alunoId,
      dataQueima: this.novaQueima.data,
      horarioInicio: '09:00',
      horarioFim: '17:00',
      tipo: this.novaQueima.tipo as any,
      status: 'AGENDADA',
      valor: this.novaQueima.custo,
      observacoes: this.novaQueima.observacoes
    });

    if (queimaGerada) {
      console.log('Queima agendada com sucesso:', queimaGerada);
      this.dialogQueimaVisivel = false;
      this.resetarNovaQueima();
    } else {
      console.error('Erro ao agendar queima');
    }
  }

  cadastrar(): void {
    if (!this.novoAluno.nome) return;
    this.alunosService.cadastrar(this.novoAluno as Student);
    this.alunos = this.alunosService.listar();
    this.atualizarPainel();
    this.dialogNovoVisivel = false;
    this.novoAluno = { ativo: true };
  }

  // Método para visualizar aluno detalhadamente
  visualizar(aluno: Student): void {
    this.alunoSelecionado = aluno;
    this.modoEdicao = false;
    this.alunoEmEdicao = null;
  }

  // Método para voltar à lista de alunos
  voltarLista(): void {
    this.alunoSelecionado = null;
    this.modoEdicao = false;
    this.alunoEmEdicao = null;
  }

  // Método para editar aluno
  editar(aluno: Student): void {
    this.alunoEmEdicao = { ...aluno }; // Cria uma cópia para edição
    this.modoEdicao = true;
    this.alunoSelecionado = null;
  }

  // Método para salvar as edições
  salvarEdicao(alunoEditado: Student): void {
    if (alunoEditado.id) {
      const resultado = this.alunosService.atualizar(alunoEditado.id, alunoEditado);
      if (resultado) {
        // Atualiza a lista e o painel
        this.alunos = this.alunosService.listar();
        this.atualizarPainel();
        
        // Volta para a visualização do aluno atualizado
        this.alunoSelecionado = resultado;
        this.modoEdicao = false;
        this.alunoEmEdicao = null;
        
        console.log('Aluno atualizado com sucesso:', resultado);
      } else {
        console.error('Erro ao atualizar aluno');
      }
    }
  }

  // Método para cancelar a edição
  cancelarEdicao(): void {
    this.modoEdicao = false;
    this.alunoEmEdicao = null;
    
    // Se estava visualizando um aluno, volta para a visualização
    if (this.alunoSelecionado) {
      // Mantém na visualização
    } else {
      // Volta para a lista
      this.voltarLista();
    }
  }

  excluir(aluno: Student): void {
    if (confirm(`Tem certeza que deseja excluir o aluno ${aluno.nome}?`)) {
      this.alunosService.excluir(aluno.id!);
      this.alunos = this.alunosService.listar();
      this.atualizarPainel();
      
      // Se o aluno excluído estava sendo visualizado ou editado, volta para a lista
      if (this.alunoSelecionado?.id === aluno.id || this.alunoEmEdicao?.id === aluno.id) {
        this.voltarLista();
      }
    }
  }
}
