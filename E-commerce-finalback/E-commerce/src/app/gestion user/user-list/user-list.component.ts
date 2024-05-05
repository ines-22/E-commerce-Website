import { Component, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { filter } from 'rxjs/operators';
import { UserGestionService } from '../../_services/user-gestion.service';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../../_services/token-storage.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAuthService } from '../../_services/user-auth.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgArrayPipesModule } from 'ngx-pipes';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgbModule, CommonModule, FormsModule, HttpClientModule, RouterLink, NgxPaginationModule, NgArrayPipesModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  providers: [HttpClientModule, UserAuthService, UserGestionService]

})
export class UserListComponent {
  closeResult: string;
  // users: Observable<User[]>;
  users: any;
  p: number = 1;
  count: number = 3;
  searchText: any;
  isLoggedIn = false;
  constructor(private userServiceGestService: UserGestionService, private tokenStorageService: TokenStorageService,
    private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }
    this.reloadData();
  }

  reloadData() {
    this.userServiceGestService.getUserList().subscribe(data => {
      console.log(data);
      this.users = data;
      console.log(this.users);

    }, error => console.log(error));
    console.log(this.users);
  }


  deleteUser(id: number) {
    this.userServiceGestService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}
