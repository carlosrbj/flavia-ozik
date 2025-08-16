import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
      { path: 'alunos', loadChildren: () => import('./pages/alunos/alunos.module').then(m => m.AlunosModule) },
      { path: 'fornadas', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
      { path: 'catalogo', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
      { path: 'custos-atelie', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
      { path: 'capivarias', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
