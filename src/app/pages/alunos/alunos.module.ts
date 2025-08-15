import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosComponent } from './alunos.component';
import { AlunoDetailComponent } from './aluno-detail/aluno-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    AlunosComponent,
    AlunoDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AlunosRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule,
    TagModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule
  ]
})
export class AlunosModule { }
