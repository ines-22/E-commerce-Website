import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../_services/user-auth.service';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
  providers: [HttpClientModule, UserAuthService]
})
export class ForgotpasswordComponent {

  form: any = { email: null };
  isSuccessful = true;
  isForgotPasswordFailed = false;
  errorMessage = '';

  constructor(private authService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { email } = this.form;

    this.authService.forgotpassword(email).subscribe(
      data => {
        console.log(data);
        this.isForgotPasswordFailed = false;
        this.isSuccessful = true;
      },
      err => {
        this.isForgotPasswordFailed = true;
        this.isSuccessful = false;
      }
    );

    setTimeout(() => { this.router.navigate(['/login']); }, 5000);
  }
}
