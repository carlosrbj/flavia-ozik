import { Component, OnInit } from '@angular/core';
import { AlunosService } from '../../core/services/alunos.service';
import { Student } from '../../core/models/student';

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

  dialogNovoVisivel = false;
  statusOptions = [
    { label: 'Ativo', value: true },
    { label: 'Inativo', value: false }
  ];

  novoAluno: Partial<Student> = {
    ativo: true
  };

  constructor(private alunosService: AlunosService) {}

  ngOnInit(): void {
    this.alunos = this.alunosService.listar();
    this.atualizarPainel();
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
