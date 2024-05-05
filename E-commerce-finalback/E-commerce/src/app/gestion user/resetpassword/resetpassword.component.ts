import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../_services/user-auth.service';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css',
  providers: [HttpClientModule, UserAuthService]

})
export class ResetpasswordComponent {
  form: any = { password: null };
  isSuccessful = true;
  isResetPasswordFailed = false;
  errorMessage = '';
  router: Router;
  token: string;
  constructor(private authService: UserAuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.token = params['token'];
        console.log("hi", this.token);
      });
  }

  onSubmit() {
    const { password } = this.form;
    this.authService.resetpassword(this.token, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isResetPasswordFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isResetPasswordFailed = true;
        this.isSuccessful = false;
      }
    );
    this.router.navigate(['/login']);

  }
}
