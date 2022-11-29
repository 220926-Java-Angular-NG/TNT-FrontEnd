import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
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

  addToWishList(product : Product) : void {

    if (this.wishList) {
    this.wishList.push(product);
    this.updateWishList(this.wishList);
    }
  }

  updateWishList(wishList: Product[]) : void {
    let user1: User = this.authService.getUser();
      user1.wishList = wishList;
    
      this.authService.updateUser(user1).subscribe((user) => user1 = user);
      this.authService.setUser(user1);
    }

    

  removeFromWishList(product : Product) : void {
    if (this.wishList) {
      for (let wish of this.wishList){
        if (wish.id === product.id){
          this.wishList = this.wishList.filter(w => w !== product);
          this.updateWishList(this.wishList);
        }
      }
    }
  }

  emptyWishList(){

    this.wishList = [];

    this.updateWishList(this.wishList);

  }

}
