import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosComponent } from './alunos.component';
import { AlunoDetailComponent } from './aluno-detail/aluno-detail.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoViewComponent } from './aluno-view/aluno-view.component';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    AlunosComponent,
    AlunoDetailComponent,
    AlunoFormComponent,
    AlunoViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlunosRoutingModule,
    
    // PrimeNG Modules
    TableModule,
    ButtonModule,
    TagModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    CalendarModule,
    TabViewModule,
    CardModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule
  ]
})
export class AlunosModule { }
