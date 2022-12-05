import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-featured-items',
  templateUrl: './featured-items.component.html',
  styleUrls: ['./featured-items.component.css']
})
export class FeaturedItemsComponent implements OnInit {



  featuredProducts:Product[] = [];

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.getFeaturedProducts().subscribe(
      (products)=>this.featuredProducts=products
    );
  }

}
