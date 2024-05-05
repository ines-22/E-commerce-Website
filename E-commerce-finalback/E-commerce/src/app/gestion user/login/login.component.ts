import { Component } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { UserAuthService } from '../../_services/user-auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../user';
import { Router, RouterLink } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from '../../gestion produit/product/product.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    FormsModule,
    HttpClientModule,
    RouterLink,
    ProductComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserAuthService, TokenStorageService, HttpClientModule],
})
export class LoginComponent {
  background: string = '../../assets/images/neodoc.png';

  form: any = { email: null, password: null };
  isLoggedIn = false;
  isLoginFailed = true;
  roles: string[] = [];
  errorMessage = '';
  email = '';

  forme: any = { name: null, type: null };

  p: number = 1;
  count: number = 15;

  closeResult: string;

  id: number;
  idu: number;
  user: User;

  showAdminBoard: boolean;
  showicon: boolean = true;
  showcontenu: boolean;
  userid: any;

  constructor(
    private httpClient: HttpClient,
    private authService: UserAuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      if (this.tokenStorage.getToken()) {
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.email = this.tokenStorage.getUser().email;
        console.log(this.roles);
      }
    }

    if (this.isLoggedIn) {
      this.user = this.tokenStorage.getUser();
      this.userid = this.user.id;

      this.idu = this.tokenStorage.getId();
      this.roles = this.tokenStorage.getUser().roles;
      console.log(this.idu, this.user, this.roles);
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      (next) => {
        this.tokenStorage.saveToken(next.accessToken);
        this.tokenStorage.saveUser(next);
        this.roles = this.tokenStorage.getUser().roles;
        this.email = this.tokenStorage.getUser().email;
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.reloadPage();
        this.router.navigate(['/profile']);
      },

      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }
}
