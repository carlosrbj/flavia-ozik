import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../core/models/student';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit {
  @Input() aluno?: Student;
  @Output() salvar = new EventEmitter<Student>();
  @Output() cancelar = new EventEmitter<void>();

  form!: FormGroup;
  isEditing = false;
  isSubmitting = false;

  // Opções para os dropdowns
  nivelOptions = [
    { label: 'Iniciante', value: 'INICIANTE' },
    { label: 'Intermediário', value: 'INTERMEDIARIO' },
    { label: 'Avançado', value: 'AVANCADO' }
  ];

  pagamentoOptions = [
    { label: 'PIX', value: 'PIX' },
    { label: 'Cartão', value: 'CARTAO' },
    { label: 'Dinheiro', value: 'DINHEIRO' },
    { label: 'Transferência', value: 'TRANSFERENCIA' }
  ];

  statusOptions = [
    { label: 'Ativo', value: true },
    { label: 'Inativo', value: false }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    if (this.aluno) {
      this.isEditing = true;
      this.form.patchValue(this.aluno);
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      // Informações Pessoais
      nome: ['', [Validators.required, Validators.minLength(3)]],

      // Contato
      telefone: ['', [Validators.required]],
      telefone2: [''],
      email: ['', [Validators.email]],

      // Informações do Curso
      dataInicio: ['', [Validators.required]],
      nivel: ['INICIANTE'],
      valorMensalidade: ['', [Validators.required, Validators.min(0)]],
      formaPagamento: ['PIX'],
      diaVencimento: [10, [Validators.min(1), Validators.max(31)]],

      // Status e Controle
      ativo: [true],
      motivoInativo: [''],

      // Observações
      observacoes: ['']
    });

    // Observar mudanças no status ativo
    this.form.get('ativo')?.valueChanges.subscribe(ativo => {
      if (!ativo) {
        this.form.get('motivoInativo')?.setValidators([Validators.required]);
      } else {
        this.form.get('motivoInativo')?.clearValidators();
        this.form.get('motivoInativo')?.setValue('');
      }
      this.form.get('motivoInativo')?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isSubmitting = true;
      
      const dados = this.form.value;
      
      // Converter datas para formato ISO
      if (dados.dataInicio) {
        dados.dataInicio = this.convertDateToISO(dados.dataInicio);
      }

      // Se for edição, manter o ID
      if (this.isEditing && this.aluno) {
        dados.id = this.aluno.id;
      }

      this.salvar.emit(dados);
      this.isSubmitting = false;
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.cancelar.emit();
  }

  private convertDateToISO(date: Date): string {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    return date;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  // Getters para facilitar o acesso no template
  get nome() { return this.form.get('nome'); }
  get telefone() { return this.form.get('telefone'); }
  get email() { return this.form.get('email'); }
  get dataInicio() { return this.form.get('dataInicio'); }
  get valorMensalidade() { return this.form.get('valorMensalidade'); }
}
