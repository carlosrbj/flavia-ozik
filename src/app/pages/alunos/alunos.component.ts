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

  abrirDialogNovo(): void { this.dialogNovoVisivel = true; }

  cadastrar(): void {
    if (!this.novoAluno.nome) return;
    this.alunosService.cadastrar(this.novoAluno as Student);
    this.alunos = this.alunosService.listar();
    this.atualizarPainel();
    this.dialogNovoVisivel = false;
    this.novoAluno = { ativo: true };
  }

  visualizar(aluno: Student): void {}
  editar(aluno: Student): void {}
  excluir(aluno: Student): void {
    this.alunosService.excluir(aluno.id!);
    this.alunos = this.alunosService.listar();
    this.atualizarPainel();
  }
}
