import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ItemspageComponent } from './components/itemspage/itemspage.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomepageComponent },
  { path: "items", component: ItemspageComponent},
  { path: "cart", component: CartComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "products/:id", component:ProductDetailsComponent},
  { path: "wishlist", component:WishListComponent },
  {path: "change-password",component:ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
