import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

import { DisplayProductsComponent } from './display-products.component';

describe('DisplayProductsComponent', () => {
  let component: DisplayProductsComponent;
  let fixture: ComponentFixture<DisplayProductsComponent>;
  let productServiceSpy:jasmine.SpyObj<ProductService>;
  beforeEach(async () => {
    const product1:Product = new Product(1, 'p1', 1, 'product 1', 1.00, '../../assets/images/Testing.png', true);
    const product2:Product = new Product(2, 'p2', 2, 'product 2', 1.00, '../../assets/images/Testing.png', false);
    const product3:Product = new Product(3, 'p2', 3, 'product 3', 1.00, '../../assets/images/Testing.png', false);
  

    productServiceSpy = jasmine.createSpyObj<ProductService>('ProductService', ['getProducts'])
    productServiceSpy.getProducts.and.returnValue(of([product1, product2, product3]));
    await TestBed.configureTestingModule({
      declarations: [ DisplayProductsComponent ],
      providers: [{provide:ProductService, useValue: productServiceSpy}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an array of products', ()=>{
    expect(component.allProducts.length).toBe(3);
  })
});
