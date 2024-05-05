import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Product } from '../product';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FilterPipe } from '../../filter.pipe';
import { TokenStorageService } from '../../_services/token-storage.service';
import { UserGestionService } from '../../_services/user-gestion.service';
import { User } from '../../gestion user/user';
import { CartItemsService } from '../../_services/cart-items.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [ProductService, TokenStorageService, UserGestionService, CartItemsService],
  imports: [HttpClientModule, FormsModule, RouterLink, FilterPipe],
})
export class ProductComponent implements OnInit {
  private roles: string[] = [];
  listProducts: Product[] = [];
  id!: number;
  isadmin: boolean = false;
  searchext: any;
  product!: any | null;
  filtredvalues: Product[] = [];
  productname: any = [];
  currentUser: any;
  user: any;
  idu: number;
  users: Observable<User[]>;
  isLoggedIn = false;
  public isProductInCart: boolean

  price: any | null = [
    {
      label: '< 50',
      value: [0, 49],
    },
    {
      label: '50-99.99',
      value: [50, 99],
    },
    {
      label: '100-149.99',
      value: [100, 149],
    },
    {
      label: '>= 150',
      value: [150, Infinity],
    },
  ];
  color: any = [
    'Green',
    'Black',
    'Yellow',
    'Red',
    'Pink',
    'White',
    'Orange',
    'Gold',
    'Silver',
    'Purple',
    'Blue',
    'Brown',
  ];
  season: any = ['Winter', 'Summer', 'Fall', 'Spring'];

  constructor(
    private producservice: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private userServiceGestService: UserGestionService, private tokenStorageService: TokenStorageService,
    private cartItemsService: CartItemsService,
    private snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }
    this.currentUser = this.tokenStorageService.getUser();
    this.reloadData();
    this.user = new User();
    this.idu = this.tokenStorageService.getId();
    this.userServiceGestService.getUser(this.idu)
      .subscribe(data => {
        console.log(data)
        this.user = data;

      }, error => console.log(error));

    let user = this.tokenStorageService.getUser();
    console.log(user);
    this.roles = user.roles;
    if (this.roles) this.isadmin = this.roles.includes('ROLE_ADMIN');

    if (this.route.snapshot.paramMap.get('id')) {
      console.log(this.route.snapshot.paramMap.get('id'));
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.producservice.getproduct(this.id).subscribe(
        (products) => {
          this.listProducts.push(products);
        },
        (error) => {
          console.log('error mtaana' + error);
        }
      );
    } else {
      this.producservice.getproducts().subscribe(
        (products) => {
          this.listProducts = products.sort(
            (a: Product, b: Product) => a.productPrice - b.productPrice
          );
          console.log(this.listProducts);

          this.productname = [
            ...new Set(products.map((product: Product) => product.productName)),
          ];
        },
        (error) => {
          console.log('error mtaana' + error);
        }
      );

    }
  }
  reloadData() {
    this.users = this.userServiceGestService.getUser(this.id);
  }

  addToCart(idu: number, idp: number) {
    this.cartItemsService.addToUserCart(idu, idp).subscribe(res => {
      this.router.navigate(['/cart']);

      this.snackBar.open('Product added to cart', 'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
    },
      error => {
        this.snackBar.open('This product already exist in the cart', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar']
        });
      });
  }


  delete(id: number): void {
    Swal.fire({
      title: 'Would you like to delete the product?',
      text: 'This action can not be canceled',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.producservice.deleteproduct(id).subscribe(() => {
          this.producservice.getproducts().subscribe(
            (products) => {
              this.listProducts = products;
            },
            (error) => {
              console.log('error mtaana' + error);
            }
          );
        });
        Swal.fire(
          'Deleted!',
          'Producut has been successfully deleted',
          'success'
        );
      }
    });
  }
  sort(event: any) {
    switch (event.target.value) {
      case 'Low': {
        this.listProducts = this.listProducts.sort(
          (a: Product, b: Product) => a.productPrice - b.productPrice
        );
        break;
      }

      case 'High': {
        this.listProducts = this.listProducts.sort(
          (a: Product, b: Product) => b.productPrice - a.productPrice
        );
        break;
      }
      default: {
        this.listProducts = this.listProducts.sort(
          (a: Product, b: Product) => a.productPrice - b.productPrice
        );
        break;
      }
    }
    return this.listProducts;
  }
  goToOtherRoute(id: number) {
    this.router.navigate(['/updateproduct', id]);
  }
  OnSubmit(form: any) {
    this.product = form.value;

    this.filtredvalues = this.listProducts.filter((product) => {
      return (
        (!this.product?.productColor ||
          product.productColor === this.product.productColor) &&
        (!this.product?.productSeason ||
          product.productSeason === this.product.productSeason) &&
        (!this.product?.productSexe ||
          product.productSexe === this.product.productSexe) &&
        (!this.product?.productName ||
          product.productName === this.product.productName) &&
        (!this.product?.productPrice ||
          (product.productPrice >= +this.product.productPrice.split(',')[0] &&
            product.productPrice <= +this.product.productPrice.split(',')[1]))
      );
    });
    console.log(this.listProducts);
  }
}
