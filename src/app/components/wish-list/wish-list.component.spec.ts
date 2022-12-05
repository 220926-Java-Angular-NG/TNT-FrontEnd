import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

import { WishListComponent } from './wish-list.component';

describe('WishListComponent', () => {
  let component: WishListComponent;
  let fixture: ComponentFixture<WishListComponent>;

  const product1:Product = new Product(1, 'p1', 1, 'product 1', 1.00, 'img URL', true);
  const product2:Product = new Product(2, 'p1', 1, 'product 1', 1.00, 'img URL', false);
  const product3:Product = new Product(3, 'p1', 1, 'product 1', 1.00, 'img URL', false);

  let user : User;
  const updatedUser: User = {id:1, wishList: [product1, product3]};
  const userWithOutWishList = {id: 1, wishList: []};

  let authServiceSpy : jasmine.SpyObj<AuthService>;
  
  beforeEach(async () => {

    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['isLoggedIn', 'getUser', 'updateUser', 'setUser']);
    user = {id:1, wishList: [product1, product2, product3] };

    authServiceSpy.isLoggedIn.and.returnValue(of(true));
    authServiceSpy.getUser.and.returnValue(user);
   

    await TestBed.configureTestingModule({
      declarations: [ WishListComponent ],
      imports: [ RouterTestingModule.withRoutes(
          [{path: 'login', component: BlankComponent}]
        )],
      providers: [{provide: AuthService, useValue: authServiceSpy}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an array of products', () => {
    expect(component.wishList).toEqual([product1, product2, product3]);
  });

  it ('should have a user', () => {
    expect(component.user).toEqual(user);
  })

  it('should delete the product from the wishlist', () => {
    authServiceSpy.updateUser.and.returnValue(of(updatedUser));
    authServiceSpy.setUser;
    component.removeFromWishList(product2);
    expect(component.wishList).toEqual([product1, product3]);
  })

  it ('should remove all the items from the wishlist', () => {
    authServiceSpy.updateUser.and.returnValue(of(userWithOutWishList));
    authServiceSpy.setUser;
    component.emptyWishList();
    expect(component.wishList).toEqual([]);
  })


  @Component({
    selector: `blank-component`,
    template: `<div></div>`
  })
  class BlankComponent{

  }
});
