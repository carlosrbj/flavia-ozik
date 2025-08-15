import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  submit(): void {
    // Mock de autenticação
    if (this.email && this.password) {
      this.router.navigateByUrl('/home');
    }
  }
}
