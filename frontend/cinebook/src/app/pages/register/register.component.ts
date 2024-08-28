import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { RegisterRequest } from '../../services/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {}

  errorMsg: Array<string> = [];
  registrationRequest: RegisterRequest = {
    email: '',
    password: '',
    name: '',
    phone: '',
    tickets: [],
  };

  register() {
    this.errorMsg = [];
    this.authService
      .authRegisterPost({
        body: this.registrationRequest,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.errorMsg = err.error.validationErrors;
        },
      });
  }

  login() {
    this.router.navigate(['login']);
  }
}
