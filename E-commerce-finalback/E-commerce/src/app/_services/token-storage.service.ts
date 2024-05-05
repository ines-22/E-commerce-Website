import { Injectable, PLATFORM_ID, afterNextRender, inject } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  tok!: string | null;
  user!: any;

  constructor(private router: Router) {

  }

  signOut(): void {
    this.router.navigate(['/login']);

    window.sessionStorage.clear();

  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    if (typeof window !== "undefined") {
      this.tok = window.sessionStorage.getItem(TOKEN_KEY);
    }
    return this.tok;
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    if (typeof window !== "undefined") {
      this.user = window.sessionStorage.getItem(USER_KEY);
    }
    if (this.user) {
      return JSON.parse(this.user);
    }
    return {};
  }

  public getId(): any {
    if (typeof window !== "undefined") {
      this.user = window.sessionStorage.getItem(USER_KEY);
    }
    if (this.user) {
      return JSON.parse(this.user)['id'];
    }
    else return 0;
  }
}
