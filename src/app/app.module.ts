import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UiUxReactComponent } from './components/ui-ux-react/ui-ux-react.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ItemspageComponent } from './components/itemspage/itemspage.component';
import { FeaturedItemsComponent } from './components/featured-items/featured-items.component';
import { DiscoveryComponent } from './components/discovery/discovery.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProductCardComponent,
    CartComponent,
    CheckoutComponent,
    DisplayProductsComponent,
    ProductDetailsComponent,
    HomepageComponent,
    UiUxReactComponent,
    WishListComponent,
    ChangePasswordComponent,
    CartProductComponent,
    LoaderComponent,
    ItemspageComponent,
    FeaturedItemsComponent,
    DiscoveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
