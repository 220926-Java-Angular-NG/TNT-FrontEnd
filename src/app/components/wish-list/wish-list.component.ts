import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  wishList?: Product[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if ((this.authService.isLoggedIn()).subscribe()) {
      this.wishList =  this.authService.getUser().wishList;
    }
  }

  removeFromWishList(product : Product) : void {
    if (this.wishList) {
      for (let wish of this.wishList){
        if (wish.id === product.id){
          this.wishList = this.wishList.filter(w => w !== product)
        }
      }
    }
  }

  emptyWishList(){

  }

}
