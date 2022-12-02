import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { ProductService } from './product.service';
import { of } from 'rxjs';

fdescribe('ProductService', () => {
  let service: ProductService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  var products:Product[] = [];
  const product:Product = new Product(1, 'p1', 1, 'product 1', 1.00, 'img URL', true);
  const blankProduct:Product = new Product(0, '', 0, '', 0, '', false);
  
  beforeEach(() => {
    
    for (let i=0; i<3; i++){
      products.push(product)
    }

    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get','patch']);

    TestBed.configureTestingModule({
      providers:[{provide:HttpClient, useValue: httpClientSpy}]
    });
    service = TestBed.inject(ProductService);

    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProducts should return a list of objects from the db', ()=>{
    httpClientSpy.get.and.returnValue(of(products))
    let returnedProducts:Product[] = [];
    service.getProducts().subscribe(ps=>{returnedProducts=ps});

    expect(returnedProducts).toBe(products);
  });

  it('getSingleProduct should return a single object from the db', ()=>{
    httpClientSpy.get.and.returnValue(of(product))
    let returnedProduct:Product = blankProduct;
    service.getSingleProduct(1).subscribe(p=>{returnedProduct=p});

    expect(returnedProduct.id).toBe(product.id);
  });
});
