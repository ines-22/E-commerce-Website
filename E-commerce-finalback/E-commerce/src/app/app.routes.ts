import { Routes } from '@angular/router';
import { ForgotpasswordComponent } from './gestion user/forgotpassword/forgotpassword.component';
import { LoginComponent } from './gestion user/login/login.component';
import { SignupComponent } from './gestion user/signup/signup.component';
import { ResetpasswordComponent } from './gestion user/resetpassword/resetpassword.component';
import { ProfileComponent } from './gestion user/profile/profile.component';
import { UserListComponent } from './gestion user/user-list/user-list.component';
import { ProductComponent } from './gestion produit/product/product.component';
import { AddproductComponent } from './gestion produit/addproduct/addproduct.component';
import { CheckoutComponent } from './gestion cart/checkout/checkout.component';
import { CartComponent } from './gestion cart/cart/cart.component';
import { HistoryComponent } from './gestion cart/history/history.component';
import { CheckoutSuccessComponent } from './gestion cart/checkout-success/checkout-success.component';

export const routes: Routes = [
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: ProductComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'products/:id', component: ProductComponent },
  { path: 'products', component: ProductComponent },
  { path: 'addproduct', component: AddproductComponent },
  { path: 'updateproduct/:id', component: AddproductComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'checkout-success', component: CheckoutSuccessComponent },
];
