import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:Product | undefined;
  allProducts:Product[]=[];
  lowThreshold:number = 5

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (resp) => this.allProducts = resp,
      (err) => console.log(err),
      () => console.log("Products Retrieved")
    );
    setTimeout(()=>this.getProductInfo(),500)
  }


  getProductInfo(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    for (let p of this.allProducts){
      if (p.id==id){
        this.product=p;
      }
    }
  }
}
