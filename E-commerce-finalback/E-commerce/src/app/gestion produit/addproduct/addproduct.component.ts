import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Product } from '../product';

import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ProductModule } from './product.module';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterLink, ProductModule],

  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css',
  providers: [ProductService],
})
export class AddproductComponent implements OnInit {
  size: any = [
    {
      label: 'Small',
      value: 'S',
    },
    {
      label: 'Medium',
      value: 'M',
    },
    {
      label: 'Large',
      value: 'L',
    },
    {
      label: 'XLarge',
      value: 'XL',
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
  product!: Product;
  url!: string;
  new!: boolean;
  isadmin: boolean = true;
  id!: number;
  constructor(
    private productservice: ProductService,
    private fireStorage: AngularFireStorage,
    private _router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.product = new Product();
      if (params['id']) {
        this.productservice
          .getproduct(Number(params['id']))
          .subscribe((value) => {
            this.product = value;
            this.url = value.imageUrl;
          });
        this.id = +params['id'];
        this.new = false;
      } else {
        this.new = true;
      }
    });
  }
  OnSubmit(form: any) {
    if (this.new) {
      this.product = form.value;
      this.product.imageUrl = this.url;
      this.productservice.addproduct(form.value).subscribe();
    } else {
      this.product = form.value;
      this.product.imageUrl = this.url;
      this.productservice.updateproduct(this.id, form.value).subscribe();
    }
    this._router.navigateByUrl('/products');
  }
  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const path = `yt/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      this.url = url;
    }
  }
}
