import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showHamburger: Boolean = true;
  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }

  onClickLogo() {
    this.router.navigateByUrl('');
  }

  onClickButton() {
    this.showHamburger = !this.showHamburger;
  }

  onClickButton2() {
    this.showHamburger = !this.showHamburger;
    this.router.navigateByUrl('cart');
  }

  onClickHamburger() {
    this.showHamburger = !this.showHamburger;
  }

  onClickCart() {
    if(this.authService.indexBouncer > 0) {
      this.router.navigateByUrl('cart');
    }
  }
}
