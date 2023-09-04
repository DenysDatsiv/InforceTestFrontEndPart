import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";

interface LoginCredentials {
  userName: string;
  password: string;
}

interface LoginResponse {
  token: string;
  role: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  invalidLogin: boolean;
  userRole: string;
  errorMessage: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials: LoginCredentials = {
      userName: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.authService.login(credentials).subscribe(
      (response: LoginResponse) => {
        if (response && response.role) {
          this.userRole = response.role;
          this.router.navigate(['/short-url', {role: this.userRole, username: credentials.userName}]);
        }
        localStorage.setItem('jwt', response.token);
        this.invalidLogin = false;
      },
      (error) => {
        console.error(error);
        this.invalidLogin = true;
        this.errorMessage = 'An error occurred while logging in. Please try again.';
      }
    );
  }
}
