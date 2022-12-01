import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { HomepageComponent } from '../homepage/homepage.component';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let productService: ProductService;
  let router:RouterTestingModule;
  let cartService: CartService;
  let authService: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [{path:'home', component:HomepageComponent}]
        )
      ]
    })
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'],['post']);
    productService = new ProductService(httpClientSpy);
    authService = new AuthService(httpClientSpy);
    cartService = new CartService(httpClientSpy);
    //router = new RouterTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
