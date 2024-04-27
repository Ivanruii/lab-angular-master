import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private USER_DATA_KEY = 'user_logged_data';
  private loggedIn = false;
  private username = '';

  constructor() {
    const storedUser = localStorage.getItem(this.USER_DATA_KEY);
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      this.loggedIn = true;
      this.username = userData.username;
    }
  }

  login(username: string | null, password: string | null): Observable<boolean> {
    if (username === 'admin' && password === 'admin') {
      this.loggedIn = true;
      this.username = username;
      localStorage.setItem(
        this.USER_DATA_KEY,
        JSON.stringify({ username: this.username })
      );
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    this.loggedIn = false;
    this.username = '';
    localStorage.removeItem(this.USER_DATA_KEY);
  }

  isLogged(): boolean {
    return this.loggedIn;
  }

  getUsername(): string {
    return this.username;
  }
}
