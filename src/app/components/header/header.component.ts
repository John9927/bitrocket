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
  showPopupError: Boolean = false;

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.showPopupCartMobile = true;
  }

  onClickLogo() {
    this.router.navigateByUrl('');
  }

  onClickButton() {
    this.showHamburger = !this.showHamburger;
  }

  onClickButton2() {
    if (this.authService.indexBouncer > 0) {
      this.router.navigateByUrl('cart');
    } else {
      this.showPopupError = true;

      setTimeout(() => {
        this.showPopupError = false;
      }, 1000)
    }
    this.showHamburger = !this.showHamburger;
  }

  onClickReceiveItemFaster() {
    this.router.navigateByUrl('receive-item-faster');
  }

  onClickHamburger() {
    this.showHamburger = !this.showHamburger;
  }

  onClickCart() {
    if (this.authService.indexBouncer > 0) {
      this.router.navigateByUrl('cart');
    } else {
      this.showPopupError = true;

      setTimeout(() => {
        this.showPopupError = false;
      }, 1000)
    }
  }
}
