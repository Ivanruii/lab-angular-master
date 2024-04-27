import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbar, RouterLink, MatButtonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  constructor(
    private router: Router,
    public authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  onLogout() {
    this.snackBar.open('You have logged out of the platform!', 'Close', {
      duration: 3000,
    }),
      this.router.navigate(['/home']);
    this.authService.logout();
  }

  getUserName() {
    return this.authService.getUsername();
  }
}
