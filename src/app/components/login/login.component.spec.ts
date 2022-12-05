import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseHandlerService } from 'src/app/services/response-handler.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authServiceSpy : jasmine.SpyObj<AuthService>;
  let respHandlerServiceSpy : jasmine.SpyObj<ResponseHandlerService>;

  // Mocking featured product
  const product1:Product = new Product(1, 'p1', 8, 'product 1', 1.00, '../../assets/images/Testing.png', true);
  
  beforeEach(async () => {

    // Mocking the services
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['isLoggedIn', 'getUser', 'updateUser', 'setUser', 'getFeaturedProducts']);
    respHandlerServiceSpy = jasmine.createSpyObj<ResponseHandlerService>('ResponseHandlerService', ['respPresent']);
    authServiceSpy.isLoggedIn.and.returnValue(of(true));
    
    respHandlerServiceSpy.respPresent = false;

    authServiceSpy.getFeaturedProducts.and.returnValue(of([product1]));
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [{path: 'login', component: BlankComponent}]
      )],
      declarations: [ LoginComponent ],
      providers: [{provide: AuthService, useValue: authServiceSpy},
        {provide: ResponseHandlerService, useValue: respHandlerServiceSpy}],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  @Component({
    selector: `blank-component`,
    template: `<div></div>`
  })
  class BlankComponent{

  }
});
