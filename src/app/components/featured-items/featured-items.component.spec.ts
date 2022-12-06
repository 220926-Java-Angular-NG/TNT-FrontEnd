import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';

import { FeaturedItemsComponent } from './featured-items.component';

describe('FeaturedItemsComponent', () => {
  let component: FeaturedItemsComponent;
  let fixture: ComponentFixture<FeaturedItemsComponent>;

  // product mocks
  const product1:Product = new Product(1, 'p1', 1, 'product 1', 1.00, '../../assets/images/Testing.png', true);
  const product2:Product = new Product(2, 'p1', 1, 'product 1', 1.00, '../../assets/images/Testing.png', true);
  
  // Mocking the authService
  let authServiceSpy : jasmine.SpyObj<AuthService>;

  beforeEach(async () => {

    // Creating a spy object for auth service
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['getFeaturedProducts']);
    authServiceSpy.getFeaturedProducts.and.returnValue(of([product1, product2]))

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(
        [{path: 'login', component: BlankComponent}]
      )],
      declarations: [ FeaturedItemsComponent ],
      providers: [{provide: AuthService, useValue: authServiceSpy}],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedItemsComponent);
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
