import { Component, TemplateRef, inject } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TokenStorageService } from '../../_services/token-storage.service';
import { UserGestionService } from '../../_services/user-gestion.service';
import { NgbModule, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserAuthService } from '../../_services/user-auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgbModule, CommonModule, FormsModule, SidebarComponent, HttpClientModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [HttpClientModule, UserAuthService, UserGestionService]

})
export class ProfileComponent {
  currentUser: any;
  closeResult: string;
  id: number;
  user: any;
  users: Observable<User[]>;
  role: string;
  showAdminBoard: boolean;
  isLoggedIn = false;
  constructor(private route: ActivatedRoute, private router: Router,
    private userServiceGestService: UserGestionService, private modalService: NgbModal, private token: TokenStorageService) { }
  ngOnInit(): void {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
    }
    this.currentUser = this.token.getUser();
    this.reloadData();
    this.user = new User();
    this.id = this.token.getId()
    this.userServiceGestService.getUser(this.id)
      .subscribe(data => {
        console.log(data)
        this.user = data;
        for (let i = 0; i < this.user.roles.length; i++) {
          this.role = this.user.roles[i]?.name;
        }
        if (this.role == "ROLE_ADMIN") {
          this.showAdminBoard = true;
        }
        else this.showAdminBoard = false;
      }, error => console.log(error));
  }
  reloadData() {
    this.users = this.userServiceGestService.getUser(this.id);
  }

  updateUser() {
    console.log(this.token.getToken());
    this.userServiceGestService.updateUser(this.id, this.user).subscribe(
      data => {
        console.log(data);

        this.reloadData();
        alert('compte modifié avec succcés.');
      },
      error => console.log(error));
  }

}
