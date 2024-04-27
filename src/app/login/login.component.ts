import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = new FormControl('');
  password = new FormControl('');
  sub!: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.sub = this.authService
      .login(this.username.value, this.password.value)
      .subscribe({
        next: (isLoggedIn) => {
          if (isLoggedIn) {
            this.router.navigate(['/dashboard']);
          } else {
            alert(
              'Incorrect username or password. Use user: admin, password: admin'
            );
          }
        },
        error: (err) => {
          console.error('Error durante el inicio de sesión:', err);
        },
        complete: () => {},
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
