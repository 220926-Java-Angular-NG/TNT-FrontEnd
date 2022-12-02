import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.css']
})
export class DiscoveryComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.authService.handleLogout()
      localStorage.clear()
      this.router.navigate(['login']);
    });
  }

}
