import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../_services/user-auth.service';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HttpClientModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [HttpClientModule, UserAuthService]
})
export class SignupComponent {
  msg = '';
  form: any = {
    firstname: null,
    lastname: null,
    username: null,
    email: null,
    password: null,
    poste: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  router?: Router;

  constructor(private authService: UserAuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { email, password, mobile, first_name, family_name } = this.form;

    this.authService.register(email, password, mobile, first_name, family_name).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router?.navigate(['/login']);

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
